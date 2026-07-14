---
title: Disable IPv6 on Ubuntu and Debian
description: Disable IPv6 at runtime with sysctl or completely at boot with the Linux kernel ipv6.disable parameter.
template: comments.html
tags: [ubuntu, debian, ipv6, linux]
---

# Disable IPv6 on Ubuntu and Debian

Do not disable IPv6 as a generic troubleshooting step. Applications can prefer IPv6, local services may bind to `::1`, and disabling it can hide the real DNS or routing problem.

When a system genuinely must be IPv4-only, choose one of the two methods below.

## Method 1: disable IPv6 on interfaces with sysctl

Test the change at runtime first:

```shell
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
```

The `all` setting affects existing interfaces. The `default` setting is used when new interfaces are created.

Verify the result:

```shell
sysctl net.ipv6.conf.all.disable_ipv6
ip -6 address show
```

If the system works correctly, make it persistent in a dedicated drop-in:

```shell
sudo editor /etc/sysctl.d/90-disable-ipv6.conf
```

Add:

```ini
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

Load the persistent configuration:

```shell
sudo sysctl --system
```

To restore IPv6, remove the drop-in and set both values back to `0`, or reboot after removing it.

## Method 2: disable the kernel IPv6 stack at boot

Use this stronger method only when the host must not create IPv6 sockets or addresses at all.

Edit `/etc/default/grub` and append `ipv6.disable=1` inside the existing `GRUB_CMDLINE_LINUX` value. Preserve every parameter already there. For example:

```ini
GRUB_CMDLINE_LINUX="ipv6.disable=1"
```

Rebuild the GRUB configuration and reboot:

```shell
sudo update-grub
sudo reboot
```

After reboot:

```shell
cat /proc/cmdline
ip -6 address show
```

To undo it, remove only `ipv6.disable=1`, run `sudo update-grub`, and reboot again.

The GRUB method is not appropriate for systems that do not boot with GRUB. Use that system's documented bootloader configuration instead.

## Sources

- [Linux kernel IPv6 module parameters][kernel-ipv6]
- [Linux kernel IPv6 sysctl reference][kernel-sysctl]

<!-- appendices -->

[kernel-ipv6]: https://www.kernel.org/doc/html/latest/networking/ipv6.html
[kernel-sysctl]: https://www.kernel.org/doc/html/latest/networking/ip-sysctl.html#proc-sys-net-ipv6-variables

<!-- end appendices -->
