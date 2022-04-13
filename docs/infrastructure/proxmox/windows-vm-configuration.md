---
title: Windows VM Configuration
description: Windows 10 or Windows 11 Virutal Machines with VirtIO Disks and Networking using Proxmox guide. Supports Proxmox's GPU passthroughs feature.
template: comments.html
tags: [Proxmox, Windows Virtual Machines, VirtIO]
---

# Proxmox Windows Virtual Machine Configuration

This guide will walk you through configuring Windows 10 or Windows 11 Virutal Machines with VirtIO Disks and Networking using Proxmox.
This configuration was tested to work with the `GPU passthroughs` feature from one of the folowing guides:

- [GPU Passthrough to VM][gpu-passthrough-to-vm] - Full GPU passthrough to VM guide
- [iGPU Passthrough to VM][igpu-passthrough-to-vm] - Cpu's GPU passthrough to VM guide (Intel)
- [GPU Split Passthrough][gpu-split-passthrough] - Spliting (Nvidia) to Multiple GPUs passthrough to VM guide

## Prerequirements

Before we begin, we need to download the [VirtIO Drivers for Windwos][virtio-drivers-url]{target=\_blank} `iso`. Upload it via the GUI as any other ISO file.

You can allso use ssh and download it directly from the Proxmox server.

```shell
wget -P /var/lib/vz/template/iso https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso
```

## Create a VM in Proxmox

Create a Virutal Machine in Proxmox as usual.

### General

Select `Advanced` options.

![create-vm][create-vm-image]

### OS

Choose the iso file image for Windows 10 or 11. Change `Type` to `Microsoft Windows` and `Version` to your's windwos version.

![vm-os][vm-os-image]

### System

Change the Machine type to `q35`, BIOS to `UEFI`. Add TPM for Windows 11. Alocate Storage for UEFI BIOS and TPM.

![vm-system][vm-system-image]

### Disks

Set Bus/Device to `VirtIO Block` and Cache to `Write Through`. Select the storage disk and the VM's disk size.

![vm-disks][vm-disks-image]

### CPU

Choose how many cores you want to use. Set The cpu Type to `Host`

![vm-cpu][vm-cpu-image]

### Memory

Alocate the memory for the VM. Make sure the `Ballooning Device` is enabled.

![vm-memory][vm-memory-image]

### Network

Select your preferred network interface. Set the Model to `VirtIO (paravirtualized)`.

![vm-network][vm-network-image]

### Confirm

Don't Start the VM after creating it.

![vm-confirm][vm-confirm-image]

### Add CD/DVD to VM

We will need to use the [VirtIO Drivers for Windows][virtio-drivers-url]{target=\_blank} `iso` file to install the drivers while installing the Windwos VM.

![vm-cd-dvd][vm-cd-dvd-image]

### Hardware Before Installation

This how the hardware of the VM should look like befor starting the Windows installation.

![virtio-iso][virtio-iso-image]

## Windows Installation

The Windows installation process is the same as any other Windows OS installation. The only caviat is that you need to install the drivers for the Storage devices and Network devices.

### Choose Custom: Install Windows only (advanced)

![windows-advance-install][windows-advance-install-image]

### Missing Storage Devices

When prompted to select the storage device to install windows the device won't show since we are using the VirtIO storage. Select `Load Driver`.
![win-storage-driver][win-storage-driver-image]

### Load the VirtIO Drivers

Browse to the VirtIO Disk find a foler called `viostor` and select the appropriate windows driver.

![win-virtio-driver][win-virtio-driver-image]

You should see the a Red Hat VirtIO driver selected. Click `Next` and install the driver.

![win-virtio-driver-select][win-virtio-driver-select-image]

### Continue with the installation as usual

![win-disk-select][win-disk-select-image]

### Missing Network Driver

Windows won't be able to load network drivers while installing. When prompted with something for connecting to the Internet, select `I Don't have internet` and skip it. We will deal with the network drivers at post installation.

![win-no-network][win-no-network-image]

## Post Installation

### Install all the VirtIO Drivers for Windows

Open the VirtIO CD and run the `virtio-win-gt-x64.exe` installer. This will install all the missing drivers for the VM.

![post-virtoi-install][post-virtoi-install-image]

After the installtion your Device Manager should look like this without any errors.

![post-device-manager][post-device-manager-image]

### Remove the VirtIO CD/DVD and Windows iso

**Power off the VM.**

Remove the added CD/DVD for VirtIO iso.

![post-remove-cd][post-remove-cd-image]

Select `Do nor use any media` on the CD/DVD with the Windows iso.

![post-remove-iso][post-remove-iso-image]

At this point we are done with the installation of the Windows VM.

Follow those guides for utlizing a GPU passthrough to VM:

- [GPU Passthrough to VM][gpu-passthrough-to-vm] - Full GPU passthrough to VM guide
- [iGPU Passthrough to VM][igpu-passthrough-to-vm] - Cpu's GPU passthrough to VM guide (Intel)
- [GPU Split Passthrough][gpu-split-passthrough] - Spliting (Nvidia) to Multiple GPUs passthrough to VM guide

<!-- appendices -->

<!-- urls -->

[gpu-passthrough-to-vm]: https://3os.org/infrastructure/proxmox/pgu-passthrough-to-vm/ 'GPU Passthrough to VM'
[igpu-passthrough-to-vm]: https://3os.org/infrastructure/proxmox/igpu-passthrough-to-vm/ 'iGPU Passthrough to VM'
[gpu-split-passthrough]: https://3os.org/infrastructure/proxmox/pgu-split-passthrough/ 'GPU Split Passthrough'
[virtio-drivers-url]: https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso 'VirtIO Drivers'

<!-- images -->

[create-vm-image]: /assets/images/4971f070-b76b-11ec-b355-8bac95dc3464.jpg 'Create VM'
[vm-os-image]: /assets/images/b3f5f318-b76d-11ec-a7ee-c3e7b33c7b99.jpg 'VM OS'
[vm-system-image]: /assets/images/f4d86a32-b76d-11ec-9fef-e3b0f6f84522.jpg 'VM System'
[vm-disks-image]: /assets/images/12abb258-b76e-11ec-9cef-0b6c199a1aed.jpg 'VM Disks'
[vm-cpu-image]: /assets/images/2d14d750-b76e-11ec-a162-8fdcd6a128d5.jpg 'VM CPU'
[vm-memory-image]: /assets/images/4549ec48-b76e-11ec-8cfb-bb73f934b0a5.jpg 'VM Memory'
[vm-network-image]: /assets/images/60269124-b76e-11ec-9f86-a7974e1be899.jpg 'VM Network'
[vm-confirm-image]: /assets/images/7553b174-b770-11ec-b251-ffb6ae526256.jpg 'VM Confirm'
[vm-cd-dvd-image]: /assets/images/9ad68bf6-b770-11ec-8a83-37365567ebbe.jpg 'VM CD/DVD'
[virtio-iso-image]: /assets/images/d156661a-b770-11ec-b6e1-57ab6e787665.jpg 'virtio-iso'
[windows-advance-install-image]: /assets/images/a8cbc2ca-b771-11ec-9969-938683abbd20.jpg 'windows advance install'
[win-storage-driver-image]: /assets/images/5b894712-b771-11ec-a7d1-870703f39a8e.jpg 'windows storage driver'
[win-virtio-driver-image]: /assets/images/e6ee55f4-b771-11ec-a70c-cb0f7eec832b.jpg 'windows virtio driver'
[win-virtio-driver-select-image]: /assets/images/0cb9368c-b772-11ec-a35a-3fa89c0a4607.jpg 'windows virtio driver select'
[win-disk-select-image]: /assets/images/2f6d84ee-b772-11ec-b3e9-1ba14d36ea3d.jpg 'windows disk select'
[win-no-network-image]: /assets/images/62f1de96-b772-11ec-b155-071c3603bdd5.jpg 'windows no network'
[post-virtoi-install-image]: /assets/images/b8f8f8e8-b773-11ec-a8d1-e9f8f8f8f8f8.jpg 'post virtio install'
[post-device-manager-image]: /assets/images/127b5a6c-b779-11ec-bb2c-236d4508c9e3.jpg 'post device manager'
[post-remove-cd-image]: /assets/images/395b61d0-b77a-11ec-a996-03961ee417ee.jpg 'post remove cd'
[post-remove-iso-image]: /assets/images/7a055a56-b77a-11ec-9021-ab64944e5e3f.jpg 'post remove iso'

<!-- end appendices -->
