---
title: Proxmox GPU Passthrough to a VM
description: Configure full PCIe GPU passthrough from a Proxmox VE host to a Windows or Linux virtual machine with VFIO.
template: comments.html
tags: [proxmox, gpu, pcie, passthrough, vfio]
---

# Proxmox GPU Passthrough to a VM

Full PCIe passthrough gives one VM direct control of a physical GPU. The Proxmox host and other VMs cannot use that device while it is assigned.

!!! warning

    Hardware support and IOMMU grouping vary. Keep SSH or another management path available before releasing a GPU used by the host console.

## Requirements

- CPU and motherboard support for IOMMU interrupt remapping
- Intel VT-d or AMD-Vi enabled in BIOS/UEFI
- A GPU in a usable IOMMU group
- A second display or remote-management method when this is the host's only GPU

This guide uses the current Proxmox VE baseline. It does not add ACS overrides, unsafe interrupts, generic framebuffer flags or vendor-specific reset modules.

## Find the GPU and Its Functions

```shell
lspci -nnk | grep -A3 -E "VGA|3D|Audio"
```

A GPU can have separate graphics, audio, USB and USB-C functions. Note the PCI addresses and the vendor/device IDs in brackets:

```text
0b:00.0 VGA compatible controller [0300]: NVIDIA Corporation GPU [10de:1e81]
0b:00.1 Audio device [0403]: NVIDIA Corporation Audio [10de:10f8]
```

Do not copy these example addresses or IDs.

## Load VFIO

Edit `/etc/modules`:

```shell
nano /etc/modules
```

Add:

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

Recent Proxmox kernels enable IOMMU by default on AMD and on Intel with kernel 6.8 or newer after it is enabled in firmware. Older Intel kernels may require `intel_iommu=on`; follow the bootloader instructions for the installed Proxmox version instead of assuming the host uses GRUB.

## Verify IOMMU

```shell
dmesg | grep -e DMAR -e IOMMU -e AMD-Vi
```

The exact output varies. It must show that IOMMU, Directed I/O or interrupt remapping is enabled.

Check Proxmox's PCI and IOMMU information. Replace `NODE` with the node name:

```shell
pvesh get /nodes/NODE/hardware/pci --pci-class-blacklist ""
```

It is normal for a GPU to share a group with its own functions or root port. Do not pass an unrelated host device only to work around a poor group.

## Bind the GPU to VFIO When Needed

Proxmox VE tries to make an assigned PCI device unavailable to the host automatically. Normally, add the GPU to the VM in the next section first and return here only if assignment fails. After assigning the GPU and rebooting, check each function:

```shell
lspci -nnk -s 0b:00
```

The driver should be `vfio-pci`, or the `Kernel driver in use` line may be absent.

If automatic binding fails, add only the IDs verified on this host:

```shell
echo "options vfio-pci ids=10de:1e81,10de:10f8" > /etc/modprobe.d/vfio.conf
update-initramfs -u -k all
reboot
```

Replace both example IDs. If the host needs the same driver for another GPU, do not blacklist that driver globally.

## Add the GPU to the VM

1. Shut down the VM.
2. Open **Hardware** > **Add** > **PCI Device**.
3. Select the GPU by its PCI address.
4. Use **All Functions** when the related GPU functions must be passed together.
5. Use **PCI-Express** with the `q35` machine type.
6. Enable **Primary GPU** only when the guest should use the physical GPU as its main display.

Proxmox recommends `q35`, OVMF and PCIe for the best GPU-passthrough compatibility. OVMF requires a UEFI-capable GPU ROM; otherwise use SeaBIOS.

!!! note

    The passed-through GPU framebuffer is not available through the Proxmox noVNC or SPICE console. Connect a monitor to the GPU or configure remote desktop inside the guest. Keep the virtual display until remote access works.

## Install and Verify the Guest Driver

Install the driver supported by the guest operating system and GPU vendor. Avoid copying a fixed driver version from an old guide.

On Linux:

```shell
lspci -nnk | grep -A3 -E "VGA|3D|Audio"
```

For NVIDIA compute workloads, verify the installed NVIDIA driver with:

```shell
nvidia-smi
```

On Windows, check **Device Manager** and the GPU vendor's control or diagnostic tool.

## Troubleshooting

```shell
dmesg -w
lspci -nnk
lspci -nnk -s 0b:00
```

Use the real PCI address from your host. If the device does not reset cleanly, check the GPU model, firmware and vendor documentation before installing any out-of-tree reset module. The `vendor-reset` project supports only the AMD device families listed by that project; it is not an NVIDIA RTX fix.

## Sources

- [Proxmox VE Administration Guide: PCI(e) Passthrough](https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf)
- [vendor-reset supported devices](https://github.com/gnif/vendor-reset#supported-devices)
- [NVIDIA driver downloads](https://www.nvidia.com/en-us/drivers/)
