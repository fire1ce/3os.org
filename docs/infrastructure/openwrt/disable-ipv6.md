---
title: Disable IPV6
description: How to disable IPV6 on your OpenWrt router
template: comments.html
tags: [template, markdown]
---

# OpenWrt Disable IPV6

The following steps will disable IPV6 on your OpenWrt router . All the steps are performed via the command line. You can performe them in the console of the router but the preferred way is via SSH.

Follow the following steps to disable IPV6 on your OpenWrt router:

```bash
uci set 'network.lan.ipv6=0'
uci set 'network.wan.ipv6=0'
uci set 'dhcp.lan.dhcpv6=disabled'
/etc/init.d/odhcpd disable
uci commit
```

Disable RA and DHCPv6 so no IPv6 IPs are handed out:

```bash
uci -q delete dhcp.lan.dhcpv6
uci -q delete dhcp.lan.ra
uci commit dhcp
/etc/init.d/odhcpd restart
```

You can now disable the LAN delegation:

```bash
uci set network.lan.delegate="0"
uci commit network
/etc/init.d/network restart
```

You might as well disable odhcpd:

```bash
/etc/init.d/odhcpd disable
/etc/init.d/odhcpd stop
```

And finally you can delete the IPv6 ULA Prefix:

```bash
uci -q delete network.globals.ula_prefix
uci commit network
/etc/init.d/network restart
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!-- end appendices -->
