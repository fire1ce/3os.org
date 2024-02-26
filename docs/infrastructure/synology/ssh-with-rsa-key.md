---
title: SSH With RSA Keys
description: Synology DSM - Allow presistent SSH With RSA Keys. How to configure Synology to use RSA keys for SSH access.
template: comments.html
tags: [synology, dsm, ssh, rsa-keys]
---

# Synology DSM - Allow Presistent SSH With RSA Keys

As a power user, i would like to be able to connect to my Synology DSM vis SSH. The issue is that Synology DSM won't allow you to use SSH with RSA keys out of the box and only allows you to use SSH with password.
In order to allow the use of SSH keys we need to perform the following steps:

## Requirements

I will assume you have already have SSH keys generated, SSH server configured on Synology DSM

- Generated SSH keys
- SSH server configured on Synology DSM

## Allow `User Home` at DSM Level

`User Home` enable to create a personal home folder for each user, except for guest. This will allow as to create user's `.ssh` folder and `authorized_keys` file.

- Log into Synology web UI as an administrator user
- Control Panel -> User & Groups -> Advanced, scroll down to “User Home”
- Check “Enable user home service”, select an appropriate Location (i.e. volume1)
- Click “Apply”

![Synology Control Panel Image][synology-control-panel-image]

## Configure `.ssh` Folder and `authorized_keys` File

Log in to the NAS through SSH with the user you want to add key authorization for.
The following example shows how to add will work for the active user in the SSH session.

First change the permissins of the `users home` folder to 700

```shell
sudo chmod 700 ~
```

Create the `.ssh` folder and set permissions to 700

```shell
mkdir ~/.ssh && chmod 700 ~/.ssh
```

Create the `authorized_keys` file and set permissions to 644

```shell
touch ~/.ssh/authorized_keys && chmod 644 ~/.ssh/authorized_keys
```

!!! success ""

    Synology's DSM SSH server supports RSA and ed25519 keys.

No you need to copy you public keys to `authorized_keys` file, you can do it manually or use the following command:

```shell
echo <public-key-sting> >> ~/.ssh/authorized_keys
```

You can do it automatically by using the following command from a client with the ssh key you want to add:

```shell
ssh-copy-id -i ~/.ssh/id_rsa <user@ip-address>
```

At this point you should be able to connect to Synology DSM via SSH using the key you just added.

<!-- appendices -->

<!-- urls -->

[3os-url]: https://3os.org/ '3os Homepage'

<!-- images -->

[synology-control-panel-image]: ../../assets/images/fc2ca070-ba36-11ec-a838-2bfdfa0e9d3f.jpg 'Synology Control Panel'

<!--css-->
<style>
  .md-typeset img {
    display: inline;
</style>

<!-- end appendices -->
