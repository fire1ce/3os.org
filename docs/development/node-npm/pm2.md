---
title: PM2 - Node.js Process Manager
description: Cheat sheet for PM2. PM2 is a daemon process manager that will help you manage your Node.js applications.
template: comments.html
tags: [npm, node, pm2, cheat-sheet, process-manager]
---

# PM2 - Node.js Process Manager

PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.

Follow the official documentation for installation and usage instructions:  
[PM2 Official Documentation][pm2-official-documentation-url]{target=\_blank}

## Installation

The latest PM2 version is installable with NPM or Yarn:

```shell
npm install pm2@latest -g
# or
yarn global add pm2
```

## Start An Application With PM2

The simplest way to start, daemonize and monitor your application is by using this command line:

```shell
pm2 start app.js
```

## Start Application With Detailed Time For Logs

```bash
pm2 start app.js --log-date-format "YYYY-MM-DD HH:mm:ss"
```

## Managing Processes

Managing application state is simple here are the commands:

```shell
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name
```

## Save Configuration of Processes to PM2

And to freeze a process list for automatic respawn:

```shell
pm2 save
```

## List Managed Applications

List the status of all application managed by PM2:

```shell
pm2 [list|ls|status]
```

![PM2 List Image][pm2-list-img]

## Display Logs

To display logs in realtime for all processes managed by PM2, use the following command:

```shell
pm2 logs
```

To display logs in realtime for all processes managed by PM2, for last 200 lines use the following command:

```shell
pm2 logs --lines 200
```

To display logs in realtime for specific process, use the following command:

```shell
pm2 logs <app_name>/<id>
```

To display logs in realtime for specific process, for last 200 lines use the following command:

```shell
pm2 logs <app_name>/<id> --lines 200
```

## Auto Startup PM2

Restarting PM2 with the processes you manage on server boot/reboot is critical. To solve this, just run this command to generate an active startup script:

```shell
pm2 startup
```

## Auto Startup PM2 on Raspberry Pi

When using PM2 on [Raspberry Pi][amazon-rasberry-pi-url]{target=\_blank}. You will encounter a problem when you try to start pm2 with the default command.

```bash
sudo env PATH=$PATH:/usr/local/bin pm2 startup systemd -u pi --hp /home/pi
```

## Updating PM2

It's very useful to update PM2 to the latest version specially when you update your Node.js version. Since updating node usually will brake the pm2 process to function properly, you can use the following command to update PM2:

```shell
npm install pm2@latest -g
```

Then update the in-memory PM2:

```shell
pm2 update
```

You can also create a `alias` to update PM2 with one command:

```shell
alias pm2update='npm install pm2@latest -g && pm2 update && pm2 save'
```

<!-- appendices -->

[pm2-list-img]: /assets/images/814c798a-ab67-11ec-b95c-3b6db8d32176.png 'pm2 list image'
[pm2-official-documentation-url]: https://pm2.keymetrics.io/docs/usage/quick-start/ 'PM2 Official Documentation'
[amazon-rasberry-pi-url]: https://amzn.to/3Le9zGq 'Amazon Raspberry Pi'

<!-- end appendices -->
