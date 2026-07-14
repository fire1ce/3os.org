---
title: Synology SSH Root Access
description: Safely open a root shell on Synology DSM over SSH with an administrator account and sudo.
template: comments.html
tags: [synology, ssh, dsm]
---

# Synology SSH Root Access

Synology DSM does not require direct SSH login as `root`. The supported method is to connect with a local administrator account and then open a root shell with `sudo -i`.

!!! warning "Direct root login is retired from this guide"
    An older version of this page changed the root password and enabled `PermitRootLogin`. I no longer recommend that workaround. It bypasses DSM's normal administrator flow and depends on manual changes to Synology-managed SSH configuration.

## Enable SSH in DSM

1. Sign in to DSM with an administrator account.
2. Open **Control Panel > Terminal & SNMP > Terminal**.
3. Enable **SSH service**.
4. Keep the selected port behind your firewall. Do not expose DSM SSH directly to the public internet.

## Open a root shell

Connect with a user that belongs to DSM's local `administrators` group:

```shell
ssh admin-user@nas-address
```

Then elevate with the same administrator password:

```shell
sudo -i
```

Confirm the shell before making system changes:

```shell
whoami
```

The result should be `root`.

When the work is finished, leave the root shell and then close SSH:

```shell
exit
exit
```

Disable the SSH service in DSM when you do not need it regularly.

## Sources

- [Synology: sign in with root permission through SSH/Telnet][synology-root]
- [Synology DSM: Terminal & SNMP][synology-terminal]

<!-- appendices -->

[synology-root]: https://kb.synology.com/en-in/DSM/tutorial/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet
[synology-terminal]: https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/system_terminal?version=7

<!-- end appendices -->
