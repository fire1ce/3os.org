---
title: Disable IPv6
description: How to permanently disable IPv6 on Ubuntu and Debian.
template: comments.html
tags: [ubuntu, debian, ipv6]
---

# Disable IPv6 on Ubuntu and Debian Linux Permanently

By default, Ubuntu/Debian IPv6 is enabled after installation. This means that the IPv6 stack is active and the host can communicate with other hosts on the same network via IPv6 protocol.

You can disable Ubuntu/Debian by editing the `/etc/default/grub` file.

```shell
nano /etc/default/grub
```

Append the following to the end of the file

```bash
GRUB_CMDLINE_LINUX="ipv6.disable=1"
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"
```

Update the grub configuration.

```shell
update-grub
```

Save and exit. `Reboot` to apply the changes.

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!-- end appendices -->
