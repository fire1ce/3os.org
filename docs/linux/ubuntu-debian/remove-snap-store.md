---
title: Remove Snap Store
description: How to remove snap from Ubuntu server.
template: comments.html
tags: [ubuntu]
---

# Remove Snap Store from Ubuntu

## What Is Snap?

Snap is a cross-platform packaging and deployment system developed by Canonical, the makers of Ubuntu, for the Linux platform. It's compatible with most major Linux distros, including Ubuntu, Debian, Arch Linux, Fedora, CentOS, and Manjaro.

## How To Remove Snap Store

```shell
sudo rm -rf /var/cache/snapd/
sudo apt autoremove --purge snapd gnome-software-plugin-snap
sudo rm -rf ~/snap
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
