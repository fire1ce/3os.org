---
description: Ubuntu & Debian Linux - snippetsm guides, examples and usage
---

# General Snippets

## Disable Firewall Ubuntu

```bash
ufw disable
```

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
