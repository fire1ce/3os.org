---
description: Linux - Sophos Firewall how to, guides, examples, and simple usage
---

# Sophos Firewall

## Rebuild Sophos when disk full

```bash
/etc/init.d/postgresql92 rebuild
```

On older versions:

```bash
/var/mdw/scripts/smtp stop
dropdb -U postgres smtp
createdb -U postgres smtp
/var/mdw/scripts/smtp start
```

## Clear allowed networks on Sophos

Login to the Sophos

```bash
Type ‘cc’
In cc, you’ll be in MAIN, if not, type ‘MAIN’
Type ‘webadmin'
Type ‘allowed_networks@'
=['REF_NetworkAny']
```
