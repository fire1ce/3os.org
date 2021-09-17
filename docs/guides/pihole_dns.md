---
description: Pi-hole as DNS Server with DNS over HTTPS (DOH) Based on Docker Containers. Pi-hole, DNS ads, tracking blocking on Ubuntu with DNS over HTTP, list of blacklist
---

# Pi-hole as DNS Server with DNS over HTTPS (DOH) Based on Docker Containers

You can read about Pi-hole at their [Official Website](https://pi-hole.net/ 'pi-hole.net')

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/guides/pihole-dns/webgui.png" alt="pihole-webgui">
</div>

My setup fully depends on pi-hole dns server, that's why we use two servers one as primary DNS Server and the second as secondary DNS server.

I've configured my router as a DNS server for all the DHCP clients with primary and the secondary DNS as my pi-hole servers. This way all the clients requests the router to resolve the DNS.

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/guides/pihole-dns/diagram.png" alt="network flow">
</div>

-   **Pi-hole-1 runs on ubuntu server (virutal machine)**
-   **Pi-hole-2 rusn on ubuntu server (Raspbery Pi)**

## Installation

!!! warning
    This is not a step by step guide for all the configurations of pihole or how to use docker

We will be using docker containers for both Pihole and the Cloudflared (DOH).
Since we want to forward DNS requests from Pihole to Cloudflared (DOH) we will create very specific docker network which will allow as to configure the forwarding requests for the DNS with internal docker IP (yeah i know it's against all the best practice of docker)

Create Docker network for the Pihole and Cloudflared with only 5 IP address:

```bash
docker network create --subnet 172.30.9.0/29 dns-net
```

We will run the pihole docker container with hardcoded ip from the pull we created. we will pass the DNS1, DNS2 ip address for the Cloudflared container we ill create in the next step

```docker
docker run \
-d \
--name pihole \
--hostname pihole \
--restart always \
--ip 172.30.9.2 \
-p 53:53/tcp \
-p 53:53/udp \
-p 7003:80 \
-v /root/pihole:/etc/pihole/ \
-v /root/pihole/dnsmasq.d:/etc/dnsmasq.d/ \
-e ServerIP="127.0.0.1" \
-e DNS1=172.30.9.3#5053 \
-e DNS2=172.30.9.3#5053 \
-e WEBPASSWORD="ChangeMe" \
-v /etc/localtime:/etc/localtime \
--network=dns-net \
pihole/pihole:latest
```

Now we will create our Cloudflared container with hardcoded ip

```docker
docker run \
-d \
--restart always \
--name=cloudflared \
--ip 172.30.9.3 \
-h cloudflared \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
-e PORT=5053 \
--network=dns-net \
visibilityspots/cloudflared:latest
```

At this point you should have both containers running with pihole forwarding all the requests via DNS over HTTPS.
