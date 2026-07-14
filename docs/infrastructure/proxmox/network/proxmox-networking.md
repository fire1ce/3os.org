---
title: Proxmox VE Network Configuration
description: Configure Proxmox VE Linux bridges, VLAN-aware networking, and bonded interfaces with current, documented examples.
template: comments.html
tags: [proxmox, network, linux-bridge, vlan, bonding]
---

# Proxmox VE Network Configuration

This guide shows how to configure Linux bridges, VLANs, and network bonds on Proxmox VE. You can manage the network from the web interface or by editing `/etc/network/interfaces`. Proxmox recommends using the web interface because it helps protect you from configuration errors. The examples below follow the official [Proxmox VE network configuration][proxmox-network-configuration-url] and [administration guide][proxmox-admin-guide-url].

!!! warning

    A network error can make the node unreachable. Always keep local console or out-of-band access available before changing the management interface.

## Apply Network Changes

If you make changes from the Proxmox VE web interface, click **Apply Configuration**. Proxmox saves the pending changes in `/etc/network/interfaces.new` before applying them.

If you edit `/etc/network/interfaces` directly, apply the changes with:

```shell
ifreload -a
```

`ifupdown2` is installed by default on new Proxmox VE installations since version 7.0. You can also reboot the node to apply the configuration. Avoid using `ifdown` and `ifup` on a guest bridge unless you understand their effect on running guest traffic.

## Default Static Bridge

A new Proxmox VE installation normally creates `vmbr0` and connects it to the first Ethernet interface. Replace the interface name, address, and gateway in this example with values from your network.

```config
auto lo
iface lo inet loopback

iface eno1 inet manual

auto vmbr0
iface vmbr0 inet static
        address 192.168.10.2/24
        gateway 192.168.10.1
        bridge-ports eno1
        bridge-stp off
        bridge-fd 0
```

The management address belongs on the bridge, not on its physical bridge port. Guests connected to `vmbr0` appear on the physical network with their own MAC addresses.

If you need to map a physical port to its Linux interface name, follow the [network-interface identification guide][identify-nics-url].

## VLAN-Aware Bridge

A VLAN-aware Linux bridge allows you to configure a VLAN tag on a guest network interface. The following documented example places the Proxmox VE management address on VLAN 5 and allows VLAN IDs 2 through 4094 on `vmbr0`:

```config
auto lo
iface lo inet loopback

iface eno1 inet manual

auto vmbr0.5
iface vmbr0.5 inet static
        address 10.10.10.2/24
        gateway 10.10.10.1

auto vmbr0
iface vmbr0 inet manual
        bridge-ports eno1
        bridge-stp off
        bridge-fd 0
        bridge-vlan-aware yes
        bridge-vids 2-4094
```

Make sure the connected switch port carries the VLANs used by the host and guests.

## Redundant Bridge with a Linux Bond

Adding multiple physical interfaces directly to `bridge-ports` does not create documented failover. For network redundancy, create a Linux bond and use the bond as the bridge port.

The `active-backup` mode keeps one interface active and uses another interface if the active one fails. Proxmox recommends this mode when your switch does not support LACP:

```config
auto lo
iface lo inet loopback

iface eno1 inet manual
iface eno2 inet manual

auto bond0
iface bond0 inet manual
        bond-slaves eno1 eno2
        bond-miimon 100
        bond-mode active-backup

auto vmbr0
iface vmbr0 inet static
        address 10.10.10.2/24
        gateway 10.10.10.1
        bridge-ports bond0
        bridge-stp off
        bridge-fd 0
```

If your switch supports IEEE 802.3ad LACP, Proxmox recommends the `802.3ad` bond mode. You must also configure LACP on the switch. Follow the complete bond section in the official documentation before enabling it.

## Verify the Configuration

After applying the configuration, run the following commands to check the interfaces, addresses, routes, bridge ports, and bond state:

```shell
ip -brief link
ip -brief address
ip route
bridge link
cat /proc/net/bonding/bond0
```

The final command applies only when `bond0` exists.

<!-- appendices -->

<!-- urls -->

[identify-nics-url]: ../../../linux/Network/identify-nics.md
[proxmox-network-configuration-url]: https://pve.proxmox.com/wiki/Network_Configuration 'Proxmox VE Network Configuration'
[proxmox-admin-guide-url]: https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf 'Proxmox VE Administration Guide'

<!-- end appendices -->
