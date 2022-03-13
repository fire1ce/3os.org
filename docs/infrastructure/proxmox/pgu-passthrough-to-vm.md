---
description: Proxmox GPU passthrough to VM guide
---

# GPU Passthrough to VM

Hardware Requirements:

- VT-d
- Interrupt mapping
- UEFI BIOS

## Configuring Proxmox

**Configuring the Grub**
Assuming you are using an Intel CPU, either SSH directly into your Proxmox server.

Edit

```bash
nano /etc/default/grub
```

Look for this line:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

Then change it to look like this:

=== "For Intel CPU"

    ``` bash
    GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction video=efifb:off"
    ```

=== "For AMD CPU"

    ``` bash
    GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt pcie_acs_override=downstream,multifunction video=efifb:off"
    ```

Save the config changed and then update GRUB.

```bash
update-grub
```

## VFIO Modules

Use a text editor to add the following modules to /etc/modules

```bash
nano /etc/modules
```

Add the following (copy/paste) to the /etc/modules file:

```bash
# Modules required for PCI passthrough
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

Then save and exit.

## IOMMU Interrupt Remapping

I'm not going to get too much into this; all you really need to do is run the following commands in your Shell:

```bash
echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf
echo "options kvm ignore_msrs=1" > /etc/modprobe.d/kvm.conf
```

## Blacklisting Drivers

We don't want the Proxmox host system utilizing our GPU(s), so we need to blacklist the drivers. Run these commands in your Shell:

```bash
echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf
```

## Adding GPU to VFIO

Run this command:

```bash
lspci -v
```

Your shell window should output a bunch of stuff. Look for the line(s) that show your video card. It'll look something like this:

**01:00.0** VGA compatible controller: NVIDIA Corporation GP104 [GeForce GTX 1070] (rev a1) (prog-if 00 [VGA controller])

**01:00.1** Audio device: NVIDIA Corporation GP104 High Definition Audio Controller (rev a1)

Make note of the first set of numbers (e.g. **01:00.0** and **01:00.1**). We'll need them for the next step.

Run the command below. Replace **01:00** with whatever number was next to your GPU when you ran the previous command:

```bash
lspci -n -s 01:00
```

Doing this should output your GPU card's Vendor IDs, usually one ID for the GPU and one ID for the Audio bus. It'll look a little something like this

**01:00.0 0000: 10de:1b81 (rev a1)**
**01:00.1 0000: 10de:10f0 (rev a1)**

What we want to keep, are these vendor id codes: **10de:1b81** and **10de:10f0**.

Now we add the GPU's vendor id's to the VFIO **(remember to replace the id's with your own!)**:

```bash
echo "options vfio-pci ids=10de:1b81,10de:10f0 disable_vga=1"> /etc/modprobe.d/vfio.conf
```

Finally, we run this command:

```bash
update-initramfs -u
```

And restart:

```bash
reset
```

Now your Proxmox host should be ready to passthrough GPUs!

## Configuring the VM (Windows 10)

Download VirtIO drivers directly to you proxmox ios files locations

```bash
cd /var/lib/vz/template
wget https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/latest-virtio/virtio-win.iso
```

Mount the **virtio-win.iso** as a second cd before staring vm for the first time (you will need to install Hard Drive Drivers for windows).

Create a new vm - follow the screenshots for configuration:

1:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_os.png" alt="terminal screenshot">
</div>

2:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_system.png" alt="terminal screenshot">
</div>

3:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_hardDisk.png" alt="terminal screenshot">
</div>

4:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_cpu.png" alt="terminal screenshot">
</div>

5:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_memory.png" alt="terminal screenshot">
</div>

6:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_network.png" alt="terminal screenshot">
</div>

7:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_create_network.png" alt="terminal screenshot">
</div>

Don't Start The vm after your created it.
Going back to the Shell window, we need to edit /etc/pve/qemu-server/<vmid>.conf

```bash
nano /etc/pve/qemu-server/<vmid>.conf
```

Edit the config to look like this:

```bash
args: -cpu 'host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off'
cpu: host,hidden=1,flags=+pcid
machine: q35
```

Add PCI Devices (Your GPU) to VM

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/add_pci_gpu.png" alt="terminal screenshot">
</div>

Start the vm run the Windows Installation.
When ask to select the Hard Drive you will need to install the drivers we downloaded before so the windows will detect the hard drive:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/disk_drivers.png"
    alt="terminal screenshot">
</div>

After the first boot run the installer from virtio-win disk so the windows will install all the missing drivers.

At this point you should download the GPU Drivers and install them.

**For the GPU Passthrough to work you will need to connect a real screen or use a dongle to mimic a real display.**

**Enable Remote Desktop to control the vm remotely**

At this point we will power-off the vm, set the Display to none - at this point we will lose the "console" noVNC option at proxmox.

Since the vm now has only one gpu (PCI Passthrough), all the output will be forwarded to this card.

Here is my final screenshot of the VM's Hardware configuration:

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_final.png"
    alt="terminal screenshot">
</div>
