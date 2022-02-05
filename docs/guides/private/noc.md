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

# noc.3os.re

## traefik-noc

```bash
docker run \
-d \
--restart always \
--name traefik-noc \
-h traefik-noc \
-v /root/traefik-noc:/etc/traefik/ \
-v /var/run/docker.sock:/var/run/docker.sock \
-p 80:80 \
-p 443:443 \
-e CLOUDFLARE_EMAIL=stas@3os.org \
-e CLOUDFLARE_API_KEY=20ed6643e18d02b97524de1785fbaa2e6e17c \
-v /etc/localtime:/etc/localtime \
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
-e WATCHTOWER_NOTIFICATION_URL="telegram://2146301331:AAGbdZGp0QbOpdVT-y6VrPtxPQ9nh2E50vk@telegram/?channels=-388432738&Title=noc" \
-v /etc/localtime:/etc/localtime \
containrrr/watchtower:latest --schedule '0 15 3 * * *' --cleanup
```

## SMTP to Telegram Bot

```bash
docker run \
-d \
--restart always \
--name smtp_to_telegram \
--hostname smtp-to-telegram \
-p 2525:2525 \
-e ST_TELEGRAM_CHAT_IDS=-388432738 \
-e ST_TELEGRAM_BOT_TOKEN=1108858398:AAGwwuVAiQtPV23Shu-bZx_AzqambeNZhjY \
-e ST_TELEGRAM_MESSAGE_TEMPLATE="{from}\\n{subject}\\n\\n{body}" \
-v /etc/localtime:/etc/localtime \
alecpetrosky/smtp_to_telegram:latest
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

## dnsBlockingListCreator

Add to crontab to run the script every 6 hours

```bash
0 */6 * * * /root/dnsBlockingListCreator/createList.sh
```
