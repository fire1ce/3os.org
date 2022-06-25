---
title: CLI Commands
description: Collection of CLI commands for the Ubiquiti Unifi Dream Machine or Dream Machine Pro.
template: comments.html
tags: [udm, ubiquiti, unifi]
---

# UDM CLI Commands List

Collection of CLI commands for the Ubiquiti Unifi Dream Machine or Dream Machine Pro.

## Common UDM Commands

Open shell to unifi podman container (udm pro)

```shell
unifi-os shell
```

Show Sensors information including: UDM temperature, fan speed, and voltage.

```shell
sensors
```

Show ARP Table

```shell
arp -a
```

Display All Listening Ports on the UDM Device

```shell
netstat -plant
```

## UDM Commands List

Collection of commands for your Unifi Dream Machine or Dream Machine Pro.

| Description                                                       | UDM/UDM-P SSH Command                                  |
| ----------------------------------------------------------------- | ------------------------------------------------------ |
| show DHCP leases (to NSname)                                      | cat /mnt/data/udapi-config/dnsmasq.lease               |
| show version                                                      | info                                                   |
| show system hardware and installed software                       | ubnt-device-info summary                               |
| show cpu tempeture                                                | ubnt-systool cputemp                                   |
| show fan speed                                                    | ubnt-fan-speed                                         |
| show uptime                                                       | uptime                                                 |
| show ip route                                                     | netstat -rt -n                                         |
| show ppp summery                                                  | pppstats                                               |
| show current user                                                 | whoami                                                 |
| show log                                                          | cat /var/log/messages                                  |
| show interface summary                                            | ifstat                                                 |
| show interfaces                                                   | ifconfig                                               |
| show other Ubiquiti devices on local LAN segment (ubnt-discovery) | ubnt-tools ubnt-discover                               |
| show config (wireless)                                            | cat /mnt/data/udapi-config/unifi                       |
| packet capture                                                    | tcpdump                                                |
| shutdown                                                          | poweroff                                               |
| reload                                                            | reboot                                                 |
| show ipsec sa                                                     | ipsec statusall                                        |
| factory reset                                                     | factory-reset.sh                                       |
| show system burnt in MAC address                                  | ubnt-tools hwaddr                                      |
| show unifi server logs                                            | cat /mnt/data/unifi-os/unifi/logs/server.log           |
| show unifi server setttings                                       | cat /mnt/data/unifi-os/unifi-core/config/settings.yaml |
| show unifi server http logs                                       | cat /mnt/data/unifi-os/unifi-core/logs/http.log        |
| show unifi server http logs (errors)                              | cat /mnt/data/unifi-os/unifi-core/logs/errors.log      |
| show unifi server discovery log                                   | cat /mnt/data/unifi-os/unifi-core/logs/discovery.log   |
| show unifi system logs                                            | cat /mnt/data/unifi-os/unifi-core/logs/system.log      |
| Restarts the UnifiOS Web interface                                | /etc/init.d/S95unifios restart                         |
| show ip arp (show arp) and IPv6 neighbours                        | arp -a _OR_ ip neigh                                   |
| show tunnel interfaces                                            | ip tunnel show                                         |
| Show Sensors information                                          | sensors                                                |
| Open shell to unifi podman container                              | unifi-os shell                                         |
| tcpdump                                                           | tcpdump <interface> -w <filename.pcap>                 |

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
