---
title: Synology DSM Ports 80 and 443
description: Supported options for DSM web ports, reverse proxy rules, and the legacy workaround that edited Synology nginx templates.
template: comments.html
tags: [synology, dsm, ports, reverse-proxy, legacy]
---

# Synology DSM Ports 80 and 443

Changing DSM's login ports does not guarantee that the NAS stops listening on TCP 80 and 443. Synology packages and the built-in web stack can also use those ports.

!!! warning "Legacy workaround retired"
    The old version of this page edited Synology's internal nginx templates with `sed`, restarted nginx, and repeated the change with a boot task. I removed those commands. They were not a supported DSM interface, could be overwritten by updates, and could break DSM or installed packages.

There is no safe one-line command that can promise to “free” both ports on every DSM 7 system. First find the service that owns them, then use DSM's supported controls.

## Check the actual listener

Enable SSH temporarily, connect with an administrator account, and open a root shell with `sudo -i`. Then inspect the listeners:

```shell
ss -lntp | grep -E ':(80|443)[[:space:]]'
```

Treat the output as diagnostic information. Do not edit generated nginx files directly.

## Supported options

### Change the DSM login ports

In DSM 7, open **Control Panel > Login Portal > DSM** and set the HTTP and HTTPS ports used for DSM login. Reconnect with the new port after saving.

This changes DSM access; it does not reassign ports used by every package.

### Use DSM Reverse Proxy

If the goal is to publish another service through one hostname, use **Control Panel > Login Portal > Advanced > Reverse Proxy**. Create a rule with the required source protocol, hostname, and port, then point it to the internal service.

This keeps the web entry point inside DSM's supported configuration and avoids patching generated files.

### Move or disable the package that owns the port

Web Station and other packages can claim standard web ports. Review the package configuration and stop or reconfigure the specific package only if you no longer need it.

If another reverse proxy must own host ports 80 and 443, the clean design is usually to run it on another host or IP address. That avoids fighting DSM's managed web stack after every update.

## Sources

- [Synology DSM: Login Portal and Reverse Proxy][synology-proxy]
- [Synology: configure external DSM addresses and ports][synology-external]

<!-- appendices -->

[synology-proxy]: https://kb.synology.com/en-us/DSM/help/DSM/AdminCenter/system_login_portal_advanced?version=7
[synology-external]: https://kb.synology.com/en-us/DSM/tutorial/Synology_storage_system_external_access

<!-- end appendices -->
