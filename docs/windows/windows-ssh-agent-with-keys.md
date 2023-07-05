---
title: Windows SSH with ed25519 Keys
description: Enhance the security of your Windows system by configuring SSH client and SSH agent using ed25519 keys. This guide covers the installation of OpenSSH client, key generation, and secure connections for services like Git.
template: comments.html
tags: [SSH, Windows, ed25519, OpenSSH, Git, Security]
---

# Windows SSH Client with ed25519 Keys for Secure Connections

In the modern digital age, ensuring the security of your connections is critical. This guide will walk you through the steps to configure the SSH client and SSH agent on Windows using ed25519 keys, allowing for secure connections to services like Git and remote servers.

## Introduction to SSH and ed25519 Keys

SSH, or Secure Shell, is a cryptographic network protocol for secure communication over an unsecured network. It is particularly used for secure logins, file transfers, and command-line operations.

ed25519 is a public-key signature system that is renowned for high security with relatively short key lengths. This makes it faster and more efficient compared to older algorithms such as RSA.

## OpenSSH Client Installation

To utilize SSH, you need to ensure that the OpenSSH client is installed on your Windows system.

!!! note

      The above below should be performed in PowerShell with Administrator privileges.

1. **Check if OpenSSH Client is available** by running the following cmdlet:

   ```PowerShell
   Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
   ```

   If OpenSSH Client is not installed, the output will be:

   ```yml
   Name: OpenSSH.Client~~~~0.0.1.0
   State: NotPresent
   ```

   If it's not present, proceed to the next step to install it.

2. **Install the OpenSSH Client** by running the following command:

   ```PowerShell
   # Install the OpenSSH Client
   Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
   ```

   The command should return:

   ```yml
   Path:
   Online: True
   RestartNeeded: False
   ```

## Setting Up SSH Agent in Windows

The SSH Agent is a background service that stores your keys. When connecting to a remote host using SSH, the agent can automatically provide the key.

!!! note

      The above below should be performed in PowerShell with Administrator privileges.

1. **Set SSH Agent to start automatically at boot**:

   ```shell
   Set-Service -Name ssh-agent -StartupType 'Automatic'
   ```

2. **Start the SSH Agent service**:

   ```shell
   Start-Service -Name ssh-agent
   ```

3. **Test the SSH Agent Is Running**:

   ```shell
   Get-Service -Name ssh-agent
   ```

   The output should be:

   ```yml
   Status   Name               DisplayName
   ------   ----               -----------
   Running  ssh-agent          OpenSSH Authentication Agent
   ```

## Generating and Adding ed25519 SSH Keys

!!! note

      The above below should be performed in PowerShell with regular user privileges.

1. **Generate ed25519 SSH keys**:

   ```shell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   This command generates an ed25519 key pair. The default location for the keys is `C:\Users\<YourUsername>\.ssh`. The private key is named `id_ed25519` and the public key is named `id_ed25519.pub`.

2. **Adding the ed25519 SSH Key to the SSH Agent**:

   ```shell
   ssh-add $env:USERPROFILE\.ssh\id_ed25519
   ```

   If your keys are stored in a different location or have a different name, you can specify the full path to the key file as an argument to `ssh-add`. For example:

   ```shell
    ssh-add C:\path\to\your\private-key-file
   ```

## Importing Existing ed25519 SSH Keys (Optional)

If you already have an existing pair of ed25519 SSH keys that you would like to use, you can import them into your SSH Agent.

!!! note

      The above below should be performed in PowerShell with regular user privileges.

1. **Copy your existing private key to the default SSH folder**. The default folder for SSH keys is typically `C:\Users\<YourUsername>\.ssh`. Make sure the private key file you are copying is named `id_ed25519`.

2. **Add the existing ed25519 SSH Key to the SSH Agent**:

   ```shell
   ssh-add $env:USERPROFILE\.ssh\id_ed25519
   ```

   Note: If your private key file is located in a different path or has a different name, you can specify the full path to the key file as an argument to `ssh-add`. For example:

   ```shell
   ssh-add C:\path\to\your\private-key-file
   ```

3. **Copy your existing public key to the servers or services** you want to connect to. This typically involves appending the contents of your public key file to the `~/.ssh/authorized_keys` file on the server.

## Step 5: Using SSH with ed25519 Keys for Secure Connections

Now that you have your ed25519 SSH keys generated or imported, and added to the SSH Agent, you can use SSH to connect to remote servers or services like Git securely.

For example, to connect to a remote server:

```shell
ssh username@remote_host
```

Using SSH keys will also allow you to interact with Git repositories securely, which is especially helpful when dealing with private repositories or pushing code changes.

## Wrapping Up

By following this guide, you have configured the SSH client and SSH agent on your Windows system using ed25519 keys. This configuration ensures secure communication with services like Git and remote servers, safeguarding the integrity and security of your data.

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
