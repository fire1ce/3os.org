---
description: Penetration Testing - Kali Linux how to, guides, examples, and simple usage and tools, Minimal Headless Kali Linux installation, Kali Linux cloud, Kali Linux Metasploit Install, Kali Linux AutoRecon Installation, Kali Linux Bettercap 1.6.2 Installation, MobSF - Mobile Security Framework Docker,SSH Broken Pipe in Kali Linux - Fix
---

# Kali Linux

## Minimal Headless Kali Linux installation - Works for Cloud VM Installation (NO GUI)

This is a simple guide to install Minimal Headless Kali Linux by converting a Debian Linux to Kali Linux distro without any unnecessary tools. Basicity you install the tools you need.

| __Platforms__                                                     | __Minimum Monthly Price__                |
| ----------------------------------------------------------------- | ---------------------------------------- |
| [DigitalOcean.com](https://m.do.co/c/2f680de0d76e){target=_blank} | 5$ (This link provides 100$ for 60 days) |

First of all we will need a clean Debian Linux local or at any cloud provider with ssh access

Let's convert! We will install two packages which allow as to replace Debian's repo to kali repo

```bash
apt update
```

```bash
apt install -y gnupg gnupg2 wget
```

```bash
wget -q -O - https://archive.kali.org/archive-key.asc  | apt-key add
```

```bash
rm -rf /etc/apt/sources.list
```

```bash
echo "deb http://http.kali.org/kali kali-rolling main contrib non-free" >> /etc/apt/sources.list
```

Now after we replaced the repo to Kali we need to install the Basic Kali Linux core

```bash
apt -y update
```

```bash
apt-cache search kali-linux
```

```bash
apt install -y kali-linux-core
```

```bash
apt-get -y update
```

```bash
apt-get -y dist-upgrade
```

```bash
apt-get -y autoremove
```

**Reboot** the server to complete the conversion process.

In order to test that you are using Kali Linux

```bash
uname -a
```

After we got our new Minimal Kali ready we need to cleanup some Debian's leftovers to finnish

```bash
systemctl stop rpcbind.socket rpcbind smbd
```

```bash
systemctl disable rpcbind.socket rpcbind smbd
```

That's It, now we can install any package we need from Kali repo.

Here are some of my personal packages I use daily

```bash
apt update && apt install -y \
curl wget git dnsutils whois net-tools htop locate telnet traceroute \
dirb wfuzz dirbuster enum4linux gobuster nbtscan nikto nmap \
onesixtyone oscanner smbclient fern-wifi-cracker crowbar smbmap \
smtp-user-enum sslscan tnscmd10g whatweb snmpcheck wkhtmltopdf \
sipvicious seclists wordlists hash-identifier hydra bully netcat \
adb fastboot realtek-rtl88xxau-dkms docker docker-compose crunch \
wifite apktool apksigner zipalign default-jre default-jdk man-db \
screenfetch xsltproc binwalk python3-pip zlib1g-dev python2.7-dev \
subfinder chrony hcxtools libssl-dev hcxdumptool hashcat netcat \
libpcap-dev npm sqlmap wpscan exploitdb
```

## MobSF - Mobile Security Framework Docker

Based on [MobSF/Mobile-Security-Framework-MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)

```bash
docker run \
-d \
-it \
-h mobsf \
-v /root/docker/mobSF:/root/.MobSF \
--name mobsf \
--restart always \
-e TZ=Asia/Jerusalem \
-p 50000:8000 \
opensecurity/mobile-security-framework-mobsf:latest
```

## SSH Broken Pipe in Kali - Fix

```bash
nano ~/.ssh/config
```

add this:

```bash
Host *
    IPQoS=throughput
```
