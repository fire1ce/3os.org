---
title: Cloud Image Template
description: Proxmox tutorial for creating and using Cloud Image Template. This tutorial will walk you through creating a Cloud Image Template, and using it to create a new VM.
template: comments.html
tags: [proxmox, virtualization]
---

# Proxmox Cloud Image Template

## What Cloud Images

Cloud images are operating system templates and every instance starts out as an identical clone of every other instance. It is the user data that gives every cloud instance its personality and cloud-init is the tool that applies user data to your instances automatically.

## Advantage of Cloud Image Template

> - Predefined SSH keys
> - Predefined user account
> - Predefined network configuration
> - VM creation time is under few minutes
> - No installation process required like with ISO images
> - First boot always updated with latest updates

## Ubuntu Cloud Images

Ubuntu provides official cloud images you can find the proper image for your needs at [cloud-images.ubuntu.com][ubuntu-cloud-images-url]{target=\_blank}.

In this tutorial we will be using `Ubuntu Server 22.04 LTS Jammy Jellyfish` cloud image.

## Create Cloud Image Template

SSH to you Proxmox server.

Download the cloud image template from the official website.

```shell
wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img
```

In order to create a cloud image template first of all we need to create a new `VM`. After we will configure it we will create a `Template` from it.

The following parameters will predefine our `Base Template`

Command parameters description:

- **9000**: VM ID in Proxmox. I prefer to use high number for management purposes.
- **memory**: VM's memory in MB.
- **core**: Number of CPU cores for the VM.
- **name**: Name of the VM and the template.
- **net0**: Network interface for the VM.
- **bridge**: Network bridge for the VM.
- **agent**: Enable or disable QEMU agent support.
- **onboot**: Enable or disable VM start on boot.

Create a new virtual machine.

```shell
qm create 9000 --memory 2048 --core 2 --name ubuntu-22.04-cloud --net0 virtio,bridge=vmbr0 --agent enabled=1 --onboot 1
```

The default storage Proxmox creates for vm is **storage1**.
In my case I use different storage for vm's and templates named **storage1**.  
The following commands will utilize the **storage1** storage. Change the storage name for your Proxmox server.

Import the downloaded `Ubuntu Cloud Image` we downloaded before disk to the storage.

```shell
qm importdisk 9000 jammy-server-cloudimg-amd64.img storage1
```

Attach the new disk to the vm as a `scsi` drive on the `scsi` controller

```shell
qm set 9000 --scsihw virtio-scsi-pci --scsi0 storage1:vm-9000-disk-0
```

Add cloud init drive

```shell
qm set 9000 --ide2 storage1:cloudinit
```

Make the cloud init drive bootable and restrict BIOS to boot from disk only

```shell
qm set 9000 --boot c --bootdisk scsi0
```

Add serial console

```shell
qm set 9000 --serial0 socket --vga serial0
```

!!! Danger "WARNING: DO NOT START THE VM"

    Powering on the vm will create a unique ID that will presist with the template. We want to avoid this.

Now had to the Proxmox web interface. Select the new vm and `Cloud-Init` tab.

![Cloud-Init-Tab][cloud-init-tab-img]

Configure the default setting for the cloud image template. This will alow the VM to start with predefined user, password, ssh keys and network configuration.

![Cloud-Init-Settings][cloud-init-settings-img]

At this point we configured the VM and we can create a cloud image template from it.

Create a new cloud image template.

```shell
qm template 9000
```

Now you can use the Cloud Image Template to create new vm instances.  
You can do it from the Proxmox web interface or from the command line.

!!! tip

    Use **Full Clone** when creating a new VM from a cloud image template. **Linked Clone** will privent you from deleting the cloud image template.

![Clone-Settings][clone-settings-img]

Cli example:

```shell
qm clone 9000 122 --name my-new-vm --full
```

## VM's Storage

Since we are using a minimal cloud image template. Cloned VM's will use the same storage as the template which is about **2GB** of disk space.

You can utilize an automated script to to expand the disk space of the cloned VM: [VM Disk Expander][vm-disk-expander-url]

## Troubleshooting

### Reseting VM's `machine-id`

Run the following command inside the VM to reset the machine-id.

```shell
sudo rm -f /etc/machine-id
sudo rm -f /var/lib/dbus/machine-id
```

Shutdown the VM. Then power it back on. The machine-id will be regenerated.

If the machine-id is not regenerated you can try to fix it by running the following command.

```shell
sudo systemd-machine-id-setup
```

<!-- appendices -->

<!-- urls -->

[vm-disk-expander-url]: /infrastructure/proxmox/vm-disk-expander/ 'VM Disk Expander'
[ubuntu-cloud-images-url]: https://cloud-images.ubuntu.com/ 'Ubuntu Cloud Images'

<!-- images -->

[cloud-init-tab-img]: /assets/images/b64dcd76-f565-11ec-8713-e3bd1fbe1fc8.jpg 'Cloud-Init-Tab'
[cloud-init-settings-img]: /assets/images/24c2ddfa-f566-11ec-b270-871b30f0c3d5.jpg 'Cloud-Init-Settings'
[clone-settings-img]: /assets/images/97e770a6-f567-11ec-8722-d31a81422ae4.jpg 'Clone-Settings'

<!--css-->

<!-- end appendices -->
