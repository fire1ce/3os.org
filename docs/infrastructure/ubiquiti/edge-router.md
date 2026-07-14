---
title: Ubiquiti EdgeRouter Commands and Maintenance
description: Verified EdgeOS commands for configuration changes, backups, users, root access, and model-specific hardware offloading.
template: comments.html
tags: [ubiquiti, edgerouter, edgeos, networking]
---

# Ubiquiti EdgeRouter Commands and Maintenance

This page used to mix old DNS scripts, OpenVPN recipes, guest Wi-Fi configuration, speed-test installers, and commands for several EdgeRouter hardware families. I have narrowed it to operations that Ubiquiti still documents for current EdgeOS firmware.

!!! warning
    EdgeRouter commands are model- and firmware-sensitive. Back up the router first, keep a local recovery path, and do not paste a complete configuration from another model.

## Configuration workflow

EdgeOS keeps a working configuration, an active configuration, and the saved boot configuration. A normal CLI change looks like this:

```text
configure
set <configuration-path> <value>
compare
commit
save
exit
```

- `compare` shows the pending difference.
- `commit` applies the working configuration.
- `save` writes the active configuration to `/config/config.boot` for the next boot.

A committed but unsaved change is lost after reboot.

Show the current configuration in reusable `set` command format:

```text
show configuration commands | no-more
```

## Back up before changing the router

In configuration mode, save a named local copy:

```text
configure
save backupconfig.boot
```

Confirm it exists:

```text
ls -l /config/
```

The EdgeOS Web UI can also download a device backup from **System > Configuration Management & Device Maintenance > Back Up Config**. Keep the backup somewhere off the router.

To inspect a local backup without applying it:

```text
configure
load backupconfig.boot
compare
```

Do not run `commit` unless the comparison is exactly what you intend to restore.

## Replace the default user

If the router still uses the default `ubnt` account, create and test a separate administrator first:

```text
configure
set system login user router-admin authentication plaintext-password <strong-password>
set system login user router-admin level admin
commit
save
exit
```

Open a new session and confirm the new account works. Only then delete the default account:

```text
configure
delete system login user ubnt
compare
commit
save
exit
```

Use SSH public-key authentication where possible, but keep a tested recovery method before disabling password authentication.

## Open a root shell

Ubiquiti leaves the root password undefined by default as a security precaution. Sign in with an administrator and elevate only when a Linux-level task requires it:

```shell
sudo su
```

Return to the normal EdgeOS shell:

```shell
exit
```

Direct root SSH login is not needed for normal administration.

## Hardware offloading

Offload commands differ between MediaTek and Cavium EdgeRouter models. Do not apply both command sets.

### MediaTek models

This family includes ER-X, ER-10X, ER-X-SFP, and EP-R6:

```text
configure
set system offload hwnat enable
set system offload ipsec enable
commit
save
```

### Cavium models

This family includes ERLite-3, ERPoE-5, ER-8, ERPro-8, EP-R8, ER-4, ER-6P, ER-12, ER-12P, and ER-8-XG. Enable only the features used by the router. A common forwarding baseline is:

```text
configure
set system offload ipv4 forwarding enable
set system offload ipv6 forwarding enable
commit
save
```

IPsec offload is a separate setting and requires a reboot to become active or inactive. Ubiquiti also documents that not every QoS, NetFlow, bridge, or encryption function can be offloaded.

Verify actual state in operational mode:

```text
show ubnt offload
```

## Sources

- [Ubiquiti: archive and manage EdgeRouter configurations][er-config]
- [Ubiquiti: EdgeRouter user accounts][er-users]
- [Ubiquiti: EdgeRouter root account][er-root]
- [Ubiquiti: EdgeRouter hardware offloading][er-offload]

<!-- appendices -->

[er-config]: https://help.uisp.com/hc/en-us/articles/22591188157079-EdgeRouter-Archiving-and-Managing-the-Configuration-Files
[er-users]: https://help.uisp.com/hc/en-us/articles/22591215486103-EdgeRouter-User-Accounts
[er-root]: https://help.uisp.com/hc/en-us/articles/22591204009367-EdgeRouter-Root-User-Account
[er-offload]: https://help.uisp.com/hc/en-us/articles/22591077433879-EdgeRouter-Hardware-Offloading

<!-- end appendices -->
