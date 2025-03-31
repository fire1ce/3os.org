---
title: Wi-Fi Traffic Mirroring
description: OpenWrt Wi-Fi Traffic Mirroring with GL.iNet GL-AR750S
template: comments.html
tags: [Wi-Fi Traffic Mirroring, OpenWrt, GL.iNet, GL-AR750S, tcpdump, Wireshark]
---

# Wi-Fi Traffic Mirroring

## Goal

Mirror all Wi-Fi traffic from `wlan0` and `wlan1` interfaces to a physical LAN port (Port 2) for packet inspection via tools like **Wireshark** or **tcpdump**.

This allows real-time monitoring of Android phone traffic (or any wireless client) connected to the router's Wi-Fi.

## Requirements

- A GL.iNet GL-AR750S router (OpenWRT 19.07.8)
- SSH access
- LAN Port 2 connected to a monitoring PC
- An Android phone or wireless client connected to `wlan1` or `wlan0`

## Caveats

- This script is **not persistent**. You must run it **after every router reboot**.
- Traffic will only appear when a client is actively transmitting over Wi-Fi.

## Script

Create a file named `wifi-mirror.sh`:

```bash
#!/bin/sh

echo "[*] Installing dependencies..."
opkg update
opkg install kmod-ifb tcpdump nano

echo "[*] Loading IFB and bringing up ifb0..."
modprobe ifb
ip link set ifb0 up

# Clear old rules
echo "[*] Resetting TC qdiscs..."
tc qdisc del dev ifb0 root 2>/dev/null
tc qdisc del dev wlan0 ingress 2>/dev/null
tc qdisc del dev wlan1 ingress 2>/dev/null

# Apply new ones
echo "[*] Setting up TC mirroring..."
tc qdisc add dev ifb0 root handle 1: prio

tc qdisc add dev wlan0 handle ffff: ingress
tc qdisc add dev wlan1 handle ffff: ingress

tc filter add dev wlan0 parent ffff: protocol all u32 match u32 0 0 action mirred egress mirror dev ifb0
tc filter add dev wlan1 parent ffff: protocol all u32 match u32 0 0 action mirred egress mirror dev ifb0

tc filter add dev ifb0 parent 1: protocol all u32 match u32 0 0 action mirred egress mirror dev eth0

# Mirror CPU port (eth0) to LAN port 2
echo "[*] Re-applying switch mirror config..."
uci set network.@switch[0].mirror_source_port='0'
uci set network.@switch[0].mirror_monitor_port='2'
uci set network.@switch[0].enable_mirror_rx='1'
uci set network.@switch[0].enable_mirror_tx='1'
uci commit network
/etc/init.d/network reload

echo "[✔] Done. You can now monitor Wi-Fi traffic with:"
echo "    tcpdump -i ifb0 -n"
echo "    Or run Wireshark on LAN Port 2."
```

Make it executable:

```bash
chmod +x wifi-mirror.sh
```

Run it after every reboot to re-activate mirroring:

```bash
./wifi-mirror.sh
```

## Debugging Tips

- Ensure Port 2 is connected to your PC and set as the mirror monitor port
- Use `tcpdump -i ifb0` to confirm Wi-Fi traffic is mirrored correctly
- Re-run the script manually if traffic stops
