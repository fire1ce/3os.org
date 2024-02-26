---
title: Disable IPv6 via Grub
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

add `ipv6.disable=1` to the end of `GRUB_CMDLINE_LINUX_DEFAULT` and `GRUB_CMDLINE_LINUX` line. Don't change the other values at those lines.

```bash
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"
GRUB_CMDLINE_LINUX="ipv6.disable=1"
```

The config should look like this:

![Grub Configuration][grub-configuration-img]

Update the grub configuration.

```shell
update-grub
```

Save and exit. `Reboot` to apply the changes.

<!-- appendices -->

<!-- urls -->

<!-- images -->

[grub-configuration-img]: ../../assets/images/f1f18772-f881-11ec-9918-afad89ede03c.jpg 'Grub Configuration'

<!-- end appendices -->
