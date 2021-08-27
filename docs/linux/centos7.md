---
description: CentOS 7 Guides, Examples and Usage
---

# CentOS 7

## Installing Network Tools

```bash
yum install net-tools -y
```

## Stop and Disable Firewall on Centos 7

```bash
systemctl stop firewalld
systemctl disable firewalld
```

## Change Default Port for SSH with SElinux Enabled

you will need semanage, find what package contains it:

```bash
yum whatprovides /usr/sbin/semanage
```

Usually it's _policycoreutils-python_

```bash
yum install policycoreutils-python
```

Add new allowed port for SSH for SElinux

```bash
semanage port -a -t ftp_port_t -p tcp <YOUR PORT>
```

## Disable SELinux on CentOS 7

change **SELINUX=enforcing** to **SELINUX=disabled**

```bash
sudo nano /etc/selinux/config
```

reboot.

Check status

```bash
sestatus
```

## Enabling Automatic Updates In Centos 7 & rhel 7

### Install yum-cron

The package that allows us to do automatic updates via yum is yum-cron, to do this just open a terminal as root and run the command:

```bash
yum -y install yum-cron
```

This will install the yum-cron package, now it’s time to configure it, the default configuration file it’s /etc/yum/yum-cron.conf.

### Configure yum-cron for auto-update

As you can see the default it’s to upgrade all your packages, the same you’d obtain with the command yum upgrade, but there are also other options and now you can decide to just do security upgrade or even just the most critical security, this add a lot of flexibility and options.

```config
#  What kind of update to use:
# default                            = yum upgrade
# security                           = yum --security upgrade
# security-severity:Critical         = yum --sec-severity=Critical upgrade
# minimal                            = yum --bugfix upgrade-minimal
# minimal-security                   = yum --security upgrade-minimal
# minimal-security-severity:Critical =  --sec-severity=Critical upgrade-minimal
update_cmd = default

# Whether a message should be emitted when updates are available,
# were downloaded, or applied.
update_messages = yes

# Whether updates should be downloaded when they are available.
download_updates = yes

# Whether updates should be applied when they are available.  Note
# that download_updates must also be yes for the update to be applied.
apply_updates = no

# Maximum amount of time to randomly sleep, in minutes.  The program
# will sleep for a random amount of time between 0 and random_sleep
# minutes before running.  This is useful for e.g. staggering the
# times that multiple systems will access update servers.  If
# random_sleep is 0 or negative, the program will run immediately.
# 6*60 = 360
random_sleep = 360
```

### Yum-Cron Service: Start/Stop/Status/Enable on Boot

Follow [Service Control](#service_control) for more details. Use service `yum-cron.service`  
For example:

```bash
systemctl enable yum-cron.service
```

## Disable IPv6

Append below lines in /etc/sysctl.conf:

```bash
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

To make the settings affective, execute :

```bash
sysctl -p
```

## Fix NFS mount on Boot - Centos 7

Append text to the end of /usr/lib/systemd/system/nfs-idmap.service

```bash
[Install]
WantedBy=multi-user.target
```

Append text to the end of /usr/lib/systemd/system/nfs-lock.service

```bash
[Install]
WantedBy=nfs.target
```

Enable related services

```bash
systemctl enable nfs-idmapd.service
systemctl enable rpc-statd.service
systemctl enable rpcbind.socket
```

Reboot the server

## Set TimeZone

```bash
timedatectl set-timezone Asia/Jerusalem
```

## Remove Old Kernels

If your /boot partition is getting filled, you may wish to automatically remove old kernels. I find the best way to do this is to install the yum utilities package and then use a command to delete all but 2 kernels (just in case there is a problem with the latest one).

```bash
sudo yum install yum-utils -y
sudo package-cleanup --oldkernels --count=2
```

### Configure yum to auto-remove old kernels

Edit /etc/yum.conf
Set the limit to desired value

```bash
installonly_limit=2
```
