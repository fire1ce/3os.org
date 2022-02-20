---
description: Auto DSM config backup with local script
---

# Auto DSM Config Backup

Since synology's dms doesn't provide any auto-backup for it's configuration i've made a smile script that can be run at from the "Task Scheduler".
The script invokes synoconfbkp cli command that will dump the config file to provided folder. I use dropbox's folder in my case (This will sync my files to DropBox account). It append a date and hostname.
It also checks the same folder for files older of 60 days and deletes them so your storage won't be flooded with files from older than 2 month.
I've scheduled the script to run ounces a day with the "Task Scheduler"

To use it create new Task Scheduler choose a scheduler append the script to "Run Command" at "Task Settings" don't forget to change to destinations.

```script
synoconfbkp export --filepath=/volume1/activeShare/Dropbox/SettingsConfigs/synologyConfigBackup/$(hostname)_$(date +%y%m%d).dss && find /volume1/activeShare/Dropbox/SettingsConfigs/synologyConfigBackup -type f -mtime +60 -exec rm -f {} \;
```
