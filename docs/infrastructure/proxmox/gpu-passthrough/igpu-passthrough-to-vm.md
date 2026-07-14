---
title: Intel iGPU Passthrough to a Proxmox VM
description: Configure full Intel iGPU passthrough to a Proxmox VE virtual machine for graphics or hardware acceleration.
template: comments.html
tags: [proxmox, intel, igpu, passthrough, vfio]
---

# Intel iGPU Passthrough to a Proxmox VM

This guide configures full Intel iGPU passthrough. The VM gets the complete device; the Proxmox host and other VMs cannot use it at the same time.

!!! warning

    Passthrough depends on the CPU, motherboard, firmware and IOMMU grouping. Make sure SSH or another management method works before releasing the host's only display device.

## Before You Start

In BIOS/UEFI, enable Intel VT-d or the equivalent IOMMU setting. The CPU and motherboard must both support IOMMU interrupt remapping.

This guide uses the current Proxmox VE defaults. It does not add ACS overrides, unsafe interrupts or a large generic kernel command line. Those options can reduce isolation or stability and should only be used to troubleshoot a specific, verified hardware problem.

## Find the Intel iGPU

Run:

```shell
lspci -nnk | grep -A3 -E "VGA|Display"
```

Find the Intel device and note its PCI address and ID. In this example, the address is `00:02.0` and the ID is `8086:3e92`:

```text
00:02.0 VGA compatible controller [0300]: Intel Corporation UHD Graphics 630 [8086:3e92]
```

Your values will be different.

## Load the VFIO Modules

Edit `/etc/modules`:

```shell
nano /etc/modules
```

Add these modules:

```text
vfio
vfio_iommu_type1
vfio_pci
```

Refresh the initramfs and reboot:

```shell
update-initramfs -u -k all
reboot
```

## Verify IOMMU and Device Isolation

After the reboot, check the kernel messages:

```shell
dmesg | grep -e DMAR -e IOMMU -e AMD-Vi
```

The exact output depends on the hardware and kernel. It must show that IOMMU, Directed I/O or interrupt remapping is enabled.

Check the IOMMU group reported by Proxmox. Replace `NODE` with the Proxmox node name:

```shell
pvesh get /nodes/NODE/hardware/pci --pci-class-blacklist ""
```

The iGPU may share a group with its own functions or root port. It should not share a group with an unrelated device that the host still needs.

## Check the Host Driver

Proxmox VE tries to make an assigned PCI device unavailable to the host automatically. Normally, add the iGPU to the VM in the next section first and return here only if assignment fails. Check the current driver:

```shell
lspci -nnk -s 00:02.0
```

After the iGPU is assigned and the host is rebooted, `Kernel driver in use` should be `vfio-pci`, or the line may be absent.

If automatic binding does not work, bind only the verified device ID. Replace `8086:3e92` with the ID from your system:

```shell
echo "options vfio-pci ids=8086:3e92" > /etc/modprobe.d/vfio.conf
update-initramfs -u -k all
reboot
```

Do not copy the example ID.

## Add the iGPU to the VM

1. Shut down the VM.
2. Open the VM's **Hardware** tab.
3. Select **Add** > **PCI Device**.
4. Select the Intel iGPU by its PCI address.
5. Enable **PCI-Express** when the VM uses the `q35` machine type.
6. Enable **All Functions** only when the device has related functions that must be passed together.
7. Enable **Primary GPU** only when the guest should use the iGPU as its main display.

Proxmox recommends `q35`, OVMF and PCIe for the best GPU-passthrough compatibility. OVMF also requires a UEFI-capable device ROM; otherwise use SeaBIOS.

!!! note

    The passed-through GPU framebuffer is not shown in the Proxmox noVNC or SPICE console. Keep a virtual display for recovery when possible, or configure remote access inside the guest before making the iGPU primary.

## Verify Inside the Guest

On Windows, install the current Intel graphics driver and check **Device Manager**.

On Linux, check that the device is present and that the guest driver created the Direct Rendering Infrastructure devices:

```shell
lspci -nnk | grep -A3 -E "VGA|Display"
ls -la /dev/dri
```

The exact `card` and `renderD` numbers can vary.

## Sources

- [Proxmox VE Administration Guide: PCI(e) Passthrough](https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf)
- [Intel Driver & Support Assistant](https://www.intel.com/content/www/us/en/support/detect.html)
