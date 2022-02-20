# OpenWrt Tips and Tricks

## Disable ipv6

```bash
uci set 'network.lan.ipv6=0'
uci set 'network.wan.ipv6=0'
uci set 'dhcp.lan.dhcpv6=disabled'
/etc/init.d/odhcpd disable
uci commit
```

and then disable RA and DHCPv6 so no IPv6 IPs are handed out:

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