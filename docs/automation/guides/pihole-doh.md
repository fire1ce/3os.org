---
title: Pi-hole with DOH on Docker
description: Pi-hole as DNS Server with DNS over HTTPS (DOH) Based on Docker Containers. Pi-hole, DNS ads, tracking blocking on Ubuntu with DNS over HTTP, list of blacklist
template: comments.html
tags: [pi-hole, doh, docker, dns, dns-over-https]
---

# Pi-hole as DNS Server with DNS over HTTPS (DOH) Based on Docker Containers

![pihole-webgui][webgui-img]{: style="width:600px"}

## What's Pi-hole?

Pi-hole Official Website [Official Website][pi-hole-url]{target=\_blank}.

Pi-hole is a DNS server that is designed to block ads and trackers. It is a free and open source software project. It's based on blocklists and acts as a DNS sinkhole.

## What's DNS over HTTPS (DOH)?

DNS over HTTPS (DoH) is an internet security protocol that communicates domain name server information in an encrypted way over HTTPS connections.

## My Pi-hole Setup

My setup fully depends on pi-hole dns server, that's why I use two servers one as primary DNS Server and the second as secondary DNS server.

I've configured my router as a DNS server for all the DHCP clients with primary and the secondary DNS as my pi-hole servers. This way all the clients requests the router to resolve the DNS and the router forwards the request to the pi-hole servers.

![network flow][network-flow-img]{: style="width:600px"}

- **Pi-hole-1 runs on ubuntu server (virtual machine)**
- **Pi-hole-2 runs on [Raspberry Pi][amazon-raspberry-url]{target=\_blank}**

!!! warning

    This is not a step by step guide for all the configurations of pihole or how to use docker containers. The following instuctions include only the deployemt of the pi-hole server with DoH providers.

## Installation

We Will be using `docker-compose` to deploy the pi-hole server with DoH providers with a single configuration file.

The following docker-compose.yml includes two images: [Pi-hole container][github-docker-pi-hole-url]{target=\_blank}, and [cloudflared container][github-docker-cloudflared-url]{target=\_blank}. When you run `docker-compose up` the containers will be created and started.
I't will create internal network for the pihole and two instances of cloudflared. When a request comes in the pihole will forward the request to the cloudflared instances one of them will use Cloudflare DNS servers and the other will use Google's DNS servers.
There is no need to configure the pihole's DNS server at the UI since the confiuuration is done by `docker-compose.yml` file.

When using this setup two folders will be created on the Host machine for presistent storage of the containers: `config, dnsmasq.d`.
Those folders will be mounted to the containers when its running/restarted/recreated. Those folders will be created at the root folder of the docker-compose.yml file.

Create a folder for the deployment of the containers at your host machine.  
create a file named `docker-compose.yml` at the root folder and copy the following content to it:

```yaml
version: '2.4'

services:
  pihole:
    container_name: pihole
    hostname: pihole
    restart: always
    image: pihole/pihole
    networks:
      dns:
        ipv4_address: 172.20.0.9
    depends_on:
      google-8.8.8.8:
        condition: service_started
      cloudflare-1.1.1.1:
        condition: service_started
    volumes:
      - ./config:/etc/pihole/
      - ./dnsmasq.d:/etc/dnsmasq.d/
      - /etc/localtime:/etc/localtime
    ports:
      - '7003:80'
      - '53:53/tcp'
      - '53:53/udp'
    environment:
      - ServerIP=127.0.0.1
      - WEBPASSWORD=ChangeMe
      - PIHOLE_DNS_=172.20.0.10;172.20.0.12

  cloudflare-1.1.1.1:
    container_name: cloudflare-1.1.1.1
    hostname: cloudflare-1.1.1.1
    restart: always
    image: visibilityspots/cloudflared
    networks:
      dns:
        ipv4_address: 172.20.0.10
    expose:
      - '53/tcp'
      - '53/udp'
    environment:
      - PORT=53
      - UPSTREAM1=https://1.1.1.1/dns-query
      - UPSTREAM2=https://1.1.1.1/dns-query
    volumes:
      - /etc/localtime:/etc/localtime

  google-8.8.8.8:
    container_name: google-8.8.8.8
    hostname: google-8.8.8.8
    restart: always
    image: visibilityspots/cloudflared
    networks:
      dns:
        ipv4_address: 172.20.0.12
    expose:
      - '53/tcp'
      - '53/udp'
    environment:
      - PORT=53
      - UPSTREAM1=https://8.8.8.8/dns-query
      - UPSTREAM2=https://8.8.8.8/dns-query
    volumes:
      - /etc/localtime:/etc/localtime

networks:
  dns:
    ipam:
      config:
        - subnet: 172.20.0.0/24
```

Now run `docker-compose up -d` to create the containers. If all went well you should should be able to access the pihole server at `http://127.0.0.1.7003` with password `ChangeMe` from the config above.

Now you need to change your dns server to point to the pihole server.
We are done with the installation.

<!-- appendices -->

<!-- urls -->

[pi-hole-url]: https://pi-hole.net/ 'Pi-hole official website'
[amazon-raspberry-url]: https://amzn.to/3KbHRuc 'Raspberry Pi Amazon'
[github-docker-pi-hole-url]: https://github.com/pi-hole/docker-pi-hole 'Github Docker Pi-hole'
[github-docker-cloudflared-url]: https://github.com/visibilityspots/dockerfile-cloudflared 'Github Docker Cloudflared'

<!-- images -->

[webgui-img]: /assets/images/guides/pihole-dns/webgui.png 'pihole webgui'
[network-flow-img]: /assets/images/guides/pihole-dns/diagram.png 'network flow'

<!-- end appendices -->
