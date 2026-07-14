---
title: Supervisor Process Manager Cheat Sheet
description: Install and configure Supervisor, manage UNIX processes with supervisorctl, reload configuration, and inspect process logs.
template: comments.html
tags: [python, supervisor, process-manager, cheat-sheet]
---

# Supervisor Process Manager Cheat Sheet

Supervisor is a client/server process-control system for UNIX-like operating systems. `supervisord` runs the managed processes and `supervisorctl` controls them.

## Install Supervisor

The official Python package can be installed with pip:

```shell
python3 -m pip install supervisor
```

Supervisor can also be installed inside a Python virtual environment. Distribution packages may include service-manager integration, but their paths and versions are controlled by the distribution.

Verify the installed commands:

```shell
supervisord --version
supervisorctl --help
```

## Create a Configuration

Generate the sample configuration in the current directory:

```shell
echo_supervisord_conf > supervisord.conf
```

Always pass an absolute configuration path when the file is not in a standard location:

```shell
supervisord -c /absolute/path/to/supervisord.conf
supervisorctl -c /absolute/path/to/supervisord.conf status
```

Using an absolute path also prevents Supervisor from finding an unexpected `supervisord.conf` in the current directory.

## Minimal Local Example

Create a `logs` directory next to the configuration, then use paths that exist on the machine:

```ini
[unix_http_server]
file=%(here)s/supervisor.sock
chmod=0700

[supervisord]
logfile=%(here)s/supervisord.log
pidfile=%(here)s/supervisord.pid
childlogdir=%(here)s/logs

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix://%(here)s/supervisor.sock

[program:example]
command=/absolute/path/to/python /absolute/path/to/app.py
directory=/absolute/path/to/project
autostart=true
autorestart=true
stdout_logfile=%(here)s/logs/example.out.log
stderr_logfile=%(here)s/logs/example.err.log
```

The `%(here)s` expression expands to the directory containing the configuration file.

!!! warning

    The optional TCP web server is unencrypted and has no authentication by default. Never expose it to the public internet. A local UNIX socket is enough for this guide.

## Manage Processes

```shell
supervisorctl -c /absolute/path/to/supervisord.conf status
supervisorctl -c /absolute/path/to/supervisord.conf start example
supervisorctl -c /absolute/path/to/supervisord.conf stop example
supervisorctl -c /absolute/path/to/supervisord.conf restart example
supervisorctl -c /absolute/path/to/supervisord.conf tail -f example
```

`restart` does not reread the configuration.

After editing the configuration, run:

```shell
supervisorctl -c /absolute/path/to/supervisord.conf reread
supervisorctl -c /absolute/path/to/supervisord.conf update
```

`reread` detects changes without restarting processes. `update` applies added, removed or changed process groups and restarts affected programs.

## Sources

- [Supervisor installation](https://supervisord.org/installing.html)
- [Supervisor configuration](https://supervisord.org/configuration.html)
- [Running supervisord and supervisorctl](https://supervisord.org/running.html)
