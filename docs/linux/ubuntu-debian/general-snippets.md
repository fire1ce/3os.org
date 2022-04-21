---
description: Ubuntu & Debian Linux - snippetsm guides, examples and usage
---

# General Snippets

## Disable Firewall Ubuntu

```bash
ufw disable
```

## Disable IPv6 Persistent

Disable IPv6 using GRUB
Perform the following steps with root privileges to disable IPv6 in Ubuntu 18.04/16.04 Permanently using grub method.

Edit:

```bash
/etc/default/grub
```

Modify _GRUB_CMDLINE_LINUX_ and _GRUB_CMDLINE_LINUX_DEFAULT_ to append ipv6.disable=1:

```bash
GRUB_CMDLINE_LINUX="ipv6.disable=1"
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"
```

Update the grub configuration:

```bash
update-grub
```

Reboot the server

## Remove Snap Store from Ubuntu

```bash
sudo rm -rf /var/cache/snapd/
sudo apt autoremove --purge snapd gnome-software-plugin-snap
sudo rm -rf ~/snap
```

## Remove cloud-init

```bash
apt-get purge cloud-init
rm -rf /etc/cloud/ && rm -rf /var/lib/cloud/
```

## Clear BOOT Partition on Ubuntu when 100%

```bash
dpkg --purge `dpkg --list|grep "linux-"|grep -v \`uname -r|sed 's/-generic//g'\`|cut -d" " -f3|grep "[0-9]-"|paste -sd " " -`
```
