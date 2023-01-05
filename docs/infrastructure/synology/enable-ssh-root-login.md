---
title: Enable SSH Root Login
description: Enable SSH Root Login on Synology NAS directly from the terminal. No need to log in as a user and then enter "sudo su root".
template: comments.html
tags: [synology, ssh]
---

# Enable Synology SSH Root Login

Synology DSM allows Linux experts to use the SSH terminal. By default you need to log in as a user and then enter "sudo su root" can be inconvenient, but there is the option of logging in as root directly.

## Section

First, the DSM Control Panel is called up, Extended mode must be activated so that the required icon Terminal & SNMP appears.
Under Terminal & SNMP the SSH-Service just can enable.

Connect to Synology dns with your admin user and password. Change user to root with the command "sudo su" and enter the Admins's password.
Set the `root` user password with the command below:

```shell
sudo synouser -setpw root 'new_root_password'
```

Edit the file `/etc/ssh/sshd_config` and change the line `PermitRootLogin no` to `PermitRootLogin yes`.

```shell
sudo vi /etc/ssh/sshd_config
```

Reboot the Synology NAS to apply the changes.

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
