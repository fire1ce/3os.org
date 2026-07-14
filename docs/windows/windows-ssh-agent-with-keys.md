---
title: Windows OpenSSH with Ed25519 Keys
description: Install the Windows OpenSSH client, start ssh-agent, and create or import an Ed25519 key for Git and remote servers.
template: comments.html
tags: [SSH, Windows, ed25519, OpenSSH, Git, Security]
---

# Windows OpenSSH with Ed25519 Keys

This guide configures the built-in Windows OpenSSH client and `ssh-agent` service with an Ed25519 key.

## Check or Install OpenSSH Client

Open PowerShell as Administrator:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

If `OpenSSH.Client~~~~0.0.1.0` is `NotPresent`, install it:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Confirm the client is available:

```powershell
ssh -V
```

## Start the SSH Agent

Still in the Administrator PowerShell window, set the service to start automatically and start it now:

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

The final command should show the service as `Running`.

## Generate an Ed25519 Key

Open a normal PowerShell window as your regular user:

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Accept the default path unless you need a separate key name. Use a strong passphrase.

The default files are:

- Private key: `$env:USERPROFILE\.ssh\id_ed25519`
- Public key: `$env:USERPROFILE\.ssh\id_ed25519.pub`

Never share or upload the private key.

## Add the Key to ssh-agent

```powershell
ssh-add $env:USERPROFILE\.ssh\id_ed25519
ssh-add -l
```

The second command lists the keys currently held by the agent.

If the private key has another name, pass its complete path to `ssh-add`.

## Copy the Public Key

Display the public key:

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

Add that public key to the target Git service or to the remote account's `authorized_keys` file. Follow the target service's instructions because the exact location and access rules differ.

## Test the Connection

```powershell
ssh username@server.example.com
```

On the first connection, compare the displayed host-key fingerprint with a trusted value before accepting it.

## Import an Existing Key

Copy the existing private key into `$env:USERPROFILE\.ssh`, keep it private, then add it:

```powershell
ssh-add $env:USERPROFILE\.ssh\existing_key
```

Do not overwrite an existing key pair unless you have a verified backup.

## Sources

- [Microsoft: Get started with OpenSSH for Windows](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)
- [Microsoft: Key-based authentication in OpenSSH for Windows](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement)
