---
title: LVM Partitions
description: Linux removing lvm partition and merging in to root partition.
template: comments.html
tags: [linux, lvm]
---

# LVM Partitions

## Removing LVM Partition and Merging In To / (root partition)

Find out the names of the partition with df

```bash
df
```

You need to unmount the partition before you can delete them and marge **backup the data of the partition you would like to delete** this example will use "centos-home" as the partition that will be merged to the root partition.

```bash
unmount -a
lvremove /dev/mapper/centos-home
lvextend -l +100%FREE -r /dev/mapper/centos-root
```

After the merging and before mounting you should remove the partition from fastab

```bash
nano /etc/fstab
mount -a
```
