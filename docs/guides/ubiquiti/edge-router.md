---
description: Ubiquiti EdgeRouter useful commands tips and tricks
---

# EdgeRouter

## Clear DNS Forwarding Cache via SSH Call

```bash
ssh user@192.168.1.1 'sudo /opt/vyatta/bin/sudo-users/vyatta-op-dns-forwarding.pl --clear-cache'
```

## SSH via RSA keys

SSH to the Edge Router:
Copy the public key to /tmp folder

Run:

```bash
configure
loadkey [your user] /tmp/id_rsa.pub
```

Check that the keys are working by opening new session

Disable Password Authentication

```bash
set service ssh disable-password-authentication
commit ; save
```

Done.

Enable Password Authentication if needed.

```bash
delete service ssh disable-password-authentication
```

## Hardening EdgeRouter

This will change the GUI to port 8443, disable old cyphers, Only will listen on internal Network.
assuming your EdgeRouter IP is 192.168.1.1, if not change it accordingly.

SSH to the Edge Router

```bash
configure
set service gui listen-address 192.168.100.1
set service gui https-port 8443
set service gui older-ciphers disable
set service ssh listen-address 192.168.100.1
set service ssh protocol-version v2
set service ubnt-discover disable
commit ; save
```

## Hardware Offloading

For **Devices: ER-X / ER-X-SFP / EP-R6**
Enable _hwnat_ and _ipsec_ offloading.

```bash
configure

set system offload hwnat enable
set system offload ipsec enable

commit ; save
```

Disable _hwnat_ and _ipsec_ offloading.

```bash
configure

set system offload hwnat disable
set system offload ipsec disable

commit ; save
```

For **Devices: ER-4 / ER-6P / ERLite-3 / ERPoE-5 / ER-8 / ERPro-8 / EP-R8 / ER-8-XG**
Enable IPv4/IPv6 and ipsec offloading.

```bash
configure

set system offload ipv4 forwarding enable
set system offload ipv4 gre enable
set system offload ipv4 pppoe enable
set system offload ipv4 vlan enable

set system offload ipv6 forwarding enable
set system offload ipv6 pppoe enable
set system offload ipv6 vlan enable

set system offload ipsec enable

commit ; save
```

Disable IPv4/IPv6 and ipsec offloading.

```bash
configure

set system offload ipv4 forwarding disable
set system offload ipv4 gre disable
set system offload ipv4 pppoe disable
set system offload ipv4 vlan disable

set system offload ipv6 forwarding disable
set system offload ipv6 pppoe disable
set system offload ipv6 vlan disable

set system offload ipsec disable

commit ; save
```

## Disable, Update /etc/hosts file on EdgeRouter

Disable Auto DHCP hots:

```bash
configure
set service dhcp-server hostfile-update disablecommit
commit ; save
```

Update the Host File Manually:

```bash
configure
set system static-host-mapping host-name mydomain.com inet 192.168.1.10
commit ; save
```

Show DNS Forwarding 

```bash
configure
show service dns forwarding
```

Show Hosts Config

```bash
cat /etc/hosts
```


## Guest Wifi With Ubiquiti EdgeRouter and Unifi Access Points

### EdgeRouter Configuration

From the Dashboard, click Add Interface and select VLAN.

![Interface](/assets/images/ubiquiti/guestWifi/01.Interface.png)

Set up the VLAN ID as You like for this example will use id **1003** and attach it to the physical interface of your LAN. Give it an IP address in the range of a private IP block, but make sure you end it in a /24 to specify the proper subnet (I originally did /32 as I though it was supposed to be the exact IP address).

![vlan](/assets/images/ubiquiti/guestWifi/02.vlan.png)

Click on the Services tab. Click Add DHCP Server. Set it up similar to the image below.

![DHCP](/assets/images/ubiquiti/guestWifi/03.DHCP.png)

Click on the DNS tab under services. Click Add Listen interface and select the VLAN interface. Make sure you hit save.

![dns](/assets/images/ubiquiti/guestWifi/04.dns.png)

At this point, you should be able to connect to your Guest Network and connect to the Internet. However, you’ll be able to access the EdgeRouter as well as other devices on your LAN. Next thing you have to do is secure the VLAN.

Click on Firewall/NAT and then click on Add Ruleset. This is for packets coming into the router destined for somewhere else (not the router). Set up the default policy for Accept. Click Save.

![firewall rules](/assets/images/ubiquiti/guestWifi/05.firewall01.png)

From the Actions menu next to the Ruleset, click Interfaces.

![firewall rules](/assets/images/ubiquiti/guestWifi/06.firewall02.png)

Select your VLAN interface and the in direction.

![firewall rules](/assets/images/ubiquiti/guestWifi/07.firewall03.png)

Click Rules and then Add New Rule. Click on Basic and name it LAN. Select Drop as the Action.

![firewall rules](/assets/images/ubiquiti/guestWifi/08.firewall04.png)

Click Destination and enter 10.0.1.0/24 or whatever your LAN IP range is. Then click Save. This will drop all packets from the VLAN destined for your LAN. Save.

![firewall rules](/assets/images/ubiquiti/guestWifi/09.firewall05.png)

Repeat 1 and 2 above (name it GUEST_LOCAL). From the Interface, select the VLAN interface and the local direction. However, set up the default policy as Drop.

Add a new rule. Set it to Accept on UDP port 53.

![firewall rules](/assets/images/ubiquiti/guestWifi/10.firewall06.png)
![firewall rules](/assets/images/ubiquiti/guestWifi/11.firewall07.png)

Save.
Let's continue to set up the Uifi AP

### Unifi Configuration

If you want to limit your Guest Users Bandwidth, head over to User Groups and create a new user group called Guest.
Enter bandwidth limits that are appropriate for your Internet Speed. I used 6000 down and 2500 up.

![Unifi_limit](/assets/images/ubiquiti/guestWifi/12.Unifi_limit.png)

Now go to the Wireless Networks section and create a new network called “Guest” or whatever you want to call it.

Make sure it is enabled, give it WiFi security key, check the “Guest Policy” option, enter the VLAN **Id you used previously** and choose the Guest User Group. Save!

![Unifi_SSDID](/assets/images/ubiquiti/guestWifi/13.Unifi_SSDID.png)

Done. Test Your New Guest Wifi by connecting to the Guest Wifi and browse to a website.

## EdgeRouter OpenVPN Configuration 443/TCP

This Guide is based on [Original guide form ubnt support](https://help.ubnt.com/hc/en-us/articles/115015971688-EdgeRouter-OpenVPN-Server) with modifications to the VPN port and protocol

For the purpose of this article, it is assumed that the routing and interface configurations are already in place and that reachability has been tested.

ssh to the EdgeRouter

Make sure that the date/time is set correctly on the EdgeRouter.

```bash
show date
Thu Dec 28 14:35:42 UTC 2017
```

Log in as the root user.

```bash
sudo su
```

Generate a Diffie-Hellman (DH) key file and place it in the /config/auth directory. This Will take some time...

```bash
openssl dhparam -out /config/auth/dh.pem -2 4096
```

Change the current directory.

```bash
cd /usr/lib/ssl/misc
```

Generate a root certificate (replace <secret> with your desired passphrase).

```bash
./CA.pl -newca
```

exmaple:

PEM Passphrase: <secret>
Country Name: `US`
State Or Province Name: `New York`
Locality Name: `New York`
Organization Name: `Ubiquiti`
Organizational Unit Name: `Support`
Common Name: `root`
Email Address: `support@ubnt.com`

**`NOTE: The Common Name needs to be unique for all certificates.`**

Copy the newly created certificate + key to the /config/auth directory.

```bash
cp demoCA/cacert.pem /config/auth
cp demoCA/private/cakey.pem /config/auth
```

Generate the server certificate.

```bash
./CA.pl -newreq
```

exmaple:

Country Name: `US`
State Or Province Name: `New York`
Locality Name: `New York`
Organization Name: `Ubiquiti`
Organizational Unit Name: `Support`
Common Name: `server`
Email Address: `support@ubnt.com`

Sign the server certificate.

if you want to change the certificate expiration day use: export **default_days="3650"** with the value of days you desire

```bash
./CA.pl -sign
```

Move and rename the server certificate + key to the /config/auth directory.

```bash
mv newcert.pem /config/auth/server.pem
mv newkey.pem /config/auth/server.key
```

Generate, sign and move the client1 certificates.

```bash
./CA.pl -newreq
```

Common Name: client1

```bash
./CA.pl -sign
mv newcert.pem /config/auth/client1.pem
mv newkey.pem /config/auth/client1.key
```

(Optional) Repeat the process for client2.

```bash
./CA.pl -newreq
```

Common Name: client2

```bash
./CA.pl -sign
mv newcert.pem /config/auth/client2.pem
mv newkey.pem /config/auth/client2.key
```

Verify the contents of the /config/auth directory.

```bash
ls -l /config/auth
```

You should have those files:

* cacert.pem
* cakey.pem
* client1.key
* client1.pem
* client2.key
* client2.pem
* dh.pem
* server.key
* server.pem

Remove the password from the client + server keys. This allows the clients to connect using only the provided certificate.

```bash
openssl rsa -in /config/auth/server.key -out /config/auth/server-no-pass.key
openssl rsa -in /config/auth/client1.key -out /config/auth/client1-no-pass.key
openssl rsa -in /config/auth/client2.key -out /config/auth/client2-no-pass.key
```

Overwrite the existing keys with the no-pass versions.

```bash
mv /config/auth/server-no-pass.key /config/auth/server.key
mv /config/auth/client1-no-pass.key /config/auth/client1.key
mv /config/auth/client2-no-pass.key /config/auth/client2.key
```

Return to operational mode.

```bash
exit
```

Enter configuration mode.

```bash
configure
```

If EdgeRouter's Interface is on port 433, you must change it.

```bash
set service gui https-port 8443
commit ; save
```

Add a firewall rule for the OpenVPN traffic to the local firewall policy.

```bash
set firewall name WAN_LOCAL rule 30 action accept
set firewall name WAN_LOCAL rule 30 description OpenVPN
set firewall name WAN_LOCAL rule 30 destination port 443
set firewall name WAN_LOCAL rule 30 protocol tcp
```

Configure the OpenVPN virtual tunnel interface.
push-route - the router for vpn connection
name-server - default gateway of the route above

```bash
set interfaces openvpn vtun0 mode server
set interfaces openvpn vtun0 server subnet 172.16.1.0/24
set interfaces openvpn vtun0 server push-route 192.168.100.0/24
set interfaces openvpn vtun0 server name-server 192.168.100.1
set interfaces openvpn vtun0 openvpn-option --duplicate-cn
set interfaces openvpn vtun0 local-port 443
edit interfaces openvpn vtun0
set openvpn-option "--push redirect-gateway"
set protocol tcp-passive
commit ; save
```

Link the server certificate/keys and DH key to the virtual tunnel interface.

```bash
set interfaces openvpn vtun0 tls ca-cert-file /config/auth/cacert.pem
set interfaces openvpn vtun0 tls cert-file /config/auth/server.pem
set interfaces openvpn vtun0 tls key-file /config/auth/server.key
set interfaces openvpn vtun0 tls dh-file /config/auth/dh.pem
commit ; save
```

Add DNS forwarding to the new vlan vtun0 to get DNS resolving.

![DNS](/assets/images/ubiquiti/guestWifi/14.DNS_F.png)

### Exmaple for clinet.opvn Config

```bash
client
dev tun
proto udp
remote <server-ip or hostname> 443
float
resolv-retry infinite
nobind
persist-key
persist-tun
verb 3
ca cacert.pem
cert client1.pem
key client1.key
```

## EdgeRouter Free Up space by Cleaning Old Firmware

ssh to the EdgeRouter:

```bash
delete system image
```

## SpeedTest Cli on Edge Router

ssh to the Edge Router.  
installation:

```bash
curl -Lo speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
chmod +x speedtest-cli
```

run from the same directory:

```bash
./speedtest-cli --no-pre-allocate
```

based on [https://github.com/sivel/speedtest-cli](https://github.com/sivel/speedtest-cli 'speedtest-cli')

## Enable NetFlow on EdgeRouter to UNMS

The most suitable place to enable NetFlow is your Default gateway router. UNMS supports NetFlow version 5 and 9. UNMS only record flow data for IP ranges defined below. Whenever UNMS receives any data from a router, the status of NetFlow changes to `Active`.

To show interfaces and pick the right interface:\

```bash
show interfaces
```

Example configuration for EdgeRouter:

```bash
configure
set system flow-accounting interface pppoe0
set system flow-accounting ingress-capture post-dnat
set system flow-accounting disable-memory-table
set system flow-accounting netflow server 192.168.1.10 port 2055
set system flow-accounting netflow version 9
set system flow-accounting netflow engine-id 0
set system flow-accounting netflow enable-egress engine-id 1
set system flow-accounting netflow timeout expiry-interval 60
set system flow-accounting netflow timeout flow-generic 60
set system flow-accounting netflow timeout icmp 60
set system flow-accounting netflow timeout max-active-life 60
set system flow-accounting netflow timeout tcp-fin 10
set system flow-accounting netflow timeout tcp-generic 60
set system flow-accounting netflow timeout tcp-rst 10
set system flow-accounting netflow timeout udp 60
commit
save
```

10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,100.64.0.0/10
