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

!!! tip

    I've found that the most consistent way to utilize the GPU acceleration is to disable Proxmox's Virtual Graphics card of the vm. The drawback of disabling the Virtual Graphics card is that it will not be able to access the vm via proxmox's vnc console. The workaround is to enable Remote Desktop (RDP) on the VM before disabling the Virtual Graphics card and accessing the VM via RDP or use any other remove desktop client. If you loose the ability to access the VM via RDP you can temporarily remove the GPU PCI Device and re-enable the virtual graphics card
