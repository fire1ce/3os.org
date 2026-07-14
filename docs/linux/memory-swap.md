---
title: Memory & Swap
description: Linux cheat sheet for inspecting process memory, finding swap usage, clearing caches, and cycling swap safely.
template: comments.html
tags: [linux]
---

# Memory & Swap

Use these commands to inspect RAM and swap usage on a Linux system.

## List Processes by RAM Usage

Show the 20 processes using the most resident memory:

```shell
ps aux | awk 'NR > 1 {print $6/1024 " MB\t" $11}' | sort -nr | head -n 20
```

## Find Processes Using Swap

Show the five processes with the highest swap usage:

```shell
grep VmSwap /proc/*/status 2>/dev/null | sort -nk2 | tail -n5
```

## Clear Cache and Swap

!!! warning

    Cycling swap can fail or terminate processes when the system lacks enough free RAM. Run this only during a maintenance window after checking available memory.

As root, flush pending writes, clear filesystem caches, and cycle swap:

```shell
sync && echo 3 > /proc/sys/vm/drop_caches && swapoff -a && swapon -a
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

<!--css-->

<!-- end appendices -->
