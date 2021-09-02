---
description: how to Declare Locations as "Inside Your Local Network"
---

# Declare Locations as "Inside Your Local Network"

!!! warning
    The Intranet Zone is the most trusted and least protected zone. DO NOT put any subnets or IP addresses in this zone unless they are TOTALLY under YOUR control. That includes ANY public server, web site, subnet, or IP address.

* Select 'Control Panel'/'Internet Properties'/'Security' tab. (Alternatively, open Internet Explorer and select 'Tools'/'Internet Options'/'Security' tab.)

* Highlight 'Local Intranet' and click 'Sites'.

* Set the following: Uncheck 'Automatically detect intranet network'.Check 'Include all local (intranet) sites not listed in other zones'.Uncheck 'Include all sites that bypass the proxy server'.Check 'Include all network paths (UNCs)'.​

* Click 'Advanced'

* Uncheck 'Require server verification (https:) for all sites in this zone'.

* In the field labeled 'Add this web site to the zone:', add your local, private subnet using an asterisk for a network mask and click 'Add'. E.g. If your home (local) network is 192.168.25.0 with a mask of 255.255.255.0, enter '192.168.25.*' (without the quotes).

!!! note
    Entries can be:​

    * Individual IP addresses (e.g. '192.168.5.25', etc.),
    * Class C subnets (e.g. '192.168.27.*'),
    * Class B subnets (e.g. '172.16.*.*'), or
    * Class A subnets (e.g. '10.*.*.*')​

You can add as many addresses as you need to the list
It can be handy add the address of a VPN subnet to the list if it is also private and you TOTALLY trust it.​

* Close out with 'Close'/'OK'/'OK' and close the Control Panel (or Internet Explorer).
