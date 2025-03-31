---
title: Snippets
description: OpenWrt Snippets with useful commands and scripts. Best practices and tips.
template: comments.html
tags: [OpenWrt, Snippets, Tips]
---

# Snippets and Tips

OpenWrt Snippets with useful commands and scripts. Best practices and tips.

## Update all packages on OpenWrt from SSH

```shell
opkg update && opkg list-upgradable | cut -f 1 -d ' ' | xargs opkg upgrade
```

## Enable LuCI HTTPS redirect from HTTP

This will activate the HTTPS redirect from HTTP in LuCI.

```shell
uci set uhttpd.main.redirect_https=1
uci commit uhttpd
service uhttpd reload
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
