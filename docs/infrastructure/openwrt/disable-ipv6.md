---
title: Disable IPv6 on OpenWrt
description: Disable IPv6 interfaces and LAN address distribution on OpenWrt with current UCI settings and verification commands.
template: comments.html
tags: [openwrt, ipv6, uci, networking]
---

# Disable IPv6 on OpenWrt

This guide will disable IPv6 on the standard `lan`, `wan`, and `wan6` interfaces. It will also disable Router Advertisement (RA), DHCPv6, and NDP relay services on `lan`. It does not remove IPv6 packages or disable `odhcpd` globally.

!!! warning

    Before continuing, make sure your internet service does not use IPv6 for DS-Lite, MAP, or 464XLAT. Disabling IPv6 on these connections can also stop IPv4 connectivity.

The commands use the default interface names `lan`, `wan`, and `wan6`. First, check the interface names on your router:

```shell
uci show network
uci show dhcp
```

## Disable IPv6 Interfaces and LAN Services

OpenWrt documents the `ipv6` and `disabled` options in its [UCI networking options][openwrt-uci-network-url]. The `ra`, `dhcpv6`, and `ndp` service modes are documented in the [`odhcpd` reference][openwrt-odhcpd-url].

Run the following commands:

```shell
uci set network.lan.ipv6='0'
uci set network.wan.ipv6='0'
uci set network.wan6.disabled='1'
uci -q delete network.lan.ip6assign
uci -q delete network.globals.ula_prefix

uci set dhcp.lan.ra='disabled'
uci set dhcp.lan.dhcpv6='disabled'
uci set dhcp.lan.ndp='disabled'

uci commit network
uci commit dhcp
service network restart
service odhcpd restart
```

The [OpenWrt IPv6 configuration reference][openwrt-ipv6-configuration-url] defines `ip6assign` as the prefix length delegated to an interface. Deleting this option stops prefix assignment to `lan`. Deleting `network.globals.ula_prefix` removes the configured Unique Local Address prefix. The three `dhcp.lan` settings stop IPv6 address and route advertisement services on `lan` without shutting down `odhcpd` for every interface.

## Verify the Result

Run the following commands to check the saved UCI settings, IPv6 addresses, and routes:

```shell
uci show network.lan
uci show network.wan
uci show network.wan6
uci show dhcp.lan
ip -6 address show
ip -6 route show
```

If your router uses different interface names, apply and check the same settings on each LAN and WAN interface.

<!-- appendices -->

<!-- urls -->

[openwrt-ipv6-configuration-url]: https://openwrt.org/docs/guide-user/network/ipv6/configuration 'OpenWrt IPv6 Configuration'
[openwrt-uci-network-url]: https://openwrt.org/docs/guide-user/network/ucicheatsheet 'OpenWrt UCI Networking Options'
[openwrt-odhcpd-url]: https://openwrt.org/docs/techref/odhcpd 'OpenWrt odhcpd Reference'

<!-- end appendices -->
