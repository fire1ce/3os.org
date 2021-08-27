---
description: Linux - Plesk how to, guides, examples, and simple usage
---

# Plesk

## Plesk on CentOS 12 bind fix

The problem was nginx was attempting to bind to port 443 before the IP was initialized.
To fix edit the /etx/sysctl.conf file and add:

```bash
net.ipv4.ip_nonlocal_bind = 1
```
