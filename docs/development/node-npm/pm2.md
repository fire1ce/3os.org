---
title: PM2 Node.js Process Manager Cheat Sheet
description: Install PM2, start and manage Node.js applications, view logs, restore processes after reboot, and update PM2 safely.
template: comments.html
tags: [npm, node, pm2, cheat-sheet, process-manager]
---

# PM2 Node.js Process Manager Cheat Sheet

PM2 is a process manager for keeping applications running and controlling them from one CLI.

## Install PM2

Node.js and npm must already be installed:

```shell
npm install pm2@latest -g
pm2 --version
```

## Start an Application

```shell
pm2 start app.js --name my-app
```

PM2 can also start an ecosystem file:

```shell
pm2 start ecosystem.config.js
```

## Manage Processes

```shell
pm2 list
pm2 describe my-app
pm2 restart my-app
pm2 reload my-app
pm2 stop my-app
pm2 delete my-app
```

Use the process name or the numeric ID shown by `pm2 list`.

## View Logs

Show all live logs:

```shell
pm2 logs
```

Show one application's logs and include the last 200 lines:

```shell
pm2 logs my-app --lines 200
```

Use `Ctrl+C` to leave the live log view; this does not stop the application.

## Restore Processes After Reboot

Ask PM2 to detect the init system:

```shell
pm2 startup
```

PM2 prints a command containing the correct user, home directory and Node.js path. Copy and run the command it prints instead of using a hard-coded command from another machine.

Start every application that should return after reboot, then save the current list:

```shell
pm2 save
```

Restore a saved list manually:

```shell
pm2 resurrect
```

Remove the startup configuration:

```shell
pm2 unstartup
```

## Update PM2

```shell
npm install pm2@latest -g
pm2 update
```

After changing the installed Node.js version, regenerate the startup script so that it uses the new Node.js path:

```shell
pm2 unstartup
pm2 startup
```

Run the command printed by each operation, then save the process list again if it changed.

## Sources

- [PM2 Quick Start](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [PM2 Startup Script](https://pm2.keymetrics.io/docs/usage/startup/)
- [Update PM2](https://pm2.keymetrics.io/docs/usage/update-pm2/)
