---
title: Windows SSH Server
description: Windows SSH Server with PowerShell and RSA keys installation and configuration guide
template: comments.html
tags: [windows, ssh-server, powershell, rsa-keys]
---

# Windows SSH Server

Sometime you need to connect to a remote server via `SSH`. Usually it's the main connection to linux servers. But you can also connect to a windows server via `SSH`. At this guide we will show you how to install and configure a windows ssh server, including `SSH Keys authentication`.

## SSH Server Installation on Windows

We will be using PowerShell to install the SSH server inculding the SSH client.

Open PowerShell Terminal as Administrator.

Run the following commands to install the SSH server and client.

```Powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

After the installaton you can check the Windows SSH server and client are installed.

```Powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

The output will be something like this:

![SSH Server Installation][ssh-installed-img]

To start the Windows SSH server service

```Powershell
Start-Service sshd
```

Enable Windows SSH Server on Windows Boot

```Powershell
Set-Service -Name sshd -StartupType 'Automatic'
```

Add a Firewall rule to allow the SSH port

```Powershell
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) { Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..." New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22 } else { Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists." }
```

At this point you should be able to connect via SSH to the Windows server with your username and password.

![SSH Connection][ssh-connection-img]

## Adding SSH Keys

### Administrator User

Create the file: `administrators_authorized_keys` at the following location:

```path
C:\ProgramData\ssh\administrators_authorized_keys
```

Edit the file and add you SSH public key to the file.

Now we need to import the SSH public key to the Windows SSH server. We can do this by using the following command:

```Powershell
icacls.exe "C:\ProgramData\ssh\administrators_authorized_keys" /inheritance:r /grant "Administrators:F" /grant "SYSTEM:F"
```

Test the SSH connection to the Windows server from remote machine with the SSH Key.  
You should be able to connect to the Windows server with your SSH key

### Regular User (non-administrator)

Create a `.ssh` directory in the home directory of the user.

````path

```path
C:\Users\<username>\.ssh\
````

Create the file: `authorized_keys` at the following location:

```path
C:\Users\<username>\.ssh\authorized_keys
```

Edit the file and add you SSH public key to the file.

Test the SSH connection to the Windows server from remote machine with the SSH Key.  
You should be able to connect with non-administrator user to the Windows server with your SSH key

## `PowerShell` as Default Shell for SSH

By default the SSH client uses the Windows command prompt as the default shell.

We can change the default shell to PowerShell running the following PowerShell command:

```Powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\PowerShell.exe" -PropertyType String -Force
```

Next to you connet to the Windows SSG server it should start the PowerShell shell.

It should look something like this:

![SSH Connection with PowerShell][ssh-windows-powershell-img]

<!-- appendices -->

<!-- urls -->

<!-- images -->

[ssh-installed-img]: ../assets/images/0bafb0da-c18c-11ec-a0f0-db42d5ba669d.jpg 'SSH Server Installation'
[ssh-connection-img]: ../assets/images/f285a87e-c18d-11ec-8189-f712e9b20b30.jpg 'SSH Connection'
[ssh-windows-powershell-img]: ../assets/images/4b56c486-c190-11ec-8406-5b42a0c9b07a.jpg 'SSH Connection with PowerShell'

<!--css-->

<!-- end appendices -->
