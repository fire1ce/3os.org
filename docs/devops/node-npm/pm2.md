---
description: PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.
---

# PM2 - Node.js Process Manager

PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.

Follow the official documentation for installation and usage instructions:  
[PM2 Official Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

## Start process with detailed time for logs

```bash
pm2 start app.js --log-date-format "YYYY-MM-DD HH:mm:ss"
```

## Auto startup at boot pm2 for raspberry pi

```bash
sudo env PATH=$PATH:/usr/local/bin pm2 startup systemd -u pi --hp /home/pi
```
