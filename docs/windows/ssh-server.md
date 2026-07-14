---
title: Windows OpenSSH Server
description: Install and configure the built-in OpenSSH Server on Windows with PowerShell and key authentication.
template: comments.html
tags: [windows, ssh-server, powershell, openssh]
---

# Windows OpenSSH Server

Windows includes OpenSSH Server as an optional feature. This is the clean setup I use for remote PowerShell access and SSH key authentication.

The commands below apply to supported Windows 10 and 11 releases and Windows Server 2019 or later. Run PowerShell as Administrator.

## Install OpenSSH

Check the available OpenSSH features:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

Install the client and server:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Start `sshd` now and on future boots:

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

The server installation normally creates the `OpenSSH-Server-In-TCP` firewall rule. Verify it instead of creating a duplicate:

```powershell
Get-NetFirewallRule -Name OpenSSH-Server-In-TCP
```

If that rule does not exist, create the rule Microsoft documents:

```powershell
New-NetFirewallRule `
  -Name 'OpenSSH-Server-In-TCP' `
  -DisplayName 'OpenSSH Server (sshd)' `
  -Enabled True `
  -Direction Inbound `
  -Protocol TCP `
  -Action Allow `
  -LocalPort 22
```

Test from another computer:

```shell
ssh windows-user@windows-host
```

## Configure SSH keys

Create an Ed25519 key on the client if you do not already have one:

```shell
ssh-keygen -t ed25519
```

Copy only the `.pub` public key to Windows. The destination depends on the Windows account.

### Standard user

Put the public key on one line in:

```text
C:\Users\windows-user\.ssh\authorized_keys
```

The `.ssh` directory and `authorized_keys` file must belong to that user and must not be writable by unrelated users.

### Administrator account

By default, accounts in the Administrators group use this shared file:

```text
C:\ProgramData\ssh\administrators_authorized_keys
```

Set the file ACL to Administrators and SYSTEM only. The SID form works on non-English Windows installations:

```powershell
icacls.exe 'C:\ProgramData\ssh\administrators_authorized_keys' /inheritance:r /grant '*S-1-5-32-544:F' /grant 'SYSTEM:F'
```

Restart the service after changing server configuration or key-file rules:

```powershell
Restart-Service sshd
```

Keep the password login available until key authentication works in a second terminal. Then review `C:\ProgramData\ssh\sshd_config` if you want to restrict authentication further.

## Optional: use PowerShell as the default shell

Windows OpenSSH uses `cmd.exe` by default. Set Windows PowerShell as the SSH default shell with the documented registry value:

```powershell
New-ItemProperty `
  -Path 'HKLM:\SOFTWARE\OpenSSH' `
  -Name DefaultShell `
  -Value 'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe' `
  -PropertyType String `
  -Force
```

Open a new SSH connection to test it.

## Sources

- [Microsoft: get started with OpenSSH Server for Windows][ms-install]
- [Microsoft: OpenSSH key management][ms-keys]
- [Microsoft: OpenSSH Server configuration][ms-config]

<!-- appendices -->

[ms-install]: https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse
[ms-keys]: https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement
[ms-config]: https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh-server-configuration

<!-- end appendices -->
