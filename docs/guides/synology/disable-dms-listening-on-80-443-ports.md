---
title: Disable DSM Listening on 80,443 Ports
description: Synology DSM Listening on 80,443 Ports
---

This will temporary free the 80, 443 ports until the next reboot

```bash
sed -i -e 's/80/81/' -e 's/443/444/' /usr/syno/share/nginx/server.mustache /usr/syno/share/nginx/DSM.mustache /usr/syno/share/nginx/WWWService.mustache

synoservicecfg --restart nginx
```

For president use, create a bash script for example `disableListeningPort80.443.sh`
with the about commands, add it to run in the DSM's Task Schedualer at boot.
