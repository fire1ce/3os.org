---
title: Proxmox Networking
description: How to disable IPv6 on Proxmox VE Server.
template: comments.html
tags: [proxmox, ipv6]
---

# Proxmox Networking

## Network Interface Configurations

Static Example

```config
auto ens33
iface ens33 inet static
           address 192.168.0.10
           netmask 255.255.255.0
           dns-nameservers 192.168.0.1
           gateway 192.168.0.1
```

DHCP Example

```config
auto eth0
iface eth0 inet dhcp
```

Bridge: Static Example

```config
auto vmbr0
iface vmbr0 inet static
        address 192.168.100.20/24
        gateway 192.168.100.1
        bridge-ports eth0
        bridge-stp off
        bridge-fd 0
```

Bridge: DHCP Example

```config
auto vmbr0
iface vmbr0 inet dhcp
        bridge-ports eth0
        bridge-stp off
        bridge-fd 0
```

## Disable IPv6 on Proxmox VE

By default, Proxmox IPv6 is enabled after installation. This means that the IPv6 stack is active and the host can communicate with other hosts on the same network via IPv6 protocol.

Output of `ip addr` command:

![Default IPv6 Proxmox][default-ipv6-proxmox-img]

You can disable IPv6 on Proxmox VE by editing the `/etc/sysctl.conf` file.

```shell
nano /etc/sysctl.conf
```

Append the following to the end of the file

```bash
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
```

Save and exit. Reboot Proxmox Server to apply the changes.

Output of `ip addr` command after disabling IPv6 on Proxmox VE:

![No IPv6 Proxmox Image][no-ipv6-proxmox-img]

<!-- appendices -->

<!-- urls -->

<!-- images -->

[default-ipv6-proxmox-img]: /assets/images/1ee15c1c-bd9a-11ec-926f-3b1ee33b95ee.jpg 'Default IPv6 Proxmox Image'
[no-ipv6-proxmox-img]: /assets/images/542c7a30-bd9c-11ec-848e-932ce851a8c3.jpg 'No IPv6 Proxmox Image'

<!-- end appendices -->
