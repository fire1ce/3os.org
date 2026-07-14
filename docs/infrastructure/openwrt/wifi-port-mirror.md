---
title: OpenWrt Wi-Fi Traffic Mirroring Legacy Guide
description: Legacy GL.iNet GL-AR750S Wi-Fi mirroring notes for OpenWrt 19.07 and a safe current packet-capture starting point.
template: comments.html
tags: [openwrt, wifi, traffic-capture, legacy]
---

# OpenWrt Wi-Fi Traffic Mirroring

This page originally mirrored `wlan0` and `wlan1` traffic to LAN port 2 on a GL.iNet GL-AR750S running OpenWrt 19.07.8.

!!! danger "Legacy, device-specific procedure"
    OpenWrt 19.07 is end of life and receives no security updates. The original script depended on that router's old `swconfig` switch layout and temporary interface names. Current OpenWrt devices commonly use DSA instead, so I removed the copy-and-run script rather than pretend it is portable.

Do not install OpenWrt 19.07 to reproduce this setup. Upgrade the router to a supported firmware that is listed for the exact hardware revision.

## Why the old commands no longer transfer

Starting with OpenWrt 21.02, many targets moved from `swconfig` to Linux Distributed Switch Architecture (DSA). DSA represents switch ports as network devices and uses a different bridge/VLAN model. OpenWrt also warns that some devices cannot carry their old `swconfig` configuration through that migration.

Port mirroring support still depends on the switch driver, target, and hardware. A command that works on one GL.iNet model can disconnect management access or do nothing on another model.

## Current safe starting point

If the goal is analysis rather than a permanent physical mirror, capture on the router first.

List the interfaces on that exact firmware:

```shell
ip -brief link
```

If `tcpdump` is installed, list the interfaces it can capture:

```shell
tcpdump --list-interfaces
```

Capture on the verified wireless or bridge interface, replacing the placeholder with a name from the router:

```shell
tcpdump -i <verified-interface> -nn -s 0 -w /tmp/wifi-capture.pcap
```

Stop with `Ctrl-C`, copy the capture to the analysis computer, and remove it from `/tmp` when finished. OpenWrt devices have limited storage and memory, so keep captures short.

!!! warning
    Capture only networks and devices you are authorized to inspect. Packet captures can contain credentials, session identifiers, DNS names, and private user data.

For a physical mirror port on current firmware, use documentation for the exact device and switch driver. First confirm whether it uses DSA, keep a configuration backup, and maintain a separate recovery connection while testing.

## Original tested context

- Hardware: GL.iNet GL-AR750S
- Firmware: OpenWrt 19.07.8
- Source interfaces: `wlan0` and `wlan1`
- Destination: physical LAN port 2
- Persistence: none; the old script had to run after every reboot

This context is preserved so old search results are not mistaken for current, generic OpenWrt advice.

## Sources

- [OpenWrt 19.07 end-of-life notice][openwrt-1907]
- [OpenWrt DSA networking overview][openwrt-dsa]
- [OpenWrt 19.07 to 21.02 DSA migration notes][openwrt-migration]

<!-- appendices -->

[openwrt-1907]: https://openwrt.org/releases/19.07/start
[openwrt-dsa]: https://openwrt.org/docs/guide-user/network/dsa/start
[openwrt-migration]: https://openwrt.org/docs/guide-user/network/dsa/upgrading-to-2102

<!-- end appendices -->
