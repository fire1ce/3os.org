---
title: SSH Passphrase to Keychain
description: Import ed25519/RSA SSH Keys passphrase to macOS Keychain
template: comments.html
tags: [template, markdown]
---

# Import ed25519/RSA Keys Passphrase to macOS Keychain

First, you need to add the keys to the `keychain` with the following steps:

Copy your `ed25519, ed25519.pub` / `id_rsa, id_rsa.pub` to `~/.ssh/` folder

!!! Example "Store the key in the MacOS Keychain"

    === "ed25519 Key"

        ```shell
        ssh-add --apple-use-keychain ~/.ssh/ed25519
        ```

    === "RSA Key"

        ```shell
        ssh-add --apple-use-keychain ~/.ssh/id_rsa
        ```

Enter your key passphrase. You won't be asked for it again.

## Configure SSH to always use the keychain

If you haven't already, create an `~/.ssh/config` file. In other words, in the .ssh directory in your home dir, make a file called config.

At `~/.ssh/config` file, add the following lines at the top of the config:

!!! Example "Store the key in the MacOS Keychain"

    === "For ed25519 Key"

        ```shell
        Host *
          UseKeychain yes
          AddKeysToAgent yes
          IdentityFile ~/.ssh/id_ed25519
        ```

    === "For RSA Key"

        ```shell
        Host *
          UseKeychain yes
          AddKeysToAgent yes
          IdentityFile ~/.ssh/id_rsa
        ```

The UseKeychain yes is the key part, which tells SSH to look in your macOS keychain for the key passphrase.

That's it! Next time you load any ssh connection, it will try the private keys you've specified, and it will look for their passphrase in the macOS keychain. No passphrase typing required.
