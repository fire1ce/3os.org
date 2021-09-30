---
description: Ubuntu, Debian, Raspberry Pi unattended upgrades guide
---


# Unattended Upgrades

```bash
sudo apt install -y unattended-upgrades apt-listchanges
```

Edit the config to your preference

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

!!! example

    === "Ubuntu"

        ```config
        Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}";
        "${distro_id}:${distro_codename}-security";
        // Extended Security Maintenance; doesn't necessarily exist for
        // every release and this system may not have it installed, but if
        // available, the policy for updates is such that unattended-upgrades
        // should also install from here by default.
        "${distro_id}ESMApps:${distro_codename}-apps-security";
        "${distro_id}ESM:${distro_codename}-infra-security";
        "${distro_id}:${distro_codename}-updates";
        "${distro_id}:${distro_codename}-proposed";
        // "${distro_id}:${distro_codename}-backports";
        };

        Unattended-Upgrade::DevRelease "auto";
        Unattended-Upgrade::AutoFixInterruptedDpkg "true";
        Unattended-Upgrade::MinimalSteps "true";
        Unattended-Upgrade::InstallOnShutdown "false";
        //Unattended-Upgrade::Mail "";
        //Unattended-Upgrade::MailReport "on-change";
        Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
        Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
        Unattended-Upgrade::Remove-Unused-Dependencies "true";
        Unattended-Upgrade::Automatic-Reboot "true";
        Unattended-Upgrade::Automatic-Reboot-WithUsers "true";
        Unattended-Upgrade::Automatic-Reboot-Time "06:00";
        //Acquire::http::Dl-Limit "70";
        // Unattended-Upgrade::SyslogEnable "false";
        // Unattended-Upgrade::SyslogFacility "daemon";
        // Unattended-Upgrade::OnlyOnACPower "true";
        // Unattended-Upgrade::Skip-Updates-On-Metered-Connections "true";
        // Unattended-Upgrade::Verbose "false";
        // Unattended-Upgrade::Debug "false";
        // Unattended-Upgrade::Allow-downgrade "false";
        ```

    === "Debian/RaspberyOS"

        ```config
        Unattended-Upgrade::Origins-Pattern {
        // Codename based matching:
        // This will follow the migration of a release through different
        // archives (e.g. from testing to stable and later oldstable).
        // Software will be the latest available for the named release,
        // but the Debian release itself will not be automatically upgraded.
        "origin=Debian,codename=${distro_codename}-updates";
        // "origin=Debian,codename=${distro_codename}-proposed-updates";
        "origin=Debian,codename=${distro_codename},label=Debian";
        "origin=Debian,codename=${distro_codename},label=Debian-Security";

        // Archive or Suite based matching:
        // Note that this will silently match a different release after
        // migration to the specified archive (e.g. testing becomes the
        // new stable).
        // "o=Debian,a=stable";
        // "o=Debian,a=stable-updates";
        // "o=Debian,a=proposed-updates";
        // "o=Debian Backports,a=${distro_codename}-backports,l=Debian Backports";
        };

        Unattended-Upgrade::DevRelease "auto";
        Unattended-Upgrade::AutoFixInterruptedDpkg "true";
        Unattended-Upgrade::MinimalSteps "true";
        Unattended-Upgrade::InstallOnShutdown "false";
        //Unattended-Upgrade::Mail "";
        //Unattended-Upgrade::MailReport "on-change";
        Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
        Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
        Unattended-Upgrade::Remove-Unused-Dependencies "true";
        Unattended-Upgrade::Automatic-Reboot "true";
        Unattended-Upgrade::Automatic-Reboot-WithUsers "true";
        Unattended-Upgrade::Automatic-Reboot-Time "06:00";
        // Acquire::http::Dl-Limit "70";
        // Unattended-Upgrade::SyslogEnable "false";
        // Unattended-Upgrade::SyslogFacility "daemon";
        // Unattended-Upgrade::OnlyOnACPower "true";
        // Unattended-Upgrade::Skip-Updates-On-Metered-Connections "true";
        // Unattended-Upgrade::Verbose "false";
        // Unattended-Upgrade::Debug "false";
        // Unattended-Upgrade::Allow-downgrade "false";
        ```

Automatic call via /etc/apt/apt.conf.d/20auto-upgrades

```bash
echo unattended-upgrades unattended-upgrades/enable_auto_updates boolean true | sudo debconf-set-selections
sudo dpkg-reconfigure -f noninteractive unattended-upgrades
```

Check the /etc/apt/apt.conf.d/20auto-upgrades for those 2 lines:

```bash
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

Manual Run:

```bash
sudo unattended-upgrade -d
```

To enable unattended-upgrade use the following command:

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```
