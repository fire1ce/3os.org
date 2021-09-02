---
description: Ubuntu, Debian, Raspberry Pi unattended upgrades guide
---


# Unattended Upgrades

```bash
apt install -y unattended-upgrades apt-listchanges
```

Edit the config to your preference

```bash
nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Example values in Debian:

```config
        "origin=Debian,codename=${distro_codename}-updates";
        "origin=Debian,codename=${distro_codename}-proposed-updates";
        "origin=Debian,codename=${distro_codename},label=Debian";
        "origin=Debian,codename=${distro_codename},label=Debian-Security";
        "origin=Debian,codename=${distro_codename}-security,label=Debian-Security";

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-WithUsers "true";
Unattended-Upgrade::Automatic-Reboot-Time "05:00";
```

Automatic call via /etc/apt/apt.conf.d/20auto-upgrades

```bash
echo unattended-upgrades unattended-upgrades/enable_auto_updates boolean true | debconf-set-selections
dpkg-reconfigure -f noninteractive unattended-upgrades
```

Check the /etc/apt/apt.conf.d/20auto-upgrades for those 2 lines:

```bash
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

Manual Run:

```bash
unattended-upgrade -d
```

To enable unattended-upgrade use the following command:

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```
