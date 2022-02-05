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

# oscar.3os.re

## traefik-oscar

```bash
docker run \
-d \
--restart always \
--name traefik-oscar \
-h traefik-oscar \
-v /volume1/docker/traefik-oscar:/etc/traefik/ \
-v /var/run/docker.sock:/var/run/docker.sock \
-p 80:80 \
-p 443:443 \
-p 11500-11502:11500-11502 \
-e CLOUDFLARE_EMAIL=stas@3os.org \
-e CLOUDFLARE_API_KEY=20ed6643e18d02b97524de1785fbaa2e6e17c \
-v /etc/localtime:/etc/localtime \
traefik:latest
```

## Watchtower

```bash
docker run \
-d \
--restart always \
--name watchtower \
-h watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
-e WATCHTOWER_NOTIFICATIONS=shoutrrr \
-e WATCHTOWER_NOTIFICATION_URL="telegram://2146301331:AAGbdZGp0QbOpdVT-y6VrPtxPQ9nh2E50vk@telegram/?channels=-388432738&Title=oscar" \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
containrrr/watchtower:latest --schedule '0 0 3 * * *' --cleanup
```

## Sonarr

!!! warning
    id: torrentuser  
    uid=1030(torrentuser) gid=100(users) groups=100(users)

```bash
docker run \
-d \
--restart always \
--name sonarr \
-h sonarr \
-v /volume1/docker/sonarr:/config \
-v /volume1/activeShare/Media/tvShows:/tv \
-v /volume1/activeShare/DownloadStation:/downloads \
-v /etc/localtime:/etc/localtime \
-e PUID=1030 \
-e PGID=100 \
linuxserver/sonarr:latest
```

## Radarr

!!! warning
    id: torrentuser  
    uid=1030(torrentuser) gid=100(users) groups=100(users)

```bash
docker run \
-d \
--restart always \
--name=radarr \
-h radarr \
-v /volume1/docker/radarr:/config \
-v /volume1/activeShare/Media/Movies:/movies \
-v /volume1/activeShare/DownloadStation:/downloads \
-v /etc/localtime:/etc/localtime \
-e PUID=1030 \
-e PGID=100 \
linuxserver/radarr:latest
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

## Bazarr

```bash
docker run \
-d \
--restart always \
--name=bazarr \
-h bazarr \
-v /volume1/docker/bazarr:/config \
-v /volume1/activeShare/Media/Movies:/movies \
-v /volume1/activeShare/Media/tvShows:/tv \
-v /etc/localtime:/etc/localtime \
-e PUID=1030 \
-e PGID=100 \
linuxserver/bazarr:latest
```