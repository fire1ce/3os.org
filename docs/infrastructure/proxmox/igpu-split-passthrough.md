---
title: iGPU Split Passthrough
description: Proxmox iGPU passthrough to VM configuration for Hardware Acceleration (HW Aceleration) for example using video encoding/decoding and Transcoding for series like Plex and Emby.
template: comments.html
tags: [proxmox, igpu, passthrough]
---

# iGPU Split Passthrough (Intel Integrated Graphics)

## Introduction

Intel Integrated Graphics (iGPU) is a GPU that is integrated into the CPU. The GPU is a part of the CPU and is used to render graphics. Proxmox may be configured to use iGPU passthrough to VM to allow the VM to use the iGPU for hardware acceleration for example using video encoding/decoding and Transcoding for series like Plex and Emby.
This guide will show you how to configure Proxmox to use iGPU passthrough to VM.

!!! Warning ""

    **Your mileage may vary depending on your hardware. The following guide was tested with Intel Gen8 CPU.**

!!! Failure "Supported CPUs"

    `iGPU GVT-g Split Passthrough` is supported only on Intel's **5th generation to 10th generation** CPUs!

There are two ways to use iGPU passthrough to VM. The first way is to use the `Full iGPU Passthrough` to VM. The second way is to use the `iGPU GVT-g` technology which allows as to split the iGPU into two parts. We will be covering the `iGPU GVT-g Split Passthrough`. If you want to use the Full `iGPU Full Passthrough` you can find the guide [here][igpu-full-passthrough-url].

For better results its recommend to use this [Windwos 10/11 Virutal Machine configuration for proxmox][windows-vm-configuration-url].

## Proxmox Configuration for GVT-g Split Passthrough

The following exmaples uses `SSH` connection to the Proxmox server. The editor is `nano` but feel free to use any other editor.
We will be edditing the `grup` configuration file.

Edit the `grup` configuration file.

```shell
nano /etc/default/grub
```

Find the line that starts with `GRUB_CMDLINE_LINUX_DEFAULT` By defalt the should look like this:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

We want to allow `passthrough` and `Blacklists` known graphics drivers to privent proxmox from utilizing the iGPU.

Your `GRUB_CMDLINE_LINUX_DEFAULT` should look like this:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on 915.enable_gvt=1 video=simplefb:off video=vesafb:off video=efifb:off video=vesa:off disable_vga=1 vfio_iommu_type1.allow_unsafe_interrupts=1 kvm.ignore_msrs=1 modprobe.blacklist=radeon,nouveau,nvidia,nvidiafb,nvidia-gpu,snd_hda_intel,snd_hda_codec_hdmi"
```

!!! Note

    Note: This will blacklist most of the graphics drivers from proxmox. If you have a specific driver you need to use for Proxmox Host you need to remove it from `modprobe.blacklist`

Save and exit the editor.

Update the grub configuration to apply the changes the next time the system boots.

```bash
update-grub
```

Next we need to add `vfio` modules to allow PCI passthrough.

Eddit the `/etc/modules` file.

```shell
nano /etc/modules
```

Add the following line to the end of the file:

```shell
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

Save and exit the editor.

**Reboot Proxmox to apply the changes**

## Windows Virtual Machine iGPU Passthrough Configuration

Find the PCI address of the iGPU.

```shell
lspci -nnv | grep VGA
```

This should result in output similar to this:

```shell
00:02.0 VGA compatible controller [0300]: Intel Corporation CometLake-S GT2 [UHD Graphics 630] [8086:3e92] (prog-if 00 [VGA controller])
```

If you have multiple VGA, look for the one that has the `Intel` in the name.

![lspci-nnv-vga][lspci-nnv-vga-image]

Here, the PCI address of the iGPU is `00:02.0`.

Open the web gui and navigate to the `Hardware` tab of the VM you want to add a vGPU to.  
Click `Add` above the device list and then choose `PCI Device`

![Add PCI Device][add-pci-device-image]

Open the `Device` dropdown and select the iGPU, which you can find using it’s PCI address. This list uses a different format for the PCI addresses id, `00:02.0` is listed as `0000:00:02.0`.

![Add iGPU to VM][add-igpu-to-vm-image]

Click `Mdev Type`, You should be presented with a list of the available split passthrough devices choose the better performing one for the vm.

![Add iGPU split to VM][add-igpu-split-to-vm-image]

Select `ROM-Bar`, `PCI-Express` and then click `Add`.

![iGPU PCI Split Settings][igpu-pci-split-settings-image]

!!! tip

    I've found that the most consistent way to utilize the GPU acceleration is to disable Proxmox's Virtual Graphics card of the vm. The drawback of disabling the Virtual Graphics card is that it will not be able to access the vm via proxmox's vnc console. The workaround is to enable Remote Desktop (RDP) on the VM before disabling the Virtual Graphics card and accessing the VM via RDP or use any other remove desktop client. If you loose the ability to access the VM via RDP you can temporarily remove the GPU PCI Device and re-enable the virtual graphics card

![VM iGPU Hardware Settings][vm-igpu-hardware-settings-image]

Power on the Windows Virtual Machine.

Connect to the VM via Remote Desktop (RDP) or any other remote access protocol you prefer.
Install the latest version of [Intel's Graphics Driver][intel-gpu-drivers-url]{target=\_blank}.

If all when well you should see the following output in `Device Manager` and [GPU-Z][gpu-z-url]{target=\_blank}:

![GPU-Z and Device Manager iGPU][gpu-z-and-device-manager-igpu-image]

That's it!

## Linux Virtual Machine iGPU Passthrough Configuration

We will be using Ubuntu Server 20.04 LTS. for this guide.

From Proxmox Terminal find the PCI address of the iGPU.

```bash
lspci -nnv | grep VGA
```

This should result in output similar to this:

```bash
00:02.0 VGA compatible controller [0300]: Intel Corporation CometLake-S GT2 [UHD Graphics 630] [8086:3e92] (prog-if 00 [VGA controller])
```

If you have multiple VGA, look for the one that has the `Intel` in the name.

![lspci-nnv-vga][lspci-nnv-vga-image]

Here, the PCI address of the iGPU is `00:02.0`.

For best performance the VM should be configured the `Machine` type to `q35`. This will alow the VM to utilize PCI-Express passthrough.
Open the web gui and navigate to the `Hardware` tab of the VM you want to add a vGPU to.  
Click `Add` above the device list and then choose `PCI Device`

![Add PCI Device Ubuntu][add-pci-device-ubuntu-image]

Open the `Device` dropdown and select the iGPU, which you can find using it’s PCI address. This list uses a different format for the PCI addresses id, `00:02.0` is listed as `0000:00:02.0`.

![Add iGPU to VM Ubuntu][add-igpu-to-vm-ubuntu-image]

Select `All Functions`, `ROM-Bar`, `PCI-Express` and then click `Add`.

Here is the screenshot of the VM settings:

![VM Hardware Setting Ubuntu][vm-hardware-setting-ubuntu-image]

!!! Note

    VM's Console of the vm will freez at boot time. This is due to the fact that the VM is using the iGPU. Therefor, you will loose the ability to access the VM via proxmox's vnc console. The workaround is to enable [Serial Console Display][serial-terminal-url] - This will alow you to access the VM's console via the serial console from proxmox's shell.

![VM Console Ubuntu][vm-console-ubuntu-image]

## iGPU Split GVT-g Passthrough

All 5th generation to 10th generation inc

or newer Intel Core as well as Xeon E3 v4 CPUs support Intel’s Graphics Virtualization Technology. One variant of this technology suite (called GVT-g) allows you to “split” an Intel integrated GPU into multiple virtual GPUs. Using this feature, you can not only add hardware acceleration to more than virtual machine. It also allows you to keep the video output from your hypervisor, since it will always have access to part of the iGPU.

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on i915.enable_gvt=1"
```

```shell
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

<!-- appendices -->

<!-- urls -->

[igpu-full-passthrough-url]: /infrastructure/proxmox/igpu-passthrough-to-vm/#igpu-full-passthrough 'iGPU Full Passthrough'
[igpu-split-gvt-g-passthrough-url]: /infrastructure/proxmox/igpu-split-passthrough/#igpu-split-gvt-g-passthrough 'iGPU Split GVT-g Passthrough'
[windows-vm-configuration-url]: /infrastructure/proxmox/windows-vm-configuration/ 'Windows VM Configuration'
[serial-terminal-url]: /infrastructure/proxmox/serial-terminal/ 'Serial Terminal'
[intel-gpu-drivers-url]: https://www.intel.com/content/www/us/en/support/products/80939/graphics.html 'Intel GPU Drivers'
[gpu-z-url]: https://www.techpowerup.com/gpuz/ 'GPU-Z Homepage'

<!-- images -->

[lspci-nnv-vga-image]: /assets/images/c98e4e9a-b912-11ec-9100-c3da7dd122f2.jpg 'lspci -nnv | grep VGA'
[add-pci-device-image]: /assets/images/893555e4-b914-11ec-8e85-df9da2014d5a.jpg 'Add PCI Device'
[add-igpu-to-vm-image]: /assets/images/d3a4d31c-b918-11ec-ac96-a7ff358e0685.jpg 'Add iGPU to VM'
[add-igpu-to-vm-image]: /assets/images/d3a4d31c-b918-11ec-ac96-a7ff358e0685.jpg 'Add iGPU to VM'
[add-igpu-split-to-vm-image]: /assets/images/393f9ce0-bc41-11ec-976a-cb1d91990157.jpg 'Add iGPU split to VM'
[igpu-pci-split-settings-image]: /assets/images/0bb26720-bc42-11ec-97d5-0f6751fb6075.jpg 'iGPU PCI Split Settings'
[vm-igpu-hardware-settings-image]: /assets/images/496fa0ba-b91c-11ec-bcb5-3759896bab7f.jpg 'VM iGPU Hardware Settings'
[gpu-z-and-device-manager-igpu-image]: /assets/images/7c9df2f6-b91d-11ec-b08b-775e53b2c017.jpg 'GPU-Z and Device Manager iGPU'
[add-pci-device-ubuntu-image]: /assets/images/19bbed86-bc34-11ec-bdef-d76764bad4d0.jpg 'Add PCI Device Ubuntu'
[add-igpu-to-vm-ubuntu-image]: /assets/images/43a2c458-bc34-11ec-83a8-2f7d0e19f668.jpg 'Add iGPU to VM Ubuntu'
[vm-console-ubuntu-image]: /assets/images/0f0cce22-bc35-11ec-8aa2-b74f9be36455.jpg 'VM Console Ubuntu'
[vm-hardware-setting-ubuntu-image]: /assets/images/b177a31c-bc35-11ec-9045-2b011e6c011d.jpg 'VM Hardware Setting Ubuntu'

<!-- end appendices -->
