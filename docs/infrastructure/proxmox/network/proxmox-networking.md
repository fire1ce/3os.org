---
title: Proxmox Networking
description: Proxmox Networking examples, static and DHCP configuration and vlan aware configuration
template: comments.html
tags: [proxmox, network]
---

# Proxmox Networking

Official Proxmox networking documentation can be found [here][proxmox-network-configuration-url]{target=\_blank}.

## Basics

```shell title="Proxmox network configuration file location"
/etc/network/interfaces
```

```shell title="Restart proxmox network service to apply changes"
systemctl restart networking.service
```

## Example of Multi Network Interface Server

The next examples will be based on the following network nics, `ip addr` output:

```shell
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: enp7s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 18:c0:4d:00:9f:b7 brd ff:ff:ff:ff:ff:ff
3: enp6s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 18:c0:4d:00:9f:b9 brd ff:ff:ff:ff:ff:ff
4: enp12s0f4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq master vmbr0 state UP group default qlen 1000
    link/ether 00:07:43:29:42:c0 brd ff:ff:ff:ff:ff:ff
5: enp12s0f4d1: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 00:07:43:29:42:c8 brd ff:ff:ff:ff:ff:ff
6: enp12s0f4d2: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 00:07:43:29:42:d0 brd ff:ff:ff:ff:ff:ff
7: enp12s0f4d3: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 00:07:43:29:42:d8 brd ff:ff:ff:ff:ff:ff
8: wlp5s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 8c:c6:81:f0:a6:9a brd ff:ff:ff:ff:ff:ff
9: vmbr0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 00:07:43:29:42:c0 brd ff:ff:ff:ff:ff:ff
    inet 192.168.100.12/24 scope global vmbr0
       valid_lft forever preferred_lft forever
```

In order Identify physical network interfaces corresponding to Network Interfaces name in Proxmox you can follow [this guide][identify-nics-url]

Breakdown of the `ip addr` output:

1. `lo` is a loopback interface.
2. `enp7s0` is a 2.5G network interface.
3. `enp6s0` is a 1G network interface.
4. `enp12s0f4` is a 10G network interface.
5. `enp12s0f4d1` is a 10G network interface.
6. `enp12s0f4d2` is a 10G network interface.
7. `enp12s0f4d3` is a 10G network interface.
8. `wlp5s0` is a Wifi network interface
9. `vmbr0` is a bridge interface.

The content of the `/etc/network/interfaces` after fresh installation:

```shell
auto lo
iface lo inet loopback

iface enp12s0f4 inet manual

auto vmbr0
iface vmbr0 inet static
	address 192.168.100.12/24
	gateway 192.168.100.1
	bridge-ports enp12s0f4
	bridge-stp off
	bridge-fd 0

iface enp7s0 inet manual

iface enp6s0 inet manual

iface enp12s0f4d1 inet manual

iface enp12s0f4d2 inet manual

iface enp12s0f4d3 inet manual

iface wlp5s0 inet manual
```

!!! info

    **`vmbr0` is a bridge interface. It's used to provision network to virtual machines and containers on Proxmox VE Server.
    We can assign multiple network interfaces to the bridge interface with `bridge-ports` option.**

## Static IP Bridge Configuration

The following example shows a static IP configuration `vmbr0` bridge interface, including two network interfaces `enp12s0f4` and `enp7s0`.

```config
auto vmbr0
iface vmbr0 inet static
           address 192.168.100.12/24
           gateway 192.168.100.1
           bridge-ports enp12s0f4 enp7s0
           bridge-stp off
           bridge-fd 0
```

Configuring multi network interfaces to the bridge interface will provide you a failover behavior when the network interface is down or disconnected - for example, when specific switch is down.

## Static IP Bridge with VLAN Aware Configuration

The following example shows a static IP as above but with VLAN Aware bridge.

```config hl_lines="8 9"
auto vmbr0
iface vmbr0 inet static
           address 192.168.100.12/24
           gateway 192.168.100.1
           bridge-ports enp12s0f4 enp7s0
           bridge-stp off
           bridge-fd 0
           bridge-vlan-aware yes
           bridge-vids 2-4094
```

## DHCP Bridge Configuration

The following example shows a DHCP configuration `vmbr0` bridge interface, including two network interfaces `enp12s0f4` and `enp7s0`.

```config
auto vmbr0
iface vmbr0 inet dhcp
           bridge-ports enp12s0f4 enp7s0
           bridge-stp off
           bridge-fd 0
```

## DHCP Bridge with VLAN Aware Configuration

The following example shows a DHCP as above but with VLAN Aware bridge.

```config
auto vmbr0
iface vmbr0 inet dhcp
           bridge-ports enp12s0f4 enp7s0
           bridge-stp off
           bridge-fd 0
           bridge-vlan-aware yes
           bridge-vids 2-4094
```

## Peronsal Network Configuration

Here's a sample of the `/etc/network/interfaces` file for a personal network:

```shell
auto lo
iface lo inet loopback

auto vmbr0
iface vmbr0 inet dhcp
           bridge-ports enp12s0f4 enp12s0f4d1 enp12s0f4d2 enp12s0f4d3 enp7s0
           bridge-stp off
           bridge-fd 0
           bridge-vlan-aware yes
           bridge-vids 2-4094

iface enp12s0f4 inet manual

iface enp12s0f4d1 inet manual

iface enp12s0f4d2 inet manual

iface enp12s0f4d3 inet manual

iface enp7s0 inet manual

iface enp6s0 inet manual

iface wlp5s0 inet manual
```

<!-- appendices -->

<!-- urls -->

[identify-nics-url]: /linux/Network/identify-nics/
[proxmox-network-configuration-url]: https://pve.proxmox.com/wiki/Network_Configuration 'Proxmox VE Server Network Configuration Wiki'

<!-- images -->

[default-ipv6-proxmox-img]: /assets/images/1ee15c1c-bd9a-11ec-926f-3b1ee33b95ee.jpg 'Default IPv6 Proxmox Image'
[no-ipv6-proxmox-img]: /assets/images/542c7a30-bd9c-11ec-848e-932ce851a8c3.jpg 'No IPv6 Proxmox Image'

<!-- end appendices -->
