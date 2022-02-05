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

# Pwnagotchi

## Hardware

* Raspberrypi 3
* [Extenal RTL8812AU Wifi Card](https://www.aliexpress.com/item/32847646700.html?spm=a2g0s.9042311.0.0.27424c4dscl6Kp){target=_blank}
* [Waveshare 2.13inch e-paper hat v2](https://www.waveshare.com/wiki/2.13inch_e-Paper_HAT){target=_blank}
* [Pisugar2 Pro Portable 5000 mAh UPS Lithium Battery Power](https://www.pisugar.com/#){target=_blank}

## Preparation

Download the [pwnagotchi-raspbian-lite-v1.5.3](https://github.com/evilsocket/pwnagotchi/releases/download/v1.5.3/pwnagotchi-raspbian-lite-v1.5.3.zip){target=_blank} img file There is a bug in 1.5.5 with AI. Starting with 1.5.3 and it will auto-update to 1.5.5.

Flash it to the SD card

```bash
nano /Volumes/boot/config.txt
```

Uncomment and change arm_freq to 700 to prevent overheating and power consumption

```bash
arm_freq=700
```

Add to the end of the config

```bash
dtoverlay=disable-bt
over_voltage=1
dtparam=eee=off
hdmi_force_hotplug=1
```

Install the sd card and boot with ethernet cable

## SSH

Default User: pi
Default Password: raspberry

## Run as root there is no need of pi user

```bash
sudo su
```

Change the Root password

```bash
passwd
```

Allow Root SSH login

```bash
nano /etc/ssh/sshd_config
```

`PermitRootLogin yes`

Restart SSH service

```bash
systemctl restart ssh
```

logout and ssh with root user

Delete the `pi` user

userdel -r pi

## Internet fix

We need to disable the static config of the USB interface

```bash
nano /etc/network/interfaces.d/usb0-cfg 
```

Set it to:

```bash
#allow-hotplug usb0
#iface usb0 inet static
#  address 10.0.0.2
#  netmask 255.255.255.0
#  network 10.0.0.0
#  broadcast 10.0.0.255
#  gateway 10.0.0.1
```

Reboot. Now you will have internet connection and the Pwnagotchi will update itself (will reboot in process).

## Fix Repo, SSL Certificates

Fix outdated key for kali repo:

```bash
wget -O - https://re4son-kernel.com/keys/http/archive-key.asc | sudo apt-key add -
```

```bash
apt update
```

Fix SSL Certificates

```bash
apt install ca-certificates libgnutls30
```

## Update Packages

!!! bug
    use `apt-get` not `apt`

```bash
apt-get upgrade
```

!!! danger
    Never Use `dist-upgrade` this will brake the Pwnagotchi

Reboot

## Pwnagotchi Pisugar2 Plugin

[Official Pisugar Power manager-rs](https://github.com/PiSugar/pisugar-power-manager-rs){target=_blank}

[Pwnagotchi Pisugar2 Plugin](https://github.com/tisboyo/pwnagotchi-pisugar2-plugin){target=_blank}

[pwnagotchi.3os.re:8421 Pisugar WebUI](pwnagotchi.3os.re:8421)

On double tap select custom - edit input `reboot`

Install

```bash
# Go to the home directory
cd ~

# Install PiSugar Power Manager 
curl http://cdn.pisugar.com/release/Pisugar-power-manager.sh | sudo bash

# Download the plugin and support library
git clone https://github.com/PiSugar/pisugar2py.git
git clone https://github.com/PiSugar/pwnagotchi-pisugar2-plugin.git

#Make the installed-plugins directory if it doesn't already exist
sudo mkdir -p /usr/local/share/pwnagotchi/installed-plugins/

# This installs the pisugar2 package into your python library
sudo ln -s ~/pisugar2py/ /usr/local/lib/python3.7/dist-packages/pisugar2

# Installs the user-plugin
sudo ln -s ~/pwnagotchi-pisugar2-plugin/pisugar2.py /usr/local/share/pwnagotchi/installed-plugins/pisugar2.py
```

## config.toml

Replace content

```bash
nano /etc/pwnagotchi/config.toml
```

With

```bash
main.name = "pwnagotchi"
main.lang = "en"
main.confd = "/etc/pwnagotchi/conf.d/"
main.custom_plugins = "/usr/local/share/pwnagotchi/installed-plugins/"
main.custom_plugin_repos = [ "https://github.com/evilsocket/pwnagotchi-plugins-contrib/archive/master.zip",]
main.iface = "mon0"
main.mon_start_cmd = "/usr/bin/monstart"
main.mon_stop_cmd = "/usr/bin/monstop"
main.mon_max_blind_epochs = 50
main.no_restart = false
main.whitelist = [
 "Zoe",
 "ZoeGuests",
 "ZoePT",
 "68:FF:7B:0E:3B:D8",
 "10:5A:F7:20:11:78",
 "92:2A:A8:C4:EE:B7",
 "82:2a:a8:c5:ee:b7",
 "PT",
 "Madsec Guests",
]
main.filter = ""
main.plugins.grid.enabled = false
main.plugins.grid.report = false
main.plugins.grid.exclude = [
 "Zoe",
 "ZoeGuests",
 "ZoePT",
 "68:FF:7B:0E:3B:D8",
 "10:5A:F7:20:11:78",
 "92:2A:A8:C4:EE:B7",
 "82:2a:a8:c5:ee:b7",
 "PT",
 "Madsec Guests",
]

main.plugins.pisugar2.enabled = true
main.plugins.pisugar2.shutdown = 5
main.plugins.pisugar2.sync_rtc_on_boot = true

main.plugins.auto-update.enabled = true
main.plugins.auto-update.install = true
main.plugins.auto-update.interval = 1

main.plugins.net-pos.enabled = false
main.plugins.net-pos.api_key = "test"

main.plugins.gps.enabled = false
main.plugins.gps.speed = 19200
main.plugins.gps.device = "/dev/ttyUSB0"

main.plugins.webgpsmap.enabled = false

main.plugins.onlinehashcrack.enabled = false
main.plugins.onlinehashcrack.email = ""
main.plugins.onlinehashcrack.dashboard = "https://www.onlinehashcrack.com/v62gomuazt"
main.plugins.onlinehashcrack.single_files = false
main.plugins.onlinehashcrack.whitelist = []

main.plugins.wpa-sec.enabled = true
main.plugins.wpa-sec.api_key = "b7b6e6e5c305de8a5688521b7b28d15b"
main.plugins.wpa-sec.api_url = "https://wpa-sec.stanev.org"
main.plugins.wpa-sec.download_results = true
main.plugins.wpa-sec.whitelist = []

main.plugins.wigle.enabled = false
main.plugins.wigle.api_key = ""
main.plugins.wigle.whitelist = []
main.plugins.wigle.donate = true

main.plugins.bt-tether.enabled = false
main.plugins.bt-tether.devices.android-phone.enabled = false
main.plugins.bt-tether.devices.android-phone.search_order = 1
main.plugins.bt-tether.devices.android-phone.mac = "A4:50:46:B3:97:52"
main.plugins.bt-tether.devices.android-phone.ip = "192.168.44.44"
main.plugins.bt-tether.devices.android-phone.netmask = 24
main.plugins.bt-tether.devices.android-phone.interval = 1
main.plugins.bt-tether.devices.android-phone.scantime = 10
main.plugins.bt-tether.devices.android-phone.max_tries = 0
main.plugins.bt-tether.devices.android-phone.share_internet = true
main.plugins.bt-tether.devices.android-phone.priority = 999

main.plugins.bt-tether.devices.ios-phone.enabled = false
main.plugins.bt-tether.devices.ios-phone.search_order = 2
main.plugins.bt-tether.devices.ios-phone.mac = "B4:56:E3:A5:FD:92"
main.plugins.bt-tether.devices.ios-phone.ip = "172.20.10.5"
main.plugins.bt-tether.devices.ios-phone.netmask = 24
main.plugins.bt-tether.devices.ios-phone.interval = 1
main.plugins.bt-tether.devices.ios-phone.scantime = 10
main.plugins.bt-tether.devices.ios-phone.max_tries = 10
main.plugins.bt-tether.devices.ios-phone.share_internet = true
main.plugins.bt-tether.devices.ios-phone.priority = 999

main.plugins.memtemp.enabled = true
main.plugins.memtemp.scale = "celsius"
main.plugins.memtemp.orientation = "horizontal"

main.plugins.paw-gps.enabled = false
main.plugins.paw-gps.ip = ""

main.plugins.gpio_buttons.enabled = false

main.plugins.logtail.enabled = true
main.plugins.logtail.max-lines = 10000

main.plugins.session-stats.enabled = true
main.plugins.session-stats.save_directory = "/var/tmp/pwnagotchi/sessions/"

main.plugins.screen_refresh.enabled = true

main.plugins.ups_lite.enabled = false

main.plugins.webcfg.enabled = true

main.plugins.led.enabled = true
main.plugins.led.led = 0
main.plugins.led.delay = 200
main.plugins.led.patterns.loaded = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.updating = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.unread_inbox = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.ready = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.ai_ready = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.ai_training_start = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.ai_best_reward = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.ai_worst_reward = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.bored = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.sad = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.excited = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.lonely = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.rebooting = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.wait = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.sleep = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.wifi_update = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.association = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.deauthentication = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.handshake = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.epoch = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.peer_detected = "oo  oo  oo oo  oo  oo  oo"
main.plugins.led.patterns.peer_lost = "oo  oo  oo oo  oo  oo  oo"

main.log.path = "/var/log/pwnagotchi.log"
main.log.rotation.enabled = true
main.log.rotation.size = "10M"

ai.enabled = true
ai.path = "/root/brain.nn"
ai.laziness = 0.1
ai.epochs_per_episode = 50
ai.params.gamma = 0.99
ai.params.n_steps = 1
ai.params.vf_coef = 0.25
ai.params.ent_coef = 0.01
ai.params.max_grad_norm = 0.5
ai.params.learning_rate = 0.001
ai.params.alpha = 0.99
ai.params.epsilon = 1e-5
ai.params.verbose = 1
ai.params.lr_schedule = "constant"

personality.advertise = true
personality.deauth = true
personality.associate = true
personality.channels = [
 1,
 7,
 9,
 10,
 11,
 36,
 48,
 52,
 60,
 64,
 124,
 128,
]
personality.min_rssi = -85
personality.ap_ttl = 232
personality.sta_ttl = 293
personality.recon_time = 7
personality.max_inactive_scale = 4
personality.recon_inactive_multiplier = 3
personality.hop_recon_time = 28
personality.min_recon_time = 24
personality.max_interactions = 18
personality.max_misses_for_recon = 9
personality.excited_num_epochs = 18
personality.bored_num_epochs = 6
personality.sad_num_epochs = 15
personality.bond_encounters_factor = 20000

ui.fps = 0
ui.font.name = "DejaVuSansMono"
ui.font.size_offset = 0

ui.faces.look_r = "( ⚆_⚆)"
ui.faces.look_l = "(☉_☉ )"
ui.faces.look_r_happy = "( ◕‿◕)"
ui.faces.look_l_happy = "(◕‿◕ )"
ui.faces.sleep = "(⇀‿‿↼)"
ui.faces.sleep2 = "(≖‿‿≖)"
ui.faces.awake = "(◕‿‿◕)"
ui.faces.bored = "(-__-)"
ui.faces.intense = "(°▃▃°)"
ui.faces.cool = "(⌐■_■)"
ui.faces.happy = "(•‿‿•)"
ui.faces.excited = "(ᵔ◡◡ᵔ)"
ui.faces.grateful = "(^‿‿^)"
ui.faces.motivated = "(☼‿‿☼)"
ui.faces.demotivated = "(≖__≖)"
ui.faces.smart = "(✜‿‿✜)"
ui.faces.lonely = "(ب__ب)"
ui.faces.sad = "(╥☁╥ )"
ui.faces.angry = "(-_-')"
ui.faces.friend = "(♥‿‿♥)"
ui.faces.broken = "(☓‿‿☓)"
ui.faces.debug = "(#__#)"
ui.faces.upload = "(1__0)"
ui.faces.upload1 = "(1__1)"
ui.faces.upload2 = "(0__1)"

ui.web.enabled = true
ui.web.address = "0.0.0.0"
ui.web.username = "pwnagotchi"
ui.web.password = "fnTN8So41xJUMhfB3hog"
ui.web.origin = ""
ui.web.port = 8080
ui.web.on_frame = ""

ui.display.enabled = true
ui.display.rotation = 180
#ui.display.type = "waveshare_2"
#ui.display.type = "waveshare27inch"
ui.display.color = "black"

bettercap.scheme = "http"
bettercap.hostname = "localhost"
bettercap.port = 8081
bettercap.username = "pwnagotchi"
bettercap.password = "pwnagotchi"
bettercap.handshakes = "/root/handshakes"
bettercap.silence = [
 "ble.device.new",
 "ble.device.lost",
 "ble.device.disconnected",
 "ble.device.connected",
 "ble.device.service.discovered",
 "ble.device.characteristic.discovered",
 "wifi.client.new",
 "wifi.client.lost",
 "wifi.client.probe",
 "wifi.ap.new",
 "wifi.ap.lost",
 "mod.started",
]

fs.memory.enabled = true
fs.memory.mounts.log.enabled = true
fs.memory.mounts.log.mount = "/var/log"
fs.memory.mounts.log.size = "50M"
fs.memory.mounts.log.sync = 60
fs.memory.mounts.log.zram = true
fs.memory.mounts.log.rsync = true

fs.memory.mounts.data.enabled = true
fs.memory.mounts.data.mount = "/var/tmp/pwnagotchi"
fs.memory.mounts.data.size = "10M"
fs.memory.mounts.data.sync = 3600
fs.memory.mounts.data.zram = false
fs.memory.mounts.data.rsync = true
```

## Set Wlan1 to main wireless card

```bash
sed -i -e 's/mon0/wlan1/g' /etc/pwnagotchi/config.toml
sed -i -e 's/mon0/wlan1/g' /usr/bin/bettercap-launcher
```

Reboot. At this point the Pwnagotchi should work as intended.
If there is `error 400: error while activating handle: Interface Not Up` at

```bash
tail -f /var/log/pwnagotchi.log
```

Add this to crontab

```bash
@reboot /sbin/ip link set wlan1 down && /sbin/iw  dev wlan1 set type monitor && /sbin/ip link set wlan1 up
```

## Bettercap Update Caplets

```bash
bettercap
```

```bash
caplets.update
```

## Wlan0 As Client with `wpa_supplicant`

Set the Wlan0 config

```bash
nano /etc/network/interfaces.d/wlan0-cfg
```

to

```bash
allow-hotplug wlan0
iface wlan0 inet dhcp
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

Create psk for wpa_supplicant.conf

```bash
wpa_passphrase SSID Passphrase
```

Copy the output to /etc/wpa_supplicant/wpa_supplicant.conf

```bash
nano /etc/wpa_supplicant/wpa_supplicant.conf
```

!!! danger
    Remove the `#` Commented Clear-Text password

Multiple network example

```bash
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="SCHOOLS NETWORK NAME"
    psk="SCHOOLS PASSWORD"
}

network={
    ssid="HOME NETWORK NAME"
    psk="HOME PASSWORD"
}
```

## Aliases

add to ~/.zshrc

```bash
nano ~/.zshrc
```

```bash
alias pwnlog='tail -f -n300 /var/log/pwn*.log | sed --unbuffered "s/,[[:digit:]]\{3\}\]//g" | cut -d " " -f 2-'
alias pwnver='python3 -c "import pwnagotchi as p; print(p.__version__)"'
alias update='apt-get upgrade'
```

## Debug

```bash
bettercap -iface wlan1
wifi.recon on
```

List frequency support

```bash
/sbin/iwlist wlan1 freq
```
