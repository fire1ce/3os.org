---
title: Supervisor Process Manager
description: Cheat sheet for Supervisor. Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems.
template: comments.html
tags: [python, supervisor, processes-manager, cheat-sheet]
---

# Supervisor Python Processes Management

Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. [Official Supervisord Docs][supervisord-docs-url]{target=\_blank}.

Example of Supervisord Web UI listening on localhost:9999

![Supervisord web ui][supervisord-web-ui]

## Tips of Supervisor Usage

Seeing all child processes running

```shell
supervisorctl -c /path/to/supervisord.conf
```

I find it helpful to create an alias in my bash profile for those 2 commands above so that I don't have to manually type `-c` all the time

Example:

```shell
echo "alias supervisord='supervisord -c /System/Volumes/Data/opt/homebrew/etc/supervisord.conf'"
echo "alias supervisorctl='supervisorctl -c /System/Volumes/Data/opt/homebrew/etc/supervisord.conf'"
```

### List All Processes

You need to provide the path to the supervisor configuration file with - **-c /path/to/supervisord.conf**

```shell
supervisorctl -c /System/Volumes/Data/opt/homebrew/etc/supervisord.conf
```

### Reload Changes from Config File to Supervisor

```shell
supervisorctl reread
```

### Update Supervisor Configuration

```shell
supervisorctl update
```

## MacOS Supervisor Installation

Install with pip as system package:

```shell
brew install supervisor
```

The default location of the supervisor configuration file is at `/System/Volumes/Data/opt/homebrew/etc/supervisord.conf`.

You can use a symbolic link to the configuration file to make it persistent. For example, you can move the configuration file to Dropbox folder and use a symbolic link to it.

Link the configuration file to the Dropbox folder:

```shell
rm -rf /System/Volumes/Data/opt/homebrew/etc/supervisord.conf
ln -s /Users/fire1ce/Dropbox/SettingsConfigs/supervisor/supervisord.conf /System/Volumes/Data/opt/homebrew/etc/supervisord.conf
```

### Start Supervisor Service on Boot

In order to start the supervisor service on boot, we need to create a service file for MacOS.

```shell
sudo nano /Library/LaunchDaemons/com.agendaless.supervisord.plist
```

Append the following content to the file:

```xml
<!-- /Library/LaunchDaemons/com.agendaless.supervisord.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>KeepAlive</key>
    <dict>
        <key>SuccessfulExit</key>
        <false/>
    </dict>
    <key>Label</key>
    <string>com.agendaless.supervisord</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/supervisord</string>
        <string>-n</string>
        <string>-c</string>
        <string>/System/Volumes/Data/opt/homebrew/etc/supervisord.conf</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

## Supervisor Configuration File Example With 2 Managed Processes:

```yaml
[unix_http_server]
file=/opt/homebrew/var/run/supervisor.sock # the path to the socket file


[inet_http_server] # inet (TCP) server disabled by default
port=127.0.0.1:9999 # ip_address:port specifier, *:port for all iface
# username=user # default is no username (open server)
# password=123  default is no password (open server)

[supervisord]
logfile=/opt/homebrew/var/log/supervisord.log # main log file# default $CWD/supervisord.log
logfile_maxbytes=50MB # max main logfile bytes b4 rotation# default 50MB
logfile_backups=10 # # of main logfile backups# 0 means none, default 10
loglevel=info # log level# default info# others: debug,warn,trace
pidfile=/opt/homebrew/var/run/supervisord.pid # supervisord pidfile# default supervisord.pid
nodaemon=false # start in foreground if true# default false
silent=false # no logs to stdout if true# default false
minfds=1024 # min. avail startup file descriptors# default 1024
minprocs=200 # min. avail process descriptors#default 200

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///opt/homebrew/var/run/supervisor.sock

[include]
files = /opt/homebrew/etc/supervisor.d/*.ini

[program:macos-bt-connect-based-on-ip]
command=/Users/fire1ce/.pyenv/versions/macos-bt-connect-based-on-ip/bin/python /Users/fire1ce/projects/macos-bt-connect-based-on-ip/macos-bt-connect-based-on-ip.py
directory=/Users/fire1ce/projects/macos-bt-connect-based-on-ip
user=fire1ce
autostart=true
autorestart=true
startsecs=2
startretries=3
stdout_logfile=/opt/homebrew/var/log/macos-bt-connect-based-on-ip.out.log
stdout_logfile_maxbytes=1MB # max # logfile bytes b4 rotation (default 50MB)
stdout_logfile_backups=5 # # of stdout logfile backups (0 means none, default 10)
stderr_logfile=/opt/homebrew/var/log/macos-bt-connect-based-on-ip.err.log
stderr_logfile_maxbytes=1MB # max # logfile bytes b4 rotation (default 50MB)
stderr_logfile_backups=5 # # of stderr logfile backups (0 means none, default 10)


[program:macos-screenlock-api]
command=/Users/fire1ce/.pyenv/versions/macos-screenlock-api/bin/python /Users/fire1ce/projects/macos-screenlock-api/macos-screenlock-api.py
directory=/Users/fire1ce/projects/macos-screenlock-api
user=fire1ce
autostart=true
autorestart=true
startsecs=2
startretries=3
stdout_logfile=/opt/homebrew/var/log/macos-screenlock-api.out.log
stdout_logfile_maxbytes=1MB # max # logfile bytes b4 rotation (default 50MB)
stdout_logfile_backups=5 # # of stdout logfile backups (0 means none, default 10)
stderr_logfile=/opt/homebrew/var/log/macos-screenlock-api.err.log
stderr_logfile_maxbytes=1MB # max # logfile bytes b4 rotation (default 50MB)
stderr_logfile_backups=5 # # of stderr logfile backups (0 means none, default 10)
```

<!-- appendices -->

[supervisord-web-ui]: /assets/images/58a43cfe-ab60-11ec-aa76-bf689f051be2.jpg 'Supervisor Web UI'
[supervisord-docs-url]: http://supervisord.org/# 'Supervisor Documentation'

<!-- end appendices -->
