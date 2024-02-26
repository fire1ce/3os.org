---
title: Windwos 10/11 Tweeks
description: Some tips and tricks and Tweeks for Windows 10/11 that may be helpful or even essential for you
template: comments.html
tags: [Windwos, Tweeks]
---

# Windwos 10/11 Tweeks

Some tips and tricks and Tweeks for Windows 10/11 that may be helpful or even essential for you

## Deblot Windwos 10/11 Powershell Script

Source: [Windows10Debloater Github Page][windows10debloater-url]{target=\_blank}

Run as Administrator:

```poweshell
iwr -useb https://git.io/debloat|iex
```

![Windows10Debloater][windows10debloater-img]

## Enable the Legacy Context Menu in Windows 11

To enable the context menu that appeared in Windows 10 and earlier, you can use the following PowerShell snippet.

```powershell
New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" -Value "" -Force
```

You may need to log out and log back in or restart `explorer.exe`.

```powershell
Get-Process explorer | Stop-Process
```

The context menu will now look like this:

![content-menu][content-menu-img]

## Allow ICMP (Ping) in Windows Firewall

The following commands will allow ICMP (Ping) in Windows Firewall. Use Powershell as Administrator to run the following commands.

For IPv4:

```powershell
netsh advfirewall firewall add rule name="ICMP Allow incoming V4 echo request" protocol="icmpv4:8,any" dir=in action=allow
```

For IPv6:

```powershell
netsh advfirewall firewall add rule name="ICMP Allow incoming V6 echo request" protocol="icmpv6:8,any" dir=in action=allow
```

## Activate Administrator User

Hit the Windows Key + R and type

```cmd
lusrmgr.msc
```

Edit Administrator, remove the - [x] Account is disable. ok

Right Click on Administrator and click Set Password

## Lunch "Network Connections"

Hit the Windows Key + R and type

```cmd
ncpa.cpl
```

## Add Program to Startup - Windows 7,8,10 & Servers

Hit WIN+R or from start menu search `run` and press enter.  
At run dialog enter `shell:common startup`:

![shell:common startup](../assets/images/windows/2018-10-21_09-52-21_runStartup.png 'shell:common startup')

- Create shortcut for the program you want to auto startup when Windows boots.
- Move the shortcut to the `Startup` folder that opened before.

## Reboot or Shutdown Windows From Command Line (CMD)

Reboot windows computer
This command will set a time out of 10 seconds to close the applications. After 10 seconds, windows reboot will start.

```cmd
shutdown /r /t 10
```

Force reboot

```cmd
shutdown /r /f /t 0
```

Force Shutdown

```cmd
shutdown /s /f /t 0
```

<!-- appendices -->

<!-- urls -->

[windows10debloater-url]: https://github.com/sycnex/Windows10Debloater/ 'Windows10Debloater'

<!-- images -->

[content-menu-img]: ../assets/images/1b3e614e-ecad-11ec-b07c-3f92ba17e602.jpg 'Content Menu'
[windows10debloater-img]: ../assets/images/c1cd89f2-ecaf-11ec-b054-87c1d740b554.jpg 'Windows10Debloater'

<!--css-->

<!-- end appendices -->
