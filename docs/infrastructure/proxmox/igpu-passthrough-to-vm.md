---
title: iGPU Passthrough to VM
description: Proxmox iGPU passthrough to VM configuration for Hardware Acceleration (HW Aceleration) for example using video encoding/decoding and Transcoding for series like Plex and Emby.
template: comments.html
tags: [proxmox, igpu, passthrough]
---

# iGPU Passthrough to VM (Intel Integrated Graphics)

## Introduction

Intel Integrated Graphics (iGPU) is a GPU that is integrated into the CPU. The GPU is a part of the CPU and is used to render graphics. Proxmox may be configured to use iGPU passthrough to VM to allow the VM to use the iGPU for hardware acceleration for example using video encoding/decoding and Transcoding for series like Plex and Emby.
This guide will show you how to configure Proxmox to use iGPU passthrough to VM.

!!! Warning ""

    **Your mileage may vary depending on your hardware. The following guide was tested with Intel Gen8 CPU.**

There are two ways to use iGPU passthrough to VM. The first way is to use the `Full iGPU Passthrough` to VM. The second way is to use the `iGPU GVT-g` technology which allows as to split the iGPU into two parts. We will be covering the `Full iGPU Passthrough`. If you want to use the split `iGPU GVT-g Passthrough` you can find the guide [here][igpu-split-gvt-g-passthrough-url].

## Proxmox Configuration for iGPU Full Passthrough

The following examples uses `SSH` connection to the Proxmox server. The editor is `nano` but feel free to use any other editor.
We will be editing the `grub` configuration file.

Edit the `grub` configuration file.

```shell
nano /etc/default/grub
```

Find the line that starts with `GRUB_CMDLINE_LINUX_DEFAULT` by default they should look like this:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

We want to allow `passthrough` and `Blacklists` known graphics drivers to prevent proxmox from utilizing the iGPU.

!!! Warning

    **You will loose the ability to use the onboard graphics card to access the Proxmox's console since Proxmox won't be able to use the Intel's gpu**

Your `GRUB_CMDLINE_LINUX_DEFAULT` should look like this:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction video=simplefb:off video=vesafb:off video=efifb:off video=vesa:off disable_vga=1 vfio_iommu_type1.allow_unsafe_interrupts=1 kvm.ignore_msrs=1 modprobe.blacklist=radeon,nouveau,nvidia,nvidiafb,nvidia-gpu,snd_hda_intel,snd_hda_codec_hdmi,i915"
```

!!! Note

    This will blacklist most of the graphics drivers from proxmox. If you have a specific driver you need to use for Proxmox Host you need to remove it from `modprobe.blacklist`

Save and exit the editor.

Update the grub configuration to apply the changes the next time the system boots.

```shell
update-grub
```

Next we need to add `vfio` modules to allow PCI passthrough.

Edit the `/etc/modules` file.

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
```

Update configuration changes made in your /etc filesystem

```shell
update-initramfs -u -k all
```

Save and exit the editor.

**Reboot Proxmox to apply the changes**

## Windows Virtual Machine iGPU Passthrough Configuration

For better results its recommend to use this [Windwos 10/11 Virutal Machine configuration for proxmox][windows-vm-configuration-url].

Find the PCI address of the iGPU.

```shell
lspci -nnv | grep VGA
```

This should result in output similar to this:

```shell
00:02.0 VGA compatible controller [0300]: Intel Corporation CometLake-S GT2 [UHD Graphics 630] [8086:3e92] (prog-if 00 [VGA controller])
```

If you have multiple VGA, look for the one that has the `Intel` in the name.  
Here, the PCI address of the iGPU is `00:02.0`.

![Proxmox lspci vga][proxmox-lspci-vga-image]

For best performance the VM should be configured the `Machine` type to ==q35==.  
This will allow the VM to utilize PCI-Express passthrough.

Open the web gui and navigate to the `Hardware` tab of the VM you want to add a vGPU.  
Click `Add` above the device list and then choose `PCI Device`

![Windows VM Add PCI Device][windows-vm-add-pci-device-image]

Open the `Device` dropdown and select the iGPU, which you can find using it’s PCI address. This list uses a different format for the PCI addresses id, `00:02.0` is listed as `0000:00:02.0`.

![Add iGPU to VM][general-vm-add-igpu-to-vm-image]

Select `All Functions`, `ROM-Bar`, `PCI-Express` and then click `Add`.

![Windows VM iGPU PCI Settings][windows-vm-igpu-pci-settings-image]

!!! tip

    I've found that the most consistent way to utilize the GPU acceleration is to disable Proxmox's Virtual Graphics card of the vm. The drawback of disabling the Virtual Graphics card is that it will not be able to access the vm via proxmox's vnc console. The workaround is to enable Remote Desktop (RDP) on the VM before disabling the Virtual Graphics card and accessing the VM via RDP or use any other remove desktop client. If you loose the ability to access the VM via RDP you can temporarily remove the GPU PCI Device and re-enable the virtual graphics card

The Windows Virtual Machine Proxmox Setting should look like this:

![Windows VM iGPU Hardware Settings][windows-vm-igpu-hardware-settings-image]

Power on the Windows Virtual Machine.

Connect to the VM via Remote Desktop (RDP) or any other remote access protocol you prefer.
Install the latest version of [Intel's Graphics Driver][intel-gpu-drivers-url]{target=\_blank} or use the [Intel Driver & Support Assistant][intel-driver-and-support-assistant-url]{target=\_blank} installer.

If all when well you should see the following output in `Device Manager` and [GPU-Z][gpu-z-url]{target=\_blank}:

![GPU-Z and Device Manager iGPU][gpu-z-and-device-manager-igpu-image]

That's it!

## Linux Virtual Machine iGPU Passthrough Configuration

We will be using Ubuntu Server 20.04 LTS. for this guide.

From Proxmox Terminal find the PCI address of the iGPU.

```shell
lspci -nnv | grep VGA
```

This should result in output similar to this:

```shell
00:02.0 VGA compatible controller [0300]: Intel Corporation CometLake-S GT2 [UHD Graphics 630] [8086:3e92] (prog-if 00 [VGA controller])
```

If you have multiple VGA, look for the one that has the `Intel` in the name.
Here, the PCI address of the iGPU is `00:02.0`.

![lspci-nnv-vga][proxmox-lspci-vga-image]

![Ubuntu VM Add PCI Device][ubuntu-vm-add-pci-device-image]

Open the `Device` dropdown and select the iGPU, which you can find using it’s PCI address. This list uses a different format for the PCI addresses id, `00:02.0` is listed as `0000:00:02.0`.

![Add iGPU to VM][general-vm-add-igpu-to-vm-image]

Select `All Functions`, `ROM-Bar` and then click `Add`.

![Ubuntu VM iGPU PCI Settings][ubuntu-vm-igpu-pci-settings-image]

The Ubuntu Virtual Machine Proxmox Setting should look like this:

![Ubuntu VM iGPU Hardware Settings][ubuntu-vm-igpu-hardware-settings-image]

Boot the VM. To test the iGPU passthrough was successful, you can use the following command:

```shell
 sudo lspci -nnv | grep VGA
```

The output should incliude the Intel iGPU:

```shell
00:10.0 VGA compatible controller [0300]: Intel Corporation UHD Graphics 630 (Desktop) [8086:3e92] (prog-if 00 [VGA controller])
```

Now we need to check if the GPU's Driver initalization is working.

```shell
cd /dev/dri && ls -la
```

The output should incliude the `renderD128`

![VM renderD128][vm-renderd128-image]

That's it! You should now be able to use the iGPU for hardware acceleration inside the VM and still have proxmox's output on the screen.

## Debug

Dbug Messages - Shows Hardware initialization and errors

```shell
dmesg -w
```

Display PCI devices information

```shell
lspci
```

Display Driver in use for PCI devices

```shell
lspci -k
```

Display IOMMU Groups the PCI devices are assigned to

```shell
#!/bin/bash
shopt -s nullglob
for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do
    echo "IOMMU Group ${g##*/}:"
    for d in $g/devices/*; do
        echo -e "\t$(lspci -nns ${d##*/})"
    done;
done;
```

<!-- appendices -->

<!-- urls -->

[igpu-full-passthrough-url]: /infrastructure/proxmox/igpu-passthrough-to-vm/#igpu-full-passthrough 'iGPU Full Passthrough'
[igpu-split-gvt-g-passthrough-url]: /infrastructure/proxmox/igpu-split-passthrough/#igpu-split-gvt-g-passthrough 'iGPU Split GVT-g Passthrough'
[windows-vm-configuration-url]: /infrastructure/proxmox/windows-vm-configuration/ 'Windows VM Configuration'
[intel-driver-and-support-assistant-url]: https://www.intel.com/content/www/us/en/support/detect.html 'Intel Driver and Support Assistant'
[intel-gpu-drivers-url]: https://www.intel.com/content/www/us/en/support/products/80939/graphics.html 'Intel GPU Drivers'
[gpu-z-url]: https://www.techpowerup.com/gpuz/ 'GPU-Z Homepage'

<!-- images -->

<!-- Proxmox/general Images-->

[proxmox-lspci-vga-image]: /assets/images/c98e4e9a-b912-11ec-9100-c3da7dd122f2.jpg 'Proxmox lspci vga'
[general-vm-add-igpu-to-vm-image]: /assets/images/d3a4d31c-b918-11ec-ac96-a7ff358e0685.jpg 'Add iGPU to VM'

<!-- Windows Images-->

[windows-vm-add-pci-device-image]: /assets/images/893555e4-b914-11ec-8e85-df9da2014d5a.jpg 'Windows VM Add PCI Device'
[windows-vm-igpu-pci-settings-image]: /assets/images/cc1c3650-b91b-11ec-8215-bb07cf790912.jpg 'Windows VM iGPU PCI Settings'
[windows-vm-igpu-hardware-settings-image]: /assets/images/496fa0ba-b91c-11ec-bcb5-3759896bab7f.jpg 'Windows VM iGPU Hardware Settings'
[gpu-z-and-device-manager-igpu-image]: /assets/images/7c9df2f6-b91d-11ec-b08b-775e53b2c017.jpg 'GPU-Z and Device Manager iGPU'

<!-- Ubuntu Images-->

[ubuntu-vm-add-pci-device-image]: /assets/images/19bbed86-bc34-11ec-bdef-d76764bad4d0.jpg 'Ubuntu VM Add PCI Device'
[ubuntu-vm-igpu-pci-settings-image]: /assets/images/1bb4b41e-bdb1-11ec-9af2-4b05eacea61c.jpg 'Ubuntu VM iGPU PCI Settings'
[ubuntu-vm-igpu-hardware-settings-image]: /assets/images/b177a31c-bc35-11ec-9045-2b011e6c011d.jpg 'Ubuntu VM iGPU Hardware Settings'
[vm-renderd128-image]: /assets/images/7660a1d4-bd8e-11ec-a58e-3f9f3e6c485d.jpg 'VM renderD128'

<!-- end appendices -->
