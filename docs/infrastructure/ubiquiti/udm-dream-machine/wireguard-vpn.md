---
title: Wireguard VPN
description: Wireguard VPN installation and configuration guide for Ubiquiti UniFi UDM, UDM PRO, UDR and UXG
template: comments.html
tags: [udm, ubiquiti, unifi, wireguard]
---

# Wireguard VPN

WireGuard® is an extremely simple yet fast and modern VPN that utilizes state-of-the-art cryptography. It aims to be faster, simpler, leaner, and more useful than IPsec, while avoiding the massive headache. It intends to be considerably more performant than OpenVPN. WireGuard is designed as a general purpose VPN for running on embedded interfaces and super computers alike, fit for many different circumstances. Initially released for the Linux kernel, it is now cross-platform (Windows, macOS, BSD, iOS, Android) and widely deployable. It is currently under heavy development, but already it might be regarded as the most secure, easiest to use, and simplest VPN solution in the industry.

Github Repository: [wireguard-vyatta-ubnt][wireguard-vyatta-ubnt-url]{target="\_blank"}

{{ external_markdown('https://raw.githubusercontent.com/wiki/WireGuard/wireguard-vyatta-ubnt/UnifiOS-(UDM%2C-UDR%2C-UXG).md', '') }}

## The built-in gateway DNS does not reply to requests from the WireGuard tunnel

- The built-in dnsmasq on UnifiOS is configured to only listen for requests from specific interfaces. The wireguard interface name (e.g.: wg0) needs to be added to the dnsmasq config so it can respond to requests from the tunnel. You can run the following to add wg0 to the dnsmasq interface list:

```shell
echo "interface=wg0" > /run/dnsmasq.conf.d/custom_listen.conf
killall -9 dnsmasq
```

- You can also those commands to PostUp in your wireguard config's Interface section to automatically run them when the tunnel comes up, e.g.:

```shell
 PostUp = echo "interface=%i" > /run/dnsmasq.conf.d/custom_listen.conf; killall -9 dnsmasq
 PreDown = rm -f /run/dnsmasq.conf.d/custom_listen.conf; killall -9 dnsmasq
```

<!-- appendices -->

<!-- urls -->

[wireguard-vyatta-ubnt-url]: https://github.com/WireGuard/wireguard-vyatta-ubnt 'wireguard-vyatta-ubnt Github Repository'

<!-- images -->

<!--css-->

<!-- end appendices -->
