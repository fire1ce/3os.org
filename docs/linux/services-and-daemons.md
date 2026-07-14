---
title: Services & Daemons
description: Cheat sheet for managing Linux services and daemons with systemctl, including status, start, stop, restart, enable, and disable commands.
template: comments.html
tags: [linux, services, daemons]
---

# Services & Daemons

In Linux, services and daemons run in the background to provide system functions. On distributions that use systemd, the `systemctl` command manages their runtime state and boot behavior.

## Useful `systemctl` Commands

Start the specified service.

```shell
systemctl start <service>
```

Stop the specified service.

```shell
systemctl stop <service>
```

Restart the specified service.

```shell
systemctl restart <service>
```

Enable the specified service to start automatically at boot time.

```shell
systemctl enable <service>
```

Disable the specified service from starting automatically at boot time.

```shell
systemctl disable <service>
```

Show the current status and runtime information for the specified service.

```shell
systemctl status <service>
```

Show the dependencies for the specified service.

```shell
systemctl list-dependencies <service>
```

List all installed unit files on the system.

```shell
systemctl list-units --all
```

## Display Running Services

Filter the `systemctl` output to display running services and daemons:

```shell
systemctl | grep running
```

Format the same output as aligned columns:

```shell
systemctl --no-pager | grep running | column -t
```

## Display Enabled Services

List the unit files that are enabled to start automatically at boot:

```shell
systemctl list-unit-files --state=enabled
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
