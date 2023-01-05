---
title: Services & Daemons
description: Guide on how to use systemctl to manage services and daemons on your Linux system:
template: comments.html
tags: [linux, services, daemons]
---

# Services & Daemons

In Linux, a service is a program that runs in the background and performs a specific function. A daemon is a type of service that also runs in the background and often starts at boot time. These processes can be controlled using the systemctl or service command. Services and daemons are an important part of the Linux operating system, as they provide various functions and services that allow the system to run smoothly. There are many different types of services and daemons that can be found on a typical Linux system, and you can find more information about them in the documentation for your specific distribution.

## Useful `systemctl` commands

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

The systemctl command with the grep command will display a list of all running services and daemons on your Linux system. The grep command will search the output of systemctl for the string "running" and only display the lines that contain that string.

```shell
systemctl | grep running
```

For more readable output:

```shell
systemctl --no-pager | grep running | column -t
```

## Display Enabled Services

`systemctl list-unit-files --state=enabled` is a command that shows a list of unit files that are currently enabled on the system. The --state option specifies the state of the unit files that you want to see. By using --state=enabled, you will see only unit files that are enabled and will be started automatically when the system boots.

```shell
systemctl list-unit-files --state=enabled
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
