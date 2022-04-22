---
title: Identify Network Interfaces
description: Identify physical network interfaces coresponding to Network Interfaces name in the linux system.
template: comments.html
tags: [linux, network]
---

# Identify Physical Network Interfaces

## The Problem

Servers usually have a number of physical network interfaces. The network interfaces names in linux host usually won't tell you much about the which physical network interface corresponds to the interface name. Therefor, it creates a problem when you want to use a specific network interface for a specific purpose but you don't know which physical network interface corresponds to the interface name.

## The Solution

`ethtool` tool can be used to identify the physical network interface corresponding to a network interface name.

For this method to work, you need a `physical access`to host's network cards and the physical network interfaces should have `Led indicator` lights.

!!! note

    This functionality of ethtool may not be supported by all server or network card hardware.

`ethtool` usually isn't installed by default on a linux host. You can install it by running the following command (debian example):

```shell
apt install ethtool
```

Find the network interfaces present on the host and run the following command for each network interface:

```shell
ip addr
```

or

```shell
ifconfig -a
```

Now you can use the `ethtool` command to identify the physical network interface corresponding to the network interface name.

Example for `eth0` network interface name:

```shell
ethtool --identify eth0
```

This command will run untill you stop it. When it's running, you should see the LED indicator `light blinking` (usually orange) on the physical network interface corresponding to the network interface name.

To get information about the hardware capabilities of the network interface:

```shell
ethtool eth0
```

output example:

```shell
ethtool enp12s0f4

Settings for enp12s0f4:
	Supported ports: [ FIBRE ]
	Supported link modes:   1000baseT/Full
	                        10000baseT/Full
	Supported pause frame use: Symmetric Receive-only
	Supports auto-negotiation: No
	Supported FEC modes: None
	Advertised link modes:  10000baseT/Full
	Advertised pause frame use: Symmetric
	Advertised auto-negotiation: No
	Advertised FEC modes: None
	Link partner advertised link modes:  Not reported
	Link partner advertised pause frame use: Symmetric
	Link partner advertised auto-negotiation: No
	Link partner advertised FEC modes: None
	Speed: 10000Mb/s
	Duplex: Full
	Auto-negotiation: off
	Port: Direct Attach Copper
	PHYAD: 255
	Transceiver: internal
        Current message level: 0x000000ff (255)
                               drv probe link timer ifdown ifup rx_err tx_err
	Link detected: yes
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
