---
description: Raspberry Pi - Raspberry Pi Tor Access Point Guide, Tor proxy, Raspberry Pi 2, Raspberry Pi 3, Raspberry Pi 4
---

# TorPi - Raspberry Pi Tor Access Point

<div style="margin:0 auto">
   <img src="/assets/images/RaspberryPi/torPi/networkDiagram.png" alt="Tor-Pi Network Flow">
</div>

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/RaspberryPi/torPi/torPi.jpg" alt="TorPi - Raspberry Pi Tor Access Point">
</div>

<!-- prettier-ignore-start -->
!!! note "Totally Wireless TorPi :point_up_2:"
      [Raspberry 2 Model B](https://amzn.to/374jde5){target=_blank}  
      2x [Edimax N150 WiFi USB Adapters](https://amzn.to/33V42lm){target=_blank}  
      [Miracase 5x 5000mAh Power Bank](https://amzn.to/33TPgLQ){target=_blank}  

<!-- prettier-ignore-end -->

**Hardware Support List:**

| **Raspberry Model**                                   | **Cable to WiFi**   | **Cable/WiFi to WiFi** |
| ----------------------------------------------------- | ------------------- | ---------------------- |
| Raspberry 1                                           | 1 WiFi USB Adapters | 2x WiFi USB Adapters   |
| Raspberry 2                                           | 1 WiFi USB Adapters | 2x WiFi USB Adapters   |
| [Raspberry 3](https://amzn.to/2SSqQMz){target=_blank} | ---                 | 1 WiFi USB Adapters    |
| [Raspberry 4](https://amzn.to/3186kvJ){target=_blank} | ---                 | 1 WiFi USB Adapters    |

-   **Native Wifi Chipset Support**
    -   Realtek 8188 (rtl8188cus)
    -   MediaTek RT5370

## Update: This Guide Is Deprecated - Moved to [TorBox](https://www.torbox.ch/){target=\_blank}

__Use [TorBox](https://www.torbox.ch/){target=\_blank} Project__

If you still need information form the original guide is hidden below:

??? "Deprecated Guide Archive"
    ## Installing Headless Minimal Raspberry Pi OS
    Download **Raspberry Pi OS Minimal** image from: [raspberrypi.org](https://www.raspberrypi.org/downloads/raspberry-pi-os/ 'Raspberry Pi OS Download'){target=\_blank}
    It's a headless os - **Without GUI**
    <div style="width:80%; margin:0 auto">
      <img src="/assets/images/RaspberryPi/torPi/rasberryPiOsMinimal.png" alt="TorPi">
    </div>
    Burn **Raspberry Pi OS Minimal** image to SD-Card that will be used in this project for TorPi.  
    Since we don't won't to use external screen or keyboard, we need to allow an SSH access to the Raspberry Pi OS on the first boot.
    After we created our bootable SD card we need to mount it and add a file called **“ssh”** inside a boot partition.  
    This will enable and start ssh daemon on pi at boot.
    <div style="width:40%; margin:0 auto">
      <img src="/assets/images/RaspberryPi/torPi/ssh_file.png" alt="TorPi">
    </div>
    To continue the setup we will need a Ethernet Cable with DHCP and Internet Connection.  
    Insert the SD card and the Ethernet cable and boot your pi by connecting power.  
    At this point the pi should boot the new OS from the SD card and get a DHCP address.  
    Find the new address your pi just got from your dhcp server. You can do it inside your router's ui or use nmap tp find it on the network.  
    If you can't find the new address you can allows connect it to external screen and keyboard - use default credentials to login and 'ip addr' command
    SSH to the Raspberry Pi
    Default credentials:
    -   User: **pi**
    -   Password: **raspberry**
    ```bash
    ssh pi@192.168.1.111
    ```
    Change the default password for the Pi user
    ```bash
    passwd
    ```
    Let's run system updates and cleanup
    ```bash
    sudo apt update && sudo apt full-upgrade -y
    ```
    _Optional_: Use simple: [Update Script](https://3os.org/linux/ubuntu/#debianubunturaspberrypios-_update_script 'update script){target=\_blank}
    _Optional_: [SSH Hardening with RSA Keys](https://3os.org/linux/SSH_Service_Security/#ssh_service_security 'SSH Hardening with RSA Keys'){target=\_blank}
    _Optional_: [Fix bash local error](https://3os.org/linux/general/general/#fix_locales_fix_bash_local_error 'Fix bash local error'){target=\_blank}
    _Optional_: [Set System Time With NTP](https://3os.org/linux/general/general/#set_system_time_with_time_zone_timedatectl_ntp 'Set System Time With NTP'){target=\_blank}
    _Optional_ [Install Oh My Zsh](https://3os.org/guides/BetterTerminal/#linux_installation 'Install Oh My Zsh'){target=\_blank}
    Follow this to [Disable IPv6 on Raspberry Pi Os](https://3os.org/raspberryPi/piGeneral/#disable_ipv6_on_raspberry_pi_os 'Disable IPv6 on Raspberry Pi Os'){target=\_blank}
    Change the Hostname to 'torPi' or any one you like
    ```bash
    sudo raspi-config
    ```
    Select: 2.Network Options -> N1 Hostname
    ```config
    torPi
    ```
    Install some usefully utils if missing
    ```bash
    sudo apt install -y net-tools curl wget traceroute htop
    ``
    Reboot The Pi for the first time
    ```bash
    sudo reboot
    ```
    ## RaspAP WiFi Configuration Web Portal Installation
    Many thanks to [billz](https://github.com/billz 'github.com/billz'){target=\_blank} for his project [RaspAP](https://raspap.com/ 'https://raspap.com)'){target=\_blank}
    We will use [raspap-webgui](https://github.com/billz/ 'https://github.com/billz/'){target=\_blank} package to Manage our WiFi connections with simple Web-ui
    Let's use the **Quick Interactive RaspAP Install** script
    ```bash
    curl -sL https://install.raspap.com | bash
    ```
    ```bash
    lighttpd root: /var/www/html? - Y 
    Complete installation with these values? - Y
    Enable HttpOnly for session cookies (Recommended)? - Y
    Enable RaspAP control service (Recommended)? = Y
    Install ad blocking and enable list management? - n
    Install OpenVPN and enable client configuration? - n
    The system needs to be rebooted as a final step. Reboot now? - Y
    ```
    After the reboot at the end of the installation the wireless network will be configured as an access point as follows:
    ### Default SSID Information
    ```bash
    SSID: raspi-webgui  
    IP address: 10.3.141.1  
    DHCP range: 10.3.141.50 to 10.3.141.255  
    Password: ChangeMe  
    ```
    ### Default WEB-UI Information
    ```bash
    Web-Ui: [http://10.3.141.1/](http://10.3.141.1/){target=_blank}  
    Username: admin  
    Password: secret  
    For this guide we will use the default gateway address of **10.3.141.1** and the gateway **DHCP range**
    Login to the Web-Ui: [http://10.3.141.1/](http://10.3.141.1/){target=\_blank}.
    ```
    ### warning
    Change the Default web-ui Credentials
    <div style="width:80%; margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/webui-authentication.png" alt="webui-authentication">
    </div>
    ### Configuration with One Wireless Interface
    ```bash
    If you raspberry pi as only **one wireless** interface the default RaspAP configuration of the host sport is great.  
    The only think you should to in the interface is to change the SSD, PSK
    ```
    <div style="margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/wlan0_hotspot.png" alt="wlan0 hotspot">
    </div>
    ### Configuration with Two Wireless Interface
    If you raspberry pi as only **two wireless** interface we need to set  
    **wlan1 as Hotspot**  
    **wlan0 as WiFi Client**  
    Set the Hotspot with interface **wlan1**
    <div style="width:80%; margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/wlan1_hotspost.png" alt="wlan1 hotspot">
    </div>
    Connect to known WiFi make sure the interface is set to wlan0
    <div style="width:80%; margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/wlan0_wifiClient.png" alt="wlan0 hotspot">
    </div>
    ## Tor Service
    Install tor service
    ```bash
    sudo apt install -y tor
    ```
    delete the default torrc config
    ```bash
    sudo rm -rf /etc/tor/torrc
    ```
    Create new torrc and edit it
    ```bash
    sudo nano /etc/tor/torrc
    ```
    Add the lines below to torrc
    ```bash
    VirtualAddrNetwork 10.192.0.0/10
    AutomapHostsSuffixes .onion,.exit
    AutomapHostsOnResolve 1
    TransPort 10.3.141.1:9040
    TransListenAddress 10.3.141.1
    DNSPort 10.3.141.1:53
    DNSListenAddress 10.3.141.1
    ```
    **Optional** add this to rotate the exit node every 10 seconds
    ```bash
    CircuitBuildTimeout 10
    LearnCircuitBuildTimeout 0
    MaxCircuitDirtiness 10
    ```
    <div style="width:60%; margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/torrc.png" alt="torrc">
    </div>
    Start and enable Tor Service a boot
    ```bash
    sudo systemctl start tor.service
    sudo systemctl enable tor.service
    ```
    make sure the tor service started currently as in screen bellow:
    ```bash
    sudo netstat -plnt
    ```
    <div style="margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/netstat_tor.png" alt="netstat tor">
    </div>
    ### Bug
    ```bash
    There is a bug that Tor Service won't load at boot because of all the interfaces changes.  
    The solution is to install **Monit**. Monit Will load the tor Tor Service as soon as it can.  
    It will also reload it if it will crash
    ### Install Monit
    ```bash
    sudo apt install monit
    ```
    Edit Monit Config
    ```bash
    sudo nano /etc/monit/monitrc
    ```
    Add those lines to the end of the config:
    ```bash
    check process gdm with pidfile /var/run/tor/tor.pid
       start program = "/etc/init.d/tor start"
       stop program = "/etc/init.d/tor stop"
    ```
    Reload and add Monit to startup:
    ```bash
    sudo systemctl restart monit
    sudo systemctl enable monit
    ```
    ### warning
    ```bash
    Be Patient!!!  
    With my Pi2 full startup may take up to 3 minutes
    ```
    ## Configure iptables firewall rules
    Its time to firewall the traffic to specific port
    -   Allow port 22,80 from any interface to allow access to ssh and the web-ui
    -   Route all DNS traffic from wlan1 to internal port 53
    -   Route all other wlan1 tcp traffic via tor proxy on port 9040
    ### Bug
    ```bash
    There is a bug that Raspap overwrites iptables rules at boot.  
    The solution is to install make a bash script with iptables rules  
    to Run on startup with delay of 30 seconds.
    ```
    lets create the script **iptablesOnBoot.sh**
    ```bash
    sudo nano /iptablesOnBoot.sh
    ```
    Copy One of the following config files:
    ### Config for One Wireless Interface with Hotspot on wlan0
    ```bash
    #!/bin/bash
    sudo iptables -F && sudo iptables -t nat -F
    sudo iptables -t nat -A PREROUTING -p tcp --dport 22 -j REDIRECT --to-ports 22
    sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 80
    sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53
    sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040
    sudo iptables -t nat -A POSTROUTING -j MASQUERADE
    sudo iptables -t nat -A POSTROUTING -s 192.168.50.0/24 ! -d 192.168.50.0/24 -j MASQUERADE
    sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
    ```
    ### Config for Two Wireless Interface with Hotspot on wlan1
    ```bash
    #!/bin/bash
    sudo iptables -F && sudo iptables -t nat -F
    sudo iptables -t nat -A PREROUTING -p tcp --dport 22 -j REDIRECT --to-ports 22
    sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 80
    sudo iptables -t nat -A PREROUTING -i wlan1 -p udp --dport 53 -j REDIRECT --to-ports 53
    sudo iptables -t nat -A PREROUTING -i wlan1 -p tcp --syn -j REDIRECT --to-ports 9040
    sudo iptables -t nat -A POSTROUTING -j MASQUERADE
    sudo iptables -t nat -A POSTROUTING -s 192.168.50.0/24 ! -d 192.168.50.0/24 -j MASQUERADE
    sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
    ```
    Make the script executable
    ```bash
    sudo chmod +x /iptablesOnBoot.sh
    ```
    Now lets add it to Crontab to execute after login
    ```bash
    sudo crontab -e
    ```
    Add to the end of crontav file
    ```bash
    @reboot sleep 20 && /iptablesOnBoot.sh
    ```
    After reboot iptables rules should be like this
    ```bash
    sudo iptables -t nat -L
    ```
    <div style="margin:0 auto">
       <img src="/assets/images/RaspberryPi/torPi/iptables.png" alt="iptables">
    </div>
    ## Testing
    ### warning
    Be Patient!!!  
    Start up after reboot may take up to 3 minutes for everything to work as it should
    Well Thats about it, you should be able to connect the the Hotspot and gain tor network.  
    You can test that you are on the Tor network at [https://check.torproject.org/](https://check.torproject.org/){target=\_blank}

