---
description: Linux Memory & Swap how to, guides, examples, and simple usage
---

# Memory & Swap

## Who Uses RAM

```bash
ps aux  | awk '{print $6/1024 " MB\t\t" $11}'  | sort -n
```

## Who Is Using Swap Memory

```bash
grep VmSwap /proc/*/status 2>/dev/null | sort -nk2 | tail -n5
```

## Clear Cache and Swap

```bash
echo 3 > /proc/sys/vm/drop_caches && swapoff -a && swapon -a
```

