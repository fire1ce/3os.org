---
title: 3g Modem Host Configuration
description: Setup of 3g Modem On Raspberry Pi
template: comments.html
tags: [raspberry-pi, 3g-modem]
---

# 3g Modem Host Configuration

Install ubuntu server for raspberrypi using [Raspberry Pi Imager](https://www.raspberrypi.org/software/){target=\_blank}{}

## Packages Installation

```bash
apt install -y ppp curl wget git dnsutils whois net-tools htop gcc libusb-1.0-0-dev iptables-persistent isc-dhcp-server
```

After the install add a symlink

```bash
ln -s /usr/include/libusb-1.0/libusb.h /usr/include/libusb.h
```

## sakis3g Script Installation

Clone, Compile, and copy to /usr/bin/

```bash
git clone https://github.com/Trixarian/sakis3g-source.git
cd sakis3g-source
./compile
cp build/sakis3gz /usr/bin/sakis3g
```

Create new script for auto connect

```bash
nano /usr/bin/sakis3gConnect.sh
```

!!! note
interactive connect (for testing)
`bash sakis3g --interactive `

Copy the following

```bash
#!/bin/bash

/usr/bin/sakis3g start USBINTERFACE="5" APN="vob3g"  APN_USER=" " APN_PASS=" "
```

!!! note
When APN credentials are epmpy, APN_USER and APN_PASS should be a string with a space

Add executable permissions

```bash
chmod +x sakis3gConnect.sh
```

Run the script sakis3gConnect.sh

You should have a new interface ppp0

## Configuring DHCP Server

!! info
The following configuration assumes use of eth0 interface for the DHCP

Edit

```bash
nano /etc/default/isc-dhcp-server
```

Add the following to the end of the config

```bash
INTERFACESv4="eth0"
INTERFACESv6="eth0"
```

Edit

```bash
nano /etc/dhcp/dhcpd.conf
```

Change the following options to (you can choose the name servers you use):

```bash
option domain-name "local";
option domain-name-servers 8.8.8.8;
default-lease-time 600;
max-lease-time 7200;
ddns-update-style none;
authoritative;
```

Append the DHCP Network config to the end of the file (Change for your need):

```bash
subnet 192.168.20.0 netmask 255.255.255.0 {
  range 192.168.20.5 192.168.20.30;
  option routers 192.168.20.1;
  option domain-name-servers 8.8.8.8, 8.8.4.4;
}
```

Save & Exit

run

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

Edit

```bash
nano /etc/sysctl.conf
```

Change the following option

```bash
net.ipv4.ip_forward=1
```

Restart and Test

```bash
service isc-dhcp-server restart
service isc-dhcp-server status
```

## Configure static ip for the th0 Interface & DHCP

edit:

```bash
/etc/netplan/50-cloud-init.yaml
```

```bash
network:
  ethernets:
      eth0:
            addresses: [192.168.20.1/24]
            gateway4: 192.168.20.1
            nameservers:
                    addresses: [1.1.1.1, 8.8.8.8]
  version: 2
```

After reboot you should connet to the new static ip

## Lets route all the trafic to new interface with Iptables

```bash
iptables -F
iptables --table nat --append POSTROUTING --out-interface ppp0 -j MASQUERADE
iptables --append FORWARD --in-interface eth0 -j ACCEPT
```

Save the rules

```bash
iptables-save > /etc/iptables/rules.v4
ip6tables-save > /etc/iptables/rules.v6
```

## Cron examples

```bash
@reboot sleep 20 && /usr/bin/sakis3gConnect.sh
*/5 * * * * /usr/bin/sakis3gConnect.sh
```
