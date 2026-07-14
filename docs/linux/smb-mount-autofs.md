---
title: Mount an SMB Share With autofs
description: Configure autofs and mount.cifs to mount an SMB share on demand with a protected credentials file.
template: comments.html
tags: [smb, autofs, mount, cifs, linux]
---

# Mount an SMB Share With autofs

`autofs` mounts an SMB share when its path is accessed and unmounts it after an idle timeout. This keeps a slow or temporarily unavailable NAS from blocking every boot.

The example below creates `/mnt/smb/media` for the SMB share `//nas.example/media`.

## Install the packages

On Ubuntu or Debian:

```shell
sudo apt update
sudo apt install autofs cifs-utils
```

## Create a protected credentials file

Create `/etc/samba/media.credentials`:

```ini
username=smb-user
password=replace-with-the-real-password
domain=WORKGROUP
```

The `domain` line is optional. Protect the file because it contains a plaintext password:

```shell
sudo chown root:root /etc/samba/media.credentials
sudo chmod 600 /etc/samba/media.credentials
```

Using `credentials=` is safer than putting the password directly in the autofs map or `/etc/fstab`.

## Test the SMB mount first

Before involving autofs, prove that the server, share name, credentials, and kernel client work:

```shell
sudo mkdir -p /mnt/smb-test
sudo mount -t cifs //nas.example/media /mnt/smb-test \
  -o credentials=/etc/samba/media.credentials
ls -la /mnt/smb-test
sudo umount /mnt/smb-test
```

Do not force an SMB dialect unless the server requires it. When `vers=` is omitted, current `mount.cifs` negotiates the highest SMB2+ dialect supported by both sides.

## Configure autofs

Create `/etc/auto.master.d/smb.autofs`:

```text
/mnt/smb /etc/auto.smb --timeout=300
```

Create `/etc/auto.smb`:

```text
media -fstype=cifs,credentials=/etc/samba/media.credentials ://nas.example/media
```

The first field, `media`, becomes the directory below `/mnt/smb`. Add ownership options only when the local application requires them. For example, a single-user workstation may add `uid=1000,gid=1000` after confirming those IDs with `id`.

Restart autofs:

```shell
sudo systemctl restart autofs
sudo systemctl status autofs --no-pager
```

Trigger the mount by accessing it:

```shell
ls -la /mnt/smb/media
findmnt /mnt/smb/media
```

The directory may not appear in a normal listing until it is accessed. After five idle minutes, the `--timeout=300` setting allows autofs to expire the mount.

## Troubleshooting

```shell
journalctl -u autofs --since today
dmesg | tail
mount.cifs --version
```

If filenames display incorrectly, check the current `mount.cifs` manual and the loaded kernel modules on that exact distribution. I removed the old blanket advice to install `linux-modules-extra` because package contents and Unicode support vary by kernel and distribution.

## Sources

- [`mount.cifs(8)` manual][mount-cifs]
- [`auto.master(5)` manual][auto-master]
- [`autofs(5)` map format][autofs-map]

<!-- appendices -->

[mount-cifs]: https://man7.org/linux/man-pages/man8/mount.cifs.8.html
[auto-master]: https://man7.org/linux/man-pages/man5/auto.master.5.html
[autofs-map]: https://man7.org/linux/man-pages/man5/autofs.5.html

<!-- end appendices -->
