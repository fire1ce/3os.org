---
description: Linux - LVM Partition how to, guides
---

# Linux LVM Partitions

## Removing LVM Partition and Merging In To / (root partition)

Find out the names of the partition with df

```bash
df
```

You need to unmount the partition before you can delete them and marge __backup the data of the partition you would like to delete__ this exmaple will use "centos-home" as the partition that will be merged to the root partition.

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
