---
title: Allow SSH With RSA KEY
description: how to allow and ssh with rsa yes to synology dsm
---

* Log into Synology web UI as an administrator user
* Enable “User Home”
* Control Panel / User / Advanced, scroll down to “User Home”
* Check “Enable user home service”, select an appropriate Location (i.e. volume1)
* Click “Apply”

SSH into Synology as `Admin User`

```bash
sudo chmod 755 /volume1/homes/*youruser*
mkdir ~/.ssh && chmod 0700 ~/.ssh
touch ~/.ssh/authorized_keys && chmod 0644 ~/.ssh/authorized_keys
echo PUCLICK_Key_STRING >> ~/.ssh/authorized_keys
```

Configure the Synology’s SSH service to allow login by key

```bash
sudo vi /etc/ssh/sshd_config
```

* Uncomment line that says: #PubkeyAuthentication yes
* Uncomment the line that says: #AuthorizedKeyFiles .ssh/authorized_keys
* Add a line: PasswordAuthentication no
* Make sure that line is uncommented that says: ChallengeResponseAuthentication no
* Save the file and exit the editor

```bash
sudo synoservicectl --restart sshd
```

You should now connect with rsa key.
