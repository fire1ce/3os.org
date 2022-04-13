# Proxmox Networking

## Network Interface Configurations

Static Example

```config
auto ens33
iface ens33 inet static
           address 192.168.0.10
           netmask 255.255.255.0
           dns-nameservers 192.168.0.1
           gateway 192.168.0.1
```

DHCP Example

```config
auto eth0
iface eth0 inet dhcp
```

Bridge: Static Example

```config
auto vmbr0
iface vmbr0 inet static
        address 192.168.100.20/24
        gateway 192.168.100.1
        bridge-ports eth0
        bridge-stp off
        bridge-fd 0
```

Bridge: DHCP Example

```config
auto vmbr0
iface vmbr0 inet dhcp
        bridge-ports eth0
        bridge-stp off
        bridge-fd 0
```
