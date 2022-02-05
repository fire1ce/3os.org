---
password: 3]?0=%7$SEmHSso3Wj)M
hide:
  - toc
---

<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
</style>

# port.3os.re

## traefik-port

```bash
docker run \
-d \
--restart always \
--name traefik-port \
-h traefik-port \
-v /root/traefik-port:/etc/traefik/ \
-v /var/run/docker.sock:/var/run/docker.sock \
-p 80:80 \
-p 443:443 \
-p 11500-11502:11500-11502 \
-e CLOUDFLARE_EMAIL=stas@3os.org \
-e CLOUDFLARE_API_KEY=20ed6643e18d02b97524de1785fbaa2e6e17c \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
traefik:latest
```

## WatchTower

```bash
docker run \
-d \
--restart always \
--name watchtower \
-h watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
-e WATCHTOWER_NOTIFICATIONS=shoutrrr \
-e WATCHTOWER_NOTIFICATION_URL="telegram://2146301331:AAGbdZGp0QbOpdVT-y6VrPtxPQ9nh2E50vk@telegram/?channels=-388432738&Title=port" \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
containrrr/watchtower:latest --schedule '0 30 3 * * *' --cleanup
```

## Pihole With Cloudflared

Create Docker network for the Pihole and Cloudflared

```bash
docker network create --subnet 172.30.9.0/29 dns-network
```

### Pihole

```bash
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
-e VIRTUAL_HOST="pi.hole" \
-e PROXY_LOCATION="pi.hole" \
-e ServerIP="127.0.0.1" \
-e PIHOLE_DNS_="172.30.9.3#5053;172.30.9.3#5053" \
-e WEBPASSWORD="Y26&?A8Gkz[.riFWKa2.X2yb" \
-v /etc/localtime:/etc/localtime \
--network=dns-network \
pihole/pihole:latest
```

### CloudFlared - for Pihole

```bash
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
--network=dns-network \
visibilityspots/cloudflared:latest
```

## Emby

```bash
docker run \
-d \
--restart always \
--name emby \
-h emby \
-v /root/emby:/config \
-v /mnt/activeShare/Media:/media \
-v /etc/localtime:/etc/localtime \
-e PUID=0 \
-e PGID=0 \
linuxserver/emby:latest
```

## Jackett

```bash
docker run \
-d \
--restart always \
--name=jackett \
-h jackett \
-v /root/jackett:/config \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
linuxserver/jackett:latest
```

### flaresolverr (cloudflare bypasse for Jackett)

```bash
docker run \
-d \
--restart always \
--name=flaresolverr \
-h flaresolverr \
-e LOG_LEVEL=info \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
flaresolverr/flaresolverr:latest
```

## Ombi

```bash
docker run \
-d \
-h ombi \
--restart always \
--name=ombi \
-v /root/ombi:/config \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
linuxserver/ombi:latest
```

## Calibre-Web

```bash
docker run \
-d \
--restart always \
--name=calibre-web \
-h calibre-web \
-v /root/calibre/config:/config \
-v /root/calibre/books:/books \
-p 11510:8083 \
-e DOCKER_MODS=linuxserver/calibre-web:calibre \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
linuxserver/calibre-web:latest
```

## Joal

```bash
docker run \
-d \
--name="joal" \
--restart always \
-h joal \
-v /root/joal:/data \
-p 7004:7004 \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
anthonyraymond/joal:latest \
--joal-conf="/data" \
--spring.main.web-environment=true \
--server.port="7004" \
--joal.ui.path.prefix="joal" \
--joal.ui.secret-token="joal"
```

## MagicMirror

```bash
docker run \
-d \
--restart always \
--name magic_mirror \
-h magic_mirror \
-v /root/magic_mirror/config:/opt/magic_mirror/config \
-v /root/magic_mirror/modules:/opt/magic_mirror/modules \
-v /root/magic_mirror/css:/opt/magic_mirror/css \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
karsten13/magicmirror:latest \
npm run server
```

## Minecraft

```bash
docker run \
-it \
-d \
-p 25565:25565 \
--restart always \
--name=minecraft \
-v /root/minecraft:/data \
-e EULA=TRUE \
-e MEMORY=8G \
-e SERVER_NAME=minecraft \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
itzg/minecraft-server:latest
```

## Homebridge

```bash
docker run \
-d \
--restart always \
--net=host \
--name=homebridge \
-e HOMEBRIDGE_CONFIG_UI=1 \
-e HOMEBRIDGE_CONFIG_UI_PORT=7002 \
-e HOMEBRIDGE_INSECURE=1 \
-v /root/homebridge:/homebridge \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
oznu/homebridge:latest
```

## iperf3 Server

```bash
docker run \
-d \
--restart always \
--name iperf3-server  \
-h iperf3-server \
-p 5201:5201 \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
taoyou/iperf3-alpine:latest
```
