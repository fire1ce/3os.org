---
title: Synology DSM Guides & Tips
description: Synology DSM Guides & Tips
---

## Disable DSM Listening on 80,443 Ports

```bash
sed -i -e 's/80/81/' -e 's/443/444/' /usr/syno/share/nginx/server.mustache /usr/syno/share/nginx/DSM.mustache /usr/syno/share/nginx/WWWService.mustache

synoservicecfg --restart nginx
```

## Installing VM Tools on Linux VM

On Debian:

```bash
sudo add-apt-repository universe
sudo apt-get install qemu-guest-agent
```

On CentOS 7:

```bash
yum install -y qemu-guest-agent
```

On CentOS 8:

```bash
dnf install -y qemu-guest-agent
```

## Auto DSM Config Backup

Since synology's dms doesn't provide any auto-backup for it's configuration i've made a smile script that can be run at from the "Task Scheduler".
The script invokes synoconfbkp cli command that will dump the config file to provided folder. I use dropbox's folder in my case (This will sync my files to DropBox account). It append a date and hostname.
It also checks the same folder for files older of 60 days and deletes them so your storage won't be flooded with files from older than 2 month.
I've scheduled the script to run ounces a day with the "Task Scheduler"

To use it create new Task Scheduler choose a scheduler append the script to "Run Command" at "Task Settings" don't forget to change to destinations.

```script
synoconfbkp export --filepath=/volume1/activeShare/Dropbox/SettingsConfigs/synologyConfigBackup/$(hostname)_$(date +%y%m%d).dss && find /volume1/activeShare/Dropbox/SettingsConfigs/synologyConfigBackup -type f -mtime +60 -exec rm -f {} \;
```

## Install __zsh__ and __oh my zsh__

Add community package source to package center
Open package center -> preference. Now we are at General tab. Allow install package from Synology Inc. and trusted publishers.

Switch to Package Sources tab and add the source of synocommunity: http://packages.synocommunity.com

Now you can see a list of packages in the Community tab

Install zsh from package center
Simply search and install zsh from package center. Package name
"Z shell".

Change shell when ssh login
It is not safe to edit /etc/passwd to set default shell, since in DSM cannot use chsh command, so I found a trick to switch shell as long as you ssh login

Locate zsh's location:

```bash
which zsh
```

The default shell on DSM was ash when ssh into, edit ~/.profile append the codes below with the zsh location:

```bash
if [[ -x /usr/local/bin/zsh ]]; then
  export SHELL=/usr/local/bin/zsh
  exec /usr/local/bin/zsh
fi
```

Now logout and login again, shell should be zsh

Install oh my zsh
To install oh my zsh, you need git, you can install git from package center. Simply search git and choose "Git Server" to install

Then according to https://github.com/robbyrussell/oh-my-zsh, you can have it.