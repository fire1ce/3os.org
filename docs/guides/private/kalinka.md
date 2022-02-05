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

# kali.3os.re

## traefik-kali

```bash
docker run \
-d \
--restart always \
--name traefik-kali \
-h traefik-port \
-v /root/traefik-kali:/etc/traefik/ \
-v /var/run/docker.sock:/var/run/docker.sock \
-p 80:80 \
-p 443:443 \
-e CLOUDFLARE_EMAIL=stas@3os.org \
-e CLOUDFLARE_API_KEY=20ed6643e18d02b97524de1785fbaa2e6e17c \
-v /etc/localtime:/etc/localtime \
-e PUID=1000 \
-e PGID=1000 \
traefik:latest
```

## mobSF - ARM

```bash
docker run \
-d \
-it \
-h mobsf \
--name mobsf \
--restart always \
-v /root/mobSF:/root/.MobSF \
-v /etc/localtime:/etc/localtime \
--label traefik.http.services.mobsf.loadbalancer.server.port=8000 \
opensecurity/mobile-security-framework-mobsf:latest
```

## watchtower

```bash
docker run \
-d \
--restart always \
--name watchtower \
-h watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /etc/localtime:/etc/localtime \
-e WATCHTOWER_NOTIFICATIONS=shoutrrr \
-e WATCHTOWER_NOTIFICATION_URL="telegram://2146301331:AAGbdZGp0QbOpdVT-y6VrPtxPQ9nh2E50vk@telegram/?channels=-388432738&Title=kali" \
containrrr/watchtower:latest --schedule '0 0 3 * * *' --cleanup
```
