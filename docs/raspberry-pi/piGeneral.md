---
description: Raspberry Pi Tips & Tricks how to, guides, examples, and simple usage, Raspberry Pi, Default User and Password, Install Oh-My-Zsh on Raspbian
---

# Raspberry Pi Tips & Tricks

## Enable SSH on Raspberry Pi Without a Screen

Put the micro SD card into your computer 
You'll have to locate the boot directory at your SD card

for example:

```bash
cd /Volumes/boot
```

All you have to do is create an empty file called ssh.

```bash
touch ssh
```

That's it. Insert the SD card to the Pi.  
You should have enabled SSH at boot.

## Default User and Password After Installation

```bash
User: pi
Password: raspberry
```

## Basic Configuration

```bash
sudo raspi-config
```

## Update OS

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

## Disable IPv6 on Raspberry Pi Os

Edit “/etc/sysctl.conf”:

```bash
sudo nano /etc/sysctl.conf
```

Add this to the end:

```config
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
net.ipv6.conf.eth0.disable_ipv6 = 1
```

Save and close the file.
Edit “/etc/rc.local”:

```bash
sudo nano /etc/rc.local
```

Add this to the end (but before “exit 0”):

```bash
service procps reload
```

Save and close the file.
Reboot

## Show Raspberry Temperature

```bash
/opt/vc/bin/vcgencmd measure_temp
```

## Samba for RaspberryPi

```bash
sudo apt-get update
sudo apt-get install -y samba samba-common-bin smbclient cifs-utils
sudo smbpasswd -a pi ( my-pi-samba-remote-password )
sudo nano /etc/samba/smb.conf
```

change:

```bash
workgroup = YOUR WINDOWS WORKGROUP NAME
```

add at end:

```bash
[share]
    path = /home/pi/Desktop/share
    available = yes
    valid users = pi
    read only = no
    browsable = yes
    public = yes
    writable = yes
```

`the shared path must exist: ( if you work via desktop ( HDMI or VNC ) it is very convenient just to read or drop from/to this shared dir ) mkdir /home/pi/Desktop/share`

```bash
sudo reboot
```

Start samba Server

```bash
sudo /usr/sbin/service smbd start
```
