---
title: Ubuntu Unattended Upgrades
description: Enable, test, monitor, and safely customize automatic Ubuntu security updates with unattended-upgrades.
template: comments.html
tags: [ubuntu, apt, security-updates, automation]
---

# Ubuntu Unattended Upgrades

Ubuntu uses `unattended-upgrades` to install security updates automatically. The package is installed by default on many Ubuntu systems, but I still verify the package, schedule, allowed sources, dry run, and logs before trusting it.

## Install or confirm the package

```shell
sudo apt update
sudo apt install unattended-upgrades
```

The two main configuration files are:

- `/etc/apt/apt.conf.d/20auto-upgrades` — whether package-list refresh and unattended upgrades run, and their interval in days.
- `/etc/apt/apt.conf.d/50unattended-upgrades` — allowed repositories, package exclusions, reboot behavior, and other policy.

## Enable daily checks

Check `/etc/apt/apt.conf.d/20auto-upgrades`. A daily Ubuntu setup contains:

```aptconf
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

A value of `1` means daily. A value of `0` disables that action.

Ubuntu's `apt-daily.timer` and `apt-daily-upgrade.timer` trigger the work with a randomized delay. Confirm the timers:

```shell
systemctl list-timers 'apt-daily*'
```

## Keep the update policy conservative

The package's Ubuntu defaults allow the release and security pockets, plus applicable Ubuntu ESM security sources. Review the active `Allowed-Origins` or `Origins-Pattern` in the file shipped by your installed release.

Do not copy a complete configuration from another Ubuntu or Debian release. In particular:

- Do not enable `-proposed` for normal automatic updates.
- Add the normal `-updates` pocket only if you deliberately want non-security updates installed automatically.
- Keep automatic reboot disabled unless the host has a tested maintenance window and recovery plan.
- Block a package only when you accept the security tradeoff and have another update process for it.

Debian and Raspberry Pi OS ship different repository origins and defaults. Use their package-provided configuration instead of pasting Ubuntu origin names.

## Dry-run and inspect

Update package metadata, then run a verbose dry run:

```shell
sudo apt update
sudo unattended-upgrade --dry-run --debug
```

The dry run reports the allowed origins and packages it would process without installing them.

Review recent logs:

```shell
sudo ls -la /var/log/unattended-upgrades/
sudo journalctl -u apt-daily-upgrade.service --since today
```

For a server fleet, unattended upgrades are one layer, not fleet management. You still need inventory, failure monitoring, maintenance windows, and a way to confirm that every host is actually current.

## Sources

- [Ubuntu Server: automatic updates][ubuntu-auto]
- [Ubuntu security updates documentation][ubuntu-security]
- [Ubuntu `unattended-upgrade(8)` manual][ubuntu-man]

<!-- appendices -->

[ubuntu-auto]: https://ubuntu.com/server/docs/how-to/software/automatic-updates/
[ubuntu-security]: https://documentation.ubuntu.com/security/security-updates/
[ubuntu-man]: https://manpages.ubuntu.com/manpages/resolute/man8/unattended-upgrade.8.html

<!-- end appendices -->
