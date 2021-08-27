---
description: Proxmox Guides, Tips and modifications
---

# Proxmox

## GPU Passthrough to VM

Hardware Requirements:

* VT-d
* Interrupt mapping
* UEFI BIOS

### Configuring Proxmox

__Configuring the Grub__
Assuming you are using an Intel CPU, either SSH directly into your Proxmox server, or utilizing the noVNC Shell terminal under "Node", open up the /etc/default/grub file. I prefer to use nano, but you can use whatever text editor you prefer.

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
    GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"
    ```

=== "For AMD CPU"

    ``` bash
    GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on"
    ```

__IMPORTANT ADDITIONAL COMMANDS__

You might need to add additional commands to this line, if the passthrough ends up failing. For example, if you're using a similar CPU as I am (Xeon E3-12xx series), which has horrible IOMMU grouping capabilities, and/or you are trying to passthrough a single GPU.

These additional commands essentially tell Proxmox not to utilize the GPUs present for itself, as well as helping to split each PCI device into its own IOMMU group. This is important because, if you try to use a GPU in say, IOMMU group 1, and group 1 also has your CPU grouped together for example, then your GPU passthrough will fail.

Here are my grub command line settings:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction nofb nomodeset video=vesafb:off,efifb:off"
```

For more information on what these commands do and how they help:

A. Disabling the Framebuffer: video=vesafb:off,efifb:off
B. ACS Override for IOMMU groups: pcie_acs_override=downstream,multifunction

When you finished editing /etc/default/grub run this command:

```bash
update-grub
```

### VFIO Modules

You'll need to add a few VFIO modules to your Proxmox system. Again, using nano (or whatever), edit the file /etc/modules

```bash
nano /etc/modules
```

Add the following (copy/paste) to the /etc/modules file:

```bash
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

Then save and exit.

### IOMMU Interrupt Remapping

I'm not going to get too much into this; all you really need to do is run the following commands in your Shell:

```bash
echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf
echo "options kvm ignore_msrs=1" > /etc/modprobe.d/kvm.conf
```

### Blacklisting Drivers

We don't want the Proxmox host system utilizing our GPU(s), so we need to blacklist the drivers. Run these commands in your Shell:

```bash
echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf
```

### Adding GPU to VFIO

Run this command:

```bash
lspci -v
```

Your shell window should output a bunch of stuff. Look for the line(s) that show your video card. It'll look something like this:

__01:00.0__ VGA compatible controller: NVIDIA Corporation GP104 [GeForce GTX 1070] (rev a1) (prog-if 00 [VGA controller])

__01:00.1__ Audio device: NVIDIA Corporation GP104 High Definition Audio Controller (rev a1)

Make note of the first set of numbers (e.g. __01:00.0__ and __01:00.1__). We'll need them for the next step.

Run the command below. Replace __01:00__ with whatever number was next to your GPU when you ran the previous command:

```bash
lspci -n -s 01:00
```

Doing this should output your GPU card's Vendor IDs, usually one ID for the GPU and one ID for the Audio bus. It'll look a little something like this

__01:00.0 0000: 10de:1b81 (rev a1)__
__01:00.1 0000: 10de:10f0 (rev a1)__

What we want to keep, are these vendor id codes: __10de:1b81__ and __10de:10f0__.

Now we add the GPU's vendor id's to the VFIO __(remember to replace the id's with your own!)__:

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

### Configuring the VM (Windows 10)

Download VirtIO drivers directly to you proxmox ios files locations

```bash
cd /var/lib/vz/template
wget https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/latest-virtio/virtio-win.iso
```

Mount the __virtio-win.iso__ as a second cd before staring vm for the first time (you will need to install Hard Drive Drivers for windows).

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

__For the GPU Passthrough to work you will need to connect a real screen or use a dongle to mimic a real display.__

__Enable Remote Desktop to control the vm remotely__

At this point we will power-off the vm, set the Display to none - at this point we will lose the "console" noVNC option at proxmox.

Since the vm now has only one gpu (PCI Passthrough), all the output will be forwarded to this card.

Here is my final screenshot of the VM's Hardware configuration: 

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/guides/proxmox/vm_final.png"
    alt="terminal screenshot">
</div>

## Remove Proxmox 6.0/5.1+ Subscription Notice

To remove “You do not have a valid subscription for this server” run the command bellow. You will need to SSH to your Proxmox machine or use the node console through the PVE web interface.

SSH to the the proxmox host,
Run the following one line command

```bash
sed -i.bak "s/data.status !== 'Active'/false/g" /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js && systemctl restart pveproxy.service
```
