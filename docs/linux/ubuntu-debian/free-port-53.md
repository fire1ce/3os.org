---
title: Free Port 53 on Ubuntu
description: How to properly free port 53 on Ubuntu from systemd-resolved DNS.
template: comments.html
tags: [Ubuntu, dns]
---

# Free Port 53 on Ubuntu

## Whats using port 53?

When you install Ubuntu (in my case its Server version). It uses systemd-resolved as internal DNS Forwarder.

systemd-resolved is a system service that provides network name resolution to local applications. It implements a caching and validating DNS/DNSSEC stub resolver, as well as an LLMNR resolver and responder.

![Netstat output][netstat-output-img]

## How to free port 53 on Ubuntu

If we want to use port 53 for other purposes, we need to free it for example a `Pihole DNS` server.

We can do it with the following commands:

```shell
sudo sed -r -i.orig 's/#?DNSStubListener=yes/DNSStubListener=no/g' /etc/systemd/resolved.conf
sudo sh -c 'rm /etc/resolv.conf && ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf'
sudo systemctl restart systemd-resolved
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

[netstat-output-img]: /assets/images/6f1283a2-f6eb-11ec-a1c2-ef56aa217b30.jpg 'Netstat output'

<!--css-->

<!-- end appendices -->
