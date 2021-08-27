---
description: CentOS 8 Guides, Examples and Usage
---

# CentOS 8

## Set Up Automatic Updates for CentOS 8

DNF-automatic RPM package. The package provides a DNF component that starts automatically.

```bash
dnf install -y dnf-automatic
```

Configuring the dnf-automatic updates.

```bash
nano /etc/dnf/automatic.conf
```

Configuration this setting:

```config
apply_updates = yes
```

Finally, you can now run dnf-automatic, execute the following command to schedule DNF automatic updates for your CentOS 8

```bash
systemctl enable --now dnf-automatic.timer
```

## Stop and Disable Firewall on CentOS 8

```bash
systemctl stop firewalld
systemctl disable firewalld
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

## Disable IPv6 on CentOS 8

Append below lines in /etc/sysctl.conf:

```bash
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

To make the settings affective, execute :

```bash
sysctl -p
```

## Python 2/3 Installation on CentOS 8

Python 2

```bash
dnf install python2
```

Python 3

```bash
dnf install python3
```

Set Default Python Version

Python 2

```bash
alternatives --set python /usr/bin/python2
```

Python 3

```bash
alternatives --set python /usr/bin/python3
```

Remove the unversioned python

```bash
alternatives --auto python
```

## Docker CE Installation on CentOS 8

```bash
dnf install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
sudo dnf install docker-ce
systemctl start docker
systemctl enable docker
systemctl status docker
```

## NodeJS and NPM Stable Installation

```bash
dnf install -y nodejs
npm install -g n
n stable
node -v
```

## Htop Installation CentOS 8

```bash
dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
dnf update
dnf install -y htop
```

## Numbers of Kernels to Keep

**Mininum is 2**

```bash
dnf install -y dnf-utils
```

### Configure yum to auto-remove old kernels

Edit /etc/yum.conf
Set the limit to desired value

```bash
installonly_limit=2
```

## Remove virbr0 and lxcbr0 Interfaces

```bash
chkconfig libvirtd off
```
