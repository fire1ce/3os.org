---
title: SMB Mount With autofs
description: Using autofs to mount SMB shares on Linux systems.
template: comments.html
tags: [smb, share, autofs, mount]
---

# SMB Mount With autofs

Install autofs cifs-utils

```shell
apt install -y autofs cifs-utils
```

Eddit auto.cifs file

```shell
nano /etc/auto.cifs
```

Add this to the file: ("media" - is any name for your mount)

```shell
media    -fstype=cifs,rw,noperm,vers=3.0,credentials=/etc/.credentials.txt    ://oscar.3os.re/active-share/media
```

Create credentials file

```shell
nano /etc/.credentials.txt
```

Add you credentials for the smb mount:

```shell
username=YourUser
password=YourPassword
```

Exit and save:

```shell
nano /etc/auto.master
```

At the end of the file add: ("/mnt" - mount location, /etc/auto.cifs your config for mounting the SMB Share)

```shell
/mnt    /etc/auto.cifs --timeout=600 --ghost
```

Save end exit.
Test the mounting.

```shell
systemctl start autofs
cd /mnt/media/
ls
```

You should see the mount over there.
Enable autofs on boot:

```shell
systemctl enable autofs
```

## SMB Mount on Linux With Credentials

```shell
sudo apt-get install cifs-utils
nano ~/.smbcredentials
```

add this to the config.

```shell
username=msusername
password=mspassword
```

Save the file, exit the editor.
Change the permissions of the file to prevent unwanted access to your credentials:

```shell
chmod 600 ~/.smbcredentials
```

Then edit your /etc/fstab file (with root privileges) to add this line (replacing the insecure line in the example above, if you added it):

```shell
//servername/sharename /media/windowsshare cifs vers=1.0,credentials=/home/ubuntuusername/.smbcredentials,iocharset=utf8,sec=ntlm 0 0
```

Save the file, exit the editor.

Finally, test the fstab entry by issuing:

```shell
sudo mount -a
```

If there are no errors, you should test how it works after a reboot. Your remote share should mount automatically.
