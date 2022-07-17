---
title: iGPU Split Passthrough
description: Proxmox iGPU split passthrough to VM configuration for hardware acceleration.
tags: [proxmox, igpu, passthrough]
---

# iGPU Split Passthrough (Intel Integrated Graphics)

## Introduction

Intel Integrated Graphics (iGPU) is a GPU that is integrated into the CPU. The GPU is a part of the CPU and is used to render graphics. Proxmox may be configured to use iGPU split passthrough to VM to allow the VM to use the iGPU for hardware acceleration for example using video encoding/decoding and Transcoding for series like Plex and Emby.
This guide will show you how to configure Proxmox to use iGPU passthrough to VM.

!!! Warning ""

    **Your mileage may vary depending on your hardware. The following guide was tested with Intel Gen8 CPU.**

!!! Failure "Supported CPUs"

    `iGPU GVT-g Split Passthrough` is supported only on Intel's **5th generation to 10th generation** CPUs!

    Known supported CPUs familys:

    - **Broadwell**

    - **Skylake**

    - **Kaby Lake**

    - **Coffee Lake**

    - **Comet Lake**

There are two ways to use iGPU passthrough to VM. The first way is to use the `Full iGPU Passthrough` to VM. The second way is to use the `iGPU GVT-g` technology which allows as to split the iGPU into two parts. We will be covering the `Split iGPU Passthrough`. If you want to use the split `Full iGPU Passthrough` you can find the guide [here][igpu-full-passthrough-url].

## Proxmox Configuration for GVT-g Split Passthrough

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

Your `GRUB_CMDLINE_LINUX_DEFAULT` should look like this:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on i915.enable_gvt=1 iommu=pt pcie_acs_override=downstream,multifunction video=efifb:off video=vesa:off vfio_iommu_type1.allow_unsafe_interrupts=1 kvm.ignore_msrs=1 modprobe.blacklist=radeon,nouveau,nvidia,nvidiafb,nvidia-gpu"
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

# Modules required for Intel GVT-g Split
kvmgt
```

Save and exit the editor.

Update configuration changes made in your /etc filesystem

```shell
update-initramfs -u -k all
```

**Reboot Proxmox to apply the changes**

Verify that IOMMU is enabled

```shell
dmesg | grep -e DMAR -e IOMMU
```

There should be a line that looks like `DMAR: IOMMU enabled`. If there is no output, something is wrong.

```shell hl_lines="2"
[0.000000] Warning: PCIe ACS overrides enabled; This may allow non-IOMMU protected peer-to-peer DMA
[0.067203] DMAR: IOMMU enabled
[2.573920] pci 0000:00:00.2: AMD-Vi: IOMMU performance counters supported
[2.580393] pci 0000:00:00.2: AMD-Vi: Found IOMMU cap 0x40
[2.581776] perf/amd_iommu: Detected AMD IOMMU #0 (2 banks, 4 counters/bank).
```

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

![Proxmox lspci vga][proxmox-lspci-vga-img]

For best performance the VM should be configured the `Machine` type to ==q35==.  
This will allow the VM to utilize PCI-Express passthrough.

Open the web gui and navigate to the `Hardware` tab of the VM you want to add a vGPU.  
Click `Add` above the device list and then choose `PCI Device`

!['Windows VM Add PCI Device][windows-vm-add-pci-device-img]

Open the `Device` dropdown and select the iGPU, which you can find using it’s PCI address. This list uses a different format for the PCI addresses id, `00:02.0` is listed as `0000:00:02.0`.

![Add iGPU MDev to VM][general-add-igpu-mdev-to-vm-img]

Click `Mdev Type`, You should be presented with a list of the available split passthrough devices choose the better performing one for the vm.

![Windows VM Add iGPU Split to VM][windows-vm-add-igpu-split-to-vm-img]

Select `ROM-Bar`, `PCI-Express` and then click `Add`.

![Windows VM iGPU PCI Split Settings][windows-vm-igpu-pci-split-settings-img]

The Windows Virtual Machine Proxmox Setting should look like this:

![Windows VM iGPU Split Hardware Settings][windows-vm-igpu-split-hardware-settings-img]

Power on the Windows Virtual Machine.

Open the VM's Console.
Install the latest version of [Intel's Graphics Driver][intel-gpu-drivers-url]{target=\_blank} or use the [Intel Driver & Support Assistant][intel-driver-and-support-assistant-url]{target=\_blank} installer.

If all when well you should see the following output in `Device Manager` and [GPU-Z][gpu-z-url]{target=\_blank}:

![GPU-Z and Device Manager iGPU][gpu-z-and-device-manager-igpu-img]

That's it! You should now be able to use the iGPU for hardware acceleration inside the VM and still have proxmox's output on the screen.

## Linux Virtual Machine iGPU Passthrough Configuration

We will be using Ubuntu Server 20.04 LTS for this guide.

From Proxmox Terminal find the PCI address of the iGPU.

```shell
lspci -nnv | grep VGA
```

This should result in output similar to this:

```shell
00:02.0 VGA compatible controller [0300]: Intel Corporation CometLake-S GT2 [UHD Graphics 630] [8086:3e92] (prog-if 00 [VGA controller])
```

If you have multiple VGA, look for the one that has the `Intel` in the name.

![Proxmox lspci vga][proxmox-lspci-vga-img]

Here, the PCI address of the iGPU is `00:02.0`.

VM should be configured the `Machine` type to ==i440fx==.  
Open the web gui and navigate to the `Hardware` tab of the VM you want to add a vGPU to.  
Click `Add` above the device list and then choose `PCI Device`

![Ubuntu VM Add PCI Device][ubuntu-vm-add-pci-device-img]

Open the `Device` dropdown and select the iGPU, which you can find using it’s PCI address. This list uses a different format for the PCI addresses id, `00:02.0` is listed as `0000:00:02.0`.

![Add iGPU MDev to VM][general-add-igpu-mdev-to-vm-img]

Click `Mdev Type`, You should be presented with a list of the available split passthrough devices choose the better performing one for the vm.

![Add iGPU Split Mdev to VM][ubuntu-vm-add-igpu-split-to-vm-img]

Select `ROM-Bar`, and then click `Add`.

![Ubuntu VM iGPU PCI Split Settings][ubuntu-vm-igpu-pci-split-settings-img]

The Ubuntu Virtual Machine Proxmox Setting should look like this:

![Ubuntu VM iGPU Split Hardware Settings][ubuntu-vm-igpu-split-hardware-settings-img]

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

![VM renderD128][vm-renderd128-img]

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
[intel-gpu-drivers-url]: https://www.intel.com/content/www/us/en/support/products/80939/graphics.html 'Intel GPU Drivers'
[intel-driver-and-support-assistant-url]: https://www.intel.com/content/www/us/en/support/detect.html 'Intel Driver and Support Assistant'
[gpu-z-url]: https://www.techpowerup.com/gpuz/ 'GPU-Z Homepage'

<!-- images -->

<!-- Proxmox/general Images-->

[proxmox-lspci-vga-img]: /assets/images/c98e4e9a-b912-11ec-9100-c3da7dd122f2.jpg 'Proxmox lspci vga'
[general-add-igpu-mdev-to-vm-img]: /assets/images/2cf3d69c-bd89-11ec-af8c-67974c4ba3f0.jpg 'Add iGPU MDev to VM'

<!-- Windows Images-->

[windows-vm-add-pci-device-img]: /assets/images/893555e4-b914-11ec-8e85-df9da2014d5a.jpg 'Windows VM Add PCI Device'
[windows-vm-add-igpu-split-to-vm-img]: /assets/images/393f9ce0-bc41-11ec-976a-cb1d91990157.jpg 'Windows VM Add iGPU Split to VM'
[windows-vm-igpu-pci-split-settings-img]: /assets/images/0bb26720-bc42-11ec-97d5-0f6751fb6075.jpg 'Windows VM iGPU PCI Split Settings'
[windows-vm-igpu-split-hardware-settings-img]: /assets/images/d1d0f06c-bd9f-11ec-993d-77cc04f321dc.jpg 'Windows VM iGPU Split Hardware Settings'
[gpu-z-and-device-manager-igpu-img]: /assets/images/7c9df2f6-b91d-11ec-b08b-775e53b2c017.jpg 'GPU-Z and Device Manager iGPU'

<!-- Ubuntu Images-->

[ubuntu-vm-add-pci-device-img]: /assets/images/19bbed86-bc34-11ec-bdef-d76764bad4d0.jpg 'Ubuntu VM Add PCI Device'
[ubuntu-vm-add-igpu-split-to-vm-img]: /assets/images/3802e9b8-bd8b-11ec-a4ba-8305e0d2d682.jpg 'Ubuntu VM Add iGPU Split to VM'
[ubuntu-vm-igpu-pci-split-settings-img]: /assets/images/c605680c-bd8c-11ec-81f9-4755a5d3fa24.jpg 'Ubuntu VM iGPU PCI Split Settings'
[ubuntu-vm-igpu-split-hardware-settings-img]: /assets/images/375ed1c8-bd8d-11ec-94c6-cf0bac60954a.jpg 'Ubuntu VM iGPU Split Hardware Settings'
[vm-renderd128-img]: /assets/images/7660a1d4-bd8e-11ec-a58e-3f9f3e6c485d.jpg 'VM renderD128'

<!-- end appendices -->
