---
description: Windows Servers Tips & Guides, examples and simple usage and useful software
---

# Windows Servers

## Basic Setup

At Server Manager click `Configure this local server`

* Computer name - rename the server's name
* Remote Desktop - allow RDP
* Ethernet instance - disable IPV6
* Feedback & Diagnostics - set `Feedback frequency` to `Never`
* IE Enhanced Security Configuration - Off
* Time zone - set the current timezone, At `Internet Time` tab chanche `time.windwos.com` to `time.nist.gov`

Open gpedit.msc with Run

* Local Computer Policy -> Administrative Templates -> System -> Display Shutdown Even Tracker - Disable
* Local Computer Policy -> Windows Settings -> Security Settings -> Local Policies -> Security Options ->Interactive logon: Do not require CTRL+ALT+DEL - Enable

## Convert Evaluation Copy to Full Version

When using the Evaluation version of Windows Server, the desktop displays the current build and the time until the end of the grace period (Windows License valid for 180 days).

### Windows Server 2022

Run from Powershell:

Windows Server 2022 Standard

```powershell
dism /online /set-edition:serverstandard /productkey:VDYBN-27WPP-V4HQT-9VMD4-VMK7H /accepteula
```

Windows Server 2022 Datacenter:

```powershell
dism /online /set-edition:serverdatacenter /productkey:WX4NM-KYWYW-QJJR4-XV3QB-6VM33 /accepteula
```

### Windows Server 2019

Run from Powershell:

Windows Server 2019 Standard

```powershell
dism /online /set-edition:ServerStandard /productkey:N69G4-B89J2-4G8F4-WWYCC-J464C /accepteula
```

Windows Server 2019 Datacenter:

```powershell
dism /online /set-edition:ServerDatacenter /productkey:WMDGN-G9PQG-XVVXX-R3X43-63DFG /accepteula
```

