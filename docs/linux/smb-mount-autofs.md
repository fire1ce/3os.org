---
title: SMB Mount With autofs
description: Using autofs to mount SMB shares on Linux systems with proper UTF-8 support for special characters.
template: comments.html
tags: [smb, share, autofs, mount, cifs]
---

# SMB Mount With autofs

## Prerequisites

Install required packages:

```shell
apt install -y autofs cifs-utils
```

### UTF-8 Support (Required for Special Characters)

The Linux CIFS client needs the `nls_utf8` kernel module to handle Unicode characters in filenames (smart quotes, accented letters, non-ASCII hyphens, etc.). Without it, these characters are silently replaced with `?` and files become inaccessible.

This module is part of the `linux-modules-extra` package, which is **not installed by default** on Ubuntu Server / cloud images:

```shell
apt install -y linux-modules-extra-$(uname -r)
```

Load the module immediately (it will auto-load on next boot):

```shell
modprobe nls_utf8
```

!!! warning "Without this package"
    If `linux-modules-extra` is missing, CIFS falls back to `iso8859-1` encoding which can only represent 256 characters. Any Unicode character above U+00FF (smart quotes, em-dashes, accented characters beyond Latin-1, CJK, etc.) will be **replaced with a literal `?`** — a lossy, one-way conversion. Files can be listed but not opened because the filename on disk doesn't match the mangled name.

    You can check `dmesg` for the telltale error:

    ```
    CIFS: VFS: CIFS mount error: iocharset utf8 not found
    ```

## Configure autofs

Create the CIFS auto-mount config:

```shell
nano /etc/auto.cifs
```

Add the mount definition (`media` is the mount name — adjust to your needs):

```shell
media    -fstype=cifs,rw,noperm,vers=3.0,iocharset=utf8,credentials=/etc/.credentials.txt    ://server.address/share
```

| Option | Purpose |
|--------|---------|
| `rw` | Read-write access |
| `noperm` | Skip local permission checks (server ACLs still apply) |
| `vers=3.0` | Use SMB3 protocol |
| `iocharset=utf8` | Correctly handle Unicode filenames |
| `credentials=` | Path to credentials file |

Create the credentials file:

```shell
nano /etc/.credentials.txt
```

Add your credentials:

```shell
username=YourUser
password=YourPassword
```

Secure the credentials file:

```shell
chmod 600 /etc/.credentials.txt
```

Edit the autofs master config:

```shell
nano /etc/auto.master
```

Add at the end of the file (`/mnt` is the parent mount point):

```shell
/mnt    /etc/auto.cifs --timeout=600 --ghost
```

Start and enable autofs:

```shell
systemctl enable --now autofs
```

Test the mount:

```shell
ls /mnt/media/
```

## Alternative: fstab Mount With Credentials

For a persistent fstab-based mount instead of autofs:

```shell
apt install -y cifs-utils
```

Create credentials file:

```shell
nano /root/.smbcredentials
```

```shell
username=YourUser
password=YourPassword
```

```shell
chmod 600 /root/.smbcredentials
```

Add to `/etc/fstab`:

```shell
//server/share /mnt/share cifs credentials=/root/.smbcredentials,iocharset=utf8,vers=3.0,noperm 0 0
```

Test:

```shell
mount -a
```
