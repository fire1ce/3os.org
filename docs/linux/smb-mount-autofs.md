---
description: how to guide to SMB Mount With autofs
---

# SMB Mount With autofs

install autofs cifs-utils

```bash
touch /etc/auto.cifs
nano /etc/auto.cifs
```

Add this to the file: ("media" - is any name for your mount)

```bash
media    -fstype=cifs,rw,noperm,vers=3.0,credentials=/etc/.credentials.txt    ://oscar.3os.re/ActiveShare/Media
```

Exit and save:

```bash
touch /etc/.credentials.txt
nano /etc/.credentials.txt
```

Add you credentials for the smb mount:

```bash
username=YourUser
password=YourPassword
```

Exit and save:

```bash
nano /etc/auto.master
```

At the end of the file add: ("/mnt" - mount location, /etc/auto.cifs your config for mounting the SMB Share)

```bash
/mnt    /etc/auto.cifs --timeout=600 --ghost
```

Save end exit.
Test the mounting.

```bash
systemctl start autofs
cd /mnt/media/
ls
```

You should see the mount over there.
Enable autofs on boot:

```bash
systemctl enable autofs
```

## SMB Mount on Linux With Credentials

```bash
sudo apt-get install cifs-utils
nano ~/.smbcredentials
```

add this to the config.

```bash
username=msusername
password=mspassword
```

Save the file, exit the editor.
Change the permissions of the file to prevent unwanted access to your credentials:

```bash
chmod 600 ~/.smbcredentials
```

Then edit your /etc/fstab file (with root privileges) to add this line (replacing the insecure line in the example above, if you added it):

```bash
//servername/sharename /media/windowsshare cifs vers=1.0,credentials=/home/ubuntuusername/.smbcredentials,iocharset=utf8,sec=ntlm 0 0
```

Save the file, exit the editor.

Finally, test the fstab entry by issuing:

```bash
sudo mount -a
```

If there are no errors, you should test how it works after a reboot. Your remote share should mount automatically.
