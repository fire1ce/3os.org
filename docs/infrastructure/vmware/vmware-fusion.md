---
title: VMware Fusion
description: VMware Fusion Port Forwarding for Reverse Shells
template: comments.html
tags: [vmware, vmware-fusion]
---

# VMware Fusion

## Port Forwarding for Reverse Shells

If you use your vm as NAT network "Shared with My Mac" You can forward a port to your host macOS machine.

<div style="width:90%; margin:0 auto">
    <img src="../assets/images/penetration-testing/vmwareFusion/vmware_network.jpg" alt="vmware_network">
</div>

The network configuration files are stored their respective folders within the VMware Fusion preferences folder.

```bash
/Library/Preferences/VMware\ Fusion/
```

<div style="width:90%; margin:0 auto">
    <img src="../assets/images/penetration-testing/vmwareFusion/vmwarenetworks.jpg" alt="vmware networks">
</div>

In order to find the right network config you can inspect the **dhcpd.conf** inside of vmnet\* folders.

```bash
cat dhcpd.conf
```

After you found the correct network it should contain a **nat.conf** file
Edit the (with sudo privileges) **nat.conf**, For UDP protocol edit the section **[incomingudp]**
for TCP protocol edit the **[incomingtcp]**

In the next example we will forward port 4444 from VM to the 4444 port on the host.
You can foreword any port to any port as you like.

<div style="width:90%; margin:0 auto">
    <img src="../assets/images/penetration-testing/vmwareFusion/vmware_nat_config.jpg" alt="vmware nat config">
</div>

After you saved the configuration **nat.conf** file you must restart VMware's network services

!!! tip "You do NOT need to restart the Virtual Machine"

```bash
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start
```

If you want to test the port forwarding is working as it should here's an example of running simple python webserver on the vm on port 4444 we configured before:

```bash
python -m SimpleHTTPServer 4444
```

<div style="width:90%; margin:0 auto">
    <img src="../assets/images/penetration-testing/vmwareFusion/pythonServerExmaple.jpg" alt="python server on port 4444">
</div>

Now you can test it on the Host machine by browsing to `http://localhost:4444` or `http://127.0.0.1:4444`

<div style="width:90%; margin:0 auto">
    <img src="../assets/images/penetration-testing/vmwareFusion/host.jpg" alt="localhost forwarding">
</div>
