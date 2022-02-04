---
description: Proxmox iGPU passthrough to VM guide
---

# iGPU Passthrough to VM (CPU's GPU)

All 5th generation or newer Intel Core as well as Xeon E3 v4 CPUs support Intel’s Graphics Virtualization Technology. One variant of this technology suite (called GVT-g) allows you to “split” an Intel integrated GPU into multiple virtual GPUs. Using this feature, you can not only add hardware acceleration to more than virtual machine. It also allows you to keep the video output from your hypervisor, since it will always have access to part of the iGPU.

## Configuring Proxmox

Edit

```bash
nano /etc/default/grub
```

Find the line that starts with __GRUB_CMDLINE_LINUX_DEFAULT__

Add intel_iommu=on and i915.enable_gvt=1 to the list parameters, for example:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on i915.enable_gvt=1"
```

```bash
update-grub
```

## VFIO Modules

Use a text editor to add the following modules to /etc/modules

```bash
# Modules required for PCI passthrough
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd

# Modules required for Intel GVT
kvmgt
exngt
vfio-mdev
```

## Adding the mediated/virtual GPU to the virtual machine

Find the PCI address of the iGPU.


```bash
lspci -nnv | grep VGA
```

This should result in output similar to this:

```bash
00:02.0 VGA compatible controller [0300]: Intel Corporation CometLake-S GT2 [UHD Graphics 630] [8086:3e92] (prog-if 00 [VGA controller])
```

Here, the PCI address of the iGPU is ==00:02.0==. Make note of that address.

Open the web gui and navigate to the __Hardware__ tab of the VM you want to add a vGPU to.  
Click __Add__ above the device list and then choose __PCI Device__.  

Open the __Device__ dropdown and select the iGPU, which you can find using it’s PCI address. Note that this list uses a different format for the PCI addresses, __00:02.0__ is listed as __0000:00:02.0__.

Select the desired __MDev Type__. The listed resolutions only refers to the maximum screen resolution in the VM. They have no effect on the hardware transcoding capabilities.

Choose the device with the better "hardware" to the vm.

Keep in mind that if you do set it as the primary GPU, the Proxmox console will most likely no longer work.

Click Add.

Restart your virtual machine.

