---
title: Free Port 53 on Ubuntu
description: Disable the systemd-resolved local DNS stub safely so another local DNS service can bind to port 53.
template: comments.html
tags: [ubuntu, dns, systemd-resolved]
---

# Free Port 53 on Ubuntu

Ubuntu commonly runs the `systemd-resolved` DNS stub on `127.0.0.53:53`. If Pi-hole, AdGuard Home, or another local DNS server must bind to port 53, disable only the stub listener and keep `systemd-resolved` available for upstream DNS information.

## Confirm what owns port 53

```shell
sudo ss -luntp | grep ':53 '
resolvectl status
```

Do not continue until the output confirms that `systemd-resolved` is the conflicting listener. A different service needs a different fix.

## Disable the stub listener

Use a drop-in instead of editing the vendor configuration in place:

```shell
sudo mkdir -p /etc/systemd/resolved.conf.d
sudo editor /etc/systemd/resolved.conf.d/disable-stub.conf
```

Add:

```ini
[Resolve]
DNSStubListener=no
```

When the stub is disabled, `/etc/resolv.conf` must not keep pointing at the stub file. Point it at the resolver-maintained file containing known upstream DNS servers:

```shell
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
sudo systemctl restart systemd-resolved
```

## Verify before installing the new DNS service

```shell
sudo ss -luntp | grep ':53 ' || true
readlink -f /etc/resolv.conf
resolvectl status
getent hosts example.com
```

Port 53 should now be free, `/etc/resolv.conf` should resolve to `/run/systemd/resolve/resolv.conf`, and normal DNS lookup should still work.

Install or start the replacement DNS service only after these checks pass. Then repeat the socket and lookup tests.

## Undo the change

```shell
sudo rm /etc/systemd/resolved.conf.d/disable-stub.conf
sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
sudo systemctl restart systemd-resolved
```

Confirm that `127.0.0.53:53` is listening again.

## Sources

- [`resolved.conf`: `DNSStubListener=`][resolved-conf]
- [`systemd-resolved`: `/etc/resolv.conf` modes][systemd-resolved]
- [`resolvectl` reference][resolvectl]

<!-- appendices -->

[resolved-conf]: https://www.freedesktop.org/software/systemd/man/latest/resolved.conf.html
[systemd-resolved]: https://www.freedesktop.org/software/systemd/man/latest/systemd-resolved.service.html
[resolvectl]: https://www.freedesktop.org/software/systemd/man/latest/resolvectl.html

<!-- end appendices -->
