---
title: Store an SSH Key Passphrase in macOS Keychain
description: Add an SSH private-key passphrase to macOS Keychain and configure OpenSSH to load it for a specific host.
template: comments.html
tags: [macos, ssh, keychain, openssh]
---

# Store an SSH Key Passphrase in macOS Keychain

macOS OpenSSH can store a private key's passphrase in the login Keychain and add the key to `ssh-agent` when it is used.

This does not import the private key into Keychain. The private key remains in `~/.ssh`; Keychain stores the passphrase.

## Prepare the key file

Use the standard name `id_ed25519` in this example:

```shell
mkdir -p ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
```

Never copy the private key to a remote server. The `.pub` file is the public key and is the part that belongs in `authorized_keys` on the server.

## Store the passphrase

```shell
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

Enter the key passphrase when prompted. Current macOS uses `--apple-use-keychain`; older guides may show Apple's previous `-K` option.

List identities currently loaded in the agent:

```shell
ssh-add -l
```

## Configure the host

Edit `~/.ssh/config` and scope the settings to the host that uses this key:

```sshconfig
Host server.example.com
    User remote-user
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
```

Protect the configuration file:

```shell
chmod 600 ~/.ssh/config
```

Test a normal connection:

```shell
ssh server.example.com
```

`UseKeychain yes` tells the macOS SSH client to find and store the passphrase in Keychain. `AddKeysToAgent yes` loads a key into the running agent after SSH reads it from disk.

If you use Homebrew or another non-Apple OpenSSH build, it may not understand `UseKeychain`. Use `/usr/bin/ssh` and `/usr/bin/ssh-add` for the Apple-specific integration, or keep the Apple-only option inside a host configuration used by Apple's client.

## Sources

- [Apple: OpenSSH Keychain and agent behavior][apple-openssh]
- Run `man ssh-add` and `man ssh_config` in macOS Terminal for the options installed on your Mac.

<!-- appendices -->

[apple-openssh]: https://developer.apple.com/library/archive/technotes/tn2449/index.html

<!-- end appendices -->
