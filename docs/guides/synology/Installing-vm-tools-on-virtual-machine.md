---
description: How to installing VM Tools on Virtual Machine at DSM synology nas
---

# Installing VM Tools on Virtual Machine

On Debian:

```bash
sudo add-apt-repository universe
sudo apt-get install qemu-guest-agent
```

On CentOS 7:

```bash
yum install -y qemu-guest-agent
```

On CentOS 8:

```bash
dnf install -y qemu-guest-agent
```
