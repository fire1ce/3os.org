---
description: Proxmox Tips and Tricks
---

# Proxmox Tips and Tricks

## Disable IPV6 Support

Edit the /etc/sysctl.conf file
Append the following to the end of the file

```bash
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
```
