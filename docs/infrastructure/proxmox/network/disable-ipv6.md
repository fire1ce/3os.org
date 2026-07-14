---
title: Disable IPv6 on Proxmox VE
description: Permanently disable IPv6 on a Proxmox VE host with the sysctl method recommended in the current Proxmox documentation.
template: comments.html
tags: [proxmox, ipv6, sysctl, networking]
---

# Disable IPv6 on Proxmox VE

Proxmox VE works with or without IPv6 and recommends keeping the default network configuration. Disable IPv6 only when the network design requires it.

!!! warning

    Check the node, cluster, storage and management configuration first. Disabling a protocol that is already in use can disconnect the host or break services.

## Create the sysctl Configuration

The current Proxmox documentation recommends a sysctl file instead of disabling IPv6 through the kernel command line.

Create the file:

```shell
nano /etc/sysctl.d/disable-ipv6.conf
```

Add:

```text
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

Save the file and load the settings:

```shell
sysctl --system
```

## Verify the Result

```shell
sysctl net.ipv6.conf.all.disable_ipv6
sysctl net.ipv6.conf.default.disable_ipv6
```

Both values should be `1`.

Check the host addresses:

```shell
ip -6 address show
```

Reboot the node during a maintenance window, then run the verification commands again to confirm that the settings persist.

## Re-enable IPv6

Remove the custom file and reboot:

```shell
rm /etc/sysctl.d/disable-ipv6.conf
reboot
```

After the reboot, verify that both `disable_ipv6` values returned to `0`.

## Source

- [Proxmox VE Network Configuration: Disabling IPv6](https://pve.proxmox.com/wiki/Network_Configuration#sysadmin_network_disable_ipv6)
