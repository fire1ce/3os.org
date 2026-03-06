---
title: GPU Passthrough to VM
description: Proxmox full gpu passthrough to VM configuration for hardware acceleration.
template: comments.html
tags: [proxmox, gpu, passthrough]
---

# Proxmox GPU Passthrough to VM

## Introduction

GPU passthrough is a technology that allows the Linux kernel to present the internal PCI GPU directly to the virtual machine. The device behaves as if it were powered directly by the virtual machine, and the virtual machine detects the PCI device as if it were physically connected.
We will cover how to enable GPU passthrough to a virtual machine in Proxmox VE.

!!! Warning ""

    **Your mileage may vary depending on your hardware.**

!!! Note "Prerequisites"

    Before starting, make sure IOMMU / VT-d (Intel) or AMD-Vi (AMD) is **enabled in your BIOS/UEFI**.

## Proxmox Configuration for GPU Passthrough

The following examples use an `SSH` connection to the Proxmox server.

### Find the GPU PCI Address

```shell
lspci -nnv | grep VGA
```

Output will look similar to:

```shell
0b:00.0 VGA compatible controller [0300]: NVIDIA Corporation TU104 [GeForce RTX 2080 SUPER] [10de:1e81] (rev a1)
```

The PCI address is `0b:00.0`. List all devices in the same PCI group:

```shell
lspci -s 0b:00
```

A multi-function GPU typically includes a GPU, Audio, USB and UCSI controller:

```shell
0b:00.0 VGA compatible controller: NVIDIA Corporation TU104 [GeForce RTX 2080 SUPER] (rev a1)
0b:00.1 Audio device: NVIDIA Corporation TU104 HD Audio Controller (rev a1)
0b:00.2 USB controller: NVIDIA Corporation TU104 USB 3.1 Host Controller (rev a1)
0b:00.3 Serial bus controller: NVIDIA Corporation TU104 USB Type-C UCSI Controller (rev a1)
```

Get the vendor:device IDs for the VFIO configuration:

```shell
lspci -s 0b:00 -n
```

```shell
0b:00.0 0300: 10de:1e81 (rev a1)
0b:00.1 0403: 10de:10f8 (rev a1)
0b:00.2 0c03: 10de:1ad8 (rev a1)
0b:00.3 0c80: 10de:1ad9 (rev a1)
```

Note the IDs — you'll need them in the next steps:

```shell
10de:1e81,10de:10f8,10de:1ad8,10de:1ad9
```

### Configure GRUB

Edit the GRUB configuration file:

```shell
nano /etc/default/grub
```

Find the `GRUB_CMDLINE_LINUX_DEFAULT` line and update it:

=== "For Intel CPU"

    ```shell
    GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt video=efifb:off video=vesa:off kvm.ignore_msrs=1 modprobe.blacklist=radeon,nouveau,nvidia,nvidiafb,nvidia-gpu"
    ```

=== "For AMD CPU"

    ```shell
    GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt video=efifb:off video=vesa:off kvm.ignore_msrs=1 modprobe.blacklist=radeon,nouveau,nvidia,nvidiafb,nvidia-gpu"
    ```

!!! Note "What each flag does"

    - `iommu=pt` — passthrough mode, improves performance
    - `video=efifb:off video=vesa:off` — prevents the host from using the GPU framebuffer
    - `kvm.ignore_msrs=1` — suppresses NVIDIA MSR access errors in KVM
    - `modprobe.blacklist=...` — prevents host GPU drivers from loading

Save and update GRUB:

```shell
update-grub
```

### Configure VFIO

Create the VFIO configuration file. Replace the IDs with the ones from your GPU:

```shell
echo "options vfio-pci ids=10de:1e81,10de:10f8,10de:1ad8,10de:1ad9 disable_vga=1" > /etc/modprobe.d/vfio.conf
```

!!! Note ""

    `disable_vga=1` prevents the host from trying to use the GPU as a VGA device.

Add the required VFIO kernel modules to `/etc/modules`:

```shell
nano /etc/modules
```

```shell
# Modules required for PCI passthrough
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

### Install vendor-reset (NVIDIA RTX Cards)

NVIDIA RTX (Turing/Ampere/Ada) GPUs have a hardware reset bug that prevents proper VM passthrough without a software fix. Install the `vendor-reset` kernel module:

```shell
apt install -y dkms git build-essential pve-headers-$(uname -r)
git clone https://github.com/gnif/vendor-reset.git /tmp/vendor-reset
cd /tmp/vendor-reset && dkms install .
echo "vendor_reset" >> /etc/modules
```

### Apply Changes

```shell
update-initramfs -u -k all
```

**Reboot Proxmox to apply the changes.**

### Verify IOMMU is Enabled

```shell
dmesg | grep -e DMAR -e IOMMU -e AMD-Vi
```

=== "Intel — expected output"

    ```shell
    [0.067203] DMAR: IOMMU enabled
    ```

=== "AMD — expected output"

    ```shell
    [2.311473] pci 0000:00:00.2: AMD-Vi: IOMMU performance counters supported
    [2.318109] perf/amd_iommu: Detected AMD IOMMU #0 (2 banks, 4 counters/bank)
    ```

### Verify VFIO Binding

Confirm all GPU functions are bound to `vfio-pci`:

```shell
lspci -k | grep -A3 "0b:00"
```

You should see `Kernel driver in use: vfio-pci` for each function.

### Verify IOMMU Groups

Check that the GPU is isolated in its own IOMMU group:

```bash
for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do
  echo "IOMMU Group ${g##*/}:"
  for d in $g/devices/*; do
    echo -e "\t$(lspci -nns ${d##*/})"
  done
done
```

The GPU and all its functions should appear together in a single group, with no other unrelated devices sharing that group.

Now your Proxmox host is ready for GPU passthrough!

---

## Windows Virtual Machine GPU Passthrough Configuration

For best results use the [Windows 10/11 Virtual Machine configuration for Proxmox][windows-vm-configuration-url].

!!! Failure "Limitations & Workarounds"

    - In order for the GPU to function properly in the VM, you must disable Proxmox's Virtual Display — set it to `none`.
    - You will lose the ability to connect to the VM via Proxmox's Console.
    - Display must be connected to the physical output of the GPU for Windows to initialize the GPU properly.
    - **You can use a [HDMI Dummy Plug][hdmi-dummy-pluh-amazon-url]{target=\_blank} as a workaround.**
    - Make sure you have an alternative way to connect to the VM, for example via Remote Desktop (RDP).

In the Proxmox web UI, navigate to the VM's **Hardware** tab → **Add** → **PCI Device**.

Select the GPU by its PCI address (`0000:0b:00.0`) and enable:

- ✅ All Functions
- ✅ ROM-Bar
- ✅ Primary GPU
- ✅ PCI-Express

Power on the VM, connect via RDP, and install the latest NVIDIA driver from the [NVIDIA website](https://www.nvidia.com/drivers){target=\_blank}.

Verify with [GPU-Z][gpu-z-url]{target=\_blank} or Device Manager.

---

## Linux VM GPU Passthrough Configuration (Headless)

This section covers a **headless Ubuntu Server** setup for GPU compute workloads (AI, CUDA, etc.).

### VM Configuration in Proxmox

- **Machine type**: `q35`
- **BIOS**: SeaBIOS (default)
- **CPU type**: `host`
- **VGA**: `serial0` (no display needed)

In the Proxmox web UI, navigate to the VM's **Hardware** tab → **Add** → **PCI Device**.

Select the GPU (`0000:0b:00.0`) and enable:

- ✅ All Functions
- ✅ PCI-Express
- ❌ ROM-Bar — **must be disabled for headless Linux VMs**
- ❌ Primary GPU

!!! Warning "ROM-Bar must be disabled for headless Linux VMs"

    With SeaBIOS, enabling ROM-Bar causes the firmware to execute the GPU's VBIOS during POST. On NVIDIA RTX cards this hangs the VM at boot. Disabling ROM-Bar skips GPU firmware initialization — safe for compute-only use where you don't need display output.

### Boot the VM

Boot the VM and verify the GPU is visible:

```shell
lspci | grep -i nvidia
```

Expected output:

```shell
01:00.0 VGA compatible controller: NVIDIA Corporation TU104 [GeForce RTX 2080 SUPER] (rev a1)
01:00.1 Audio device: NVIDIA Corporation TU104 HD Audio Controller (rev a1)
01:00.2 USB controller: NVIDIA Corporation TU104 USB 3.1 Host Controller (rev a1)
01:00.3 Serial bus controller: NVIDIA Corporation TU104 USB Type-C UCSI Controller (rev a1)
```

### Install NVIDIA Drivers

Check which driver versions are available:

```shell
apt search nvidia-driver | grep "^nvidia-driver-[0-9]"
```

Install the latest production driver (headless — no GUI packages):

```shell
apt install --no-install-recommends -y nvidia-driver-570 nvidia-utils-570
```

Reboot the VM:

```shell
reboot
```

Verify driver initialization:

```shell
nvidia-smi
```

Expected output:

```shell
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 570.x.xx    Driver Version: 570.x.xx    CUDA Version: 12.x     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
|   0  NVIDIA GeForce RTX 2080 SUPER  Off |   00000000:01:00.0 Off |                  N/A |
+-----------------------------------------------------------------------------------------+
```

### Install NVIDIA Container Toolkit (Docker GPU Support)

To use the GPU inside Docker containers:

```shell
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  > /etc/apt/sources.list.d/nvidia-container-toolkit.list

apt update && apt install -y nvidia-container-toolkit
nvidia-ctk runtime configure --runtime=docker
systemctl restart docker
```

Test GPU access inside a container:

```shell
docker run --rm --gpus all nvidia/cuda:12.0-base-ubuntu22.04 nvidia-smi
```

---

## Debug

Show hardware initialization messages and errors:

```shell
dmesg -w
```

Display all PCI devices:

```shell
lspci
```

Show kernel driver in use for each PCI device:

```shell
lspci -k
```

Check VFIO binding for a specific device:

```shell
lspci -k -s 0b:00
```

Display IOMMU groups:

```bash
for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do
  echo "IOMMU Group ${g##*/}:"
  for d in $g/devices/*; do
    echo -e "\t$(lspci -nns ${d##*/})"
  done
done
```

<!-- urls -->

[windows-vm-configuration-url]: ../windows-vm-configuration.md 'Windows VM Configuration'
[gpu-z-url]: https://www.techpowerup.com/gpuz/ 'GPU-Z Homepage'
[hdmi-dummy-pluh-amazon-url]: https://amzn.to/391shDL 'HDMI Dummy Plug Amazon'

<!-- images -->

<!-- Proxmox/general Images-->

[proxmox-lspci-vga-img]: ../../../assets/images/8886bc4a-be38-11ec-ba3b-d3e0526955c4.jpg 'Proxmox lspci vga'
[general-vm-add-gpu-to-vm-img]: ../../../assets/images/a7d93848-be38-11ec-9607-2ba8ccd0b5ab.jpg 'Add GPU to VM'

<!-- Windows Images-->

[windows-vm-add-pci-device-img]: ../../../assets/images/893555e4-b914-11ec-8e85-df9da2014d5a.jpg 'Windows VM Add PCI Device'
[windows-vm-gpu-pci-settings-img]: ../../../assets/images/d48456fc-be38-11ec-a8da-c747b71c446f.jpg 'Windows VM GPU PCI Settings'
[windows-vm-gpu-hardware-settings-img]: ../../../assets/images/157b55e8-be3e-11ec-a2c2-97d25fe194df.jpg 'Windows VM GPU Hardware Settings'
[gpu-z-and-device-manager-gpu-img]: ../../../assets/images/13d3484a-be39-11ec-9c17-d311291bdb58.jpg 'GPU-Z and Device Manager GPU'

<!-- Ubuntu Images-->

[ubuntu-vm-add-pci-device-img]: ../../../assets/images/3d942380-be3d-11ec-99fc-0778f9dc8acd.jpg 'Ubuntu VM Add PCI Device'
[ubuntu-vm-gpu-pci-settings-img]: ../../../assets/images/4dc679d8-be3d-11ec-8ef7-03c9f9ba3344.jpg 'Ubuntu VM GPU PCI Settings'
[ubuntu-vm-gpu-hardware-settings-img]: ../../../assets/images/6953aefa-be3d-11ec-bfe8-7f9219dc10e2.jpg 'Ubuntu VM GPU Hardware Settings'
[ubuntu-vm-gpu-nvidia-smi]: ../../../assets/images/a6de4412-be40-11ec-85e6-338ef50c9599.jpg 'Ubuntu VM GPU Nvidia-smi'
