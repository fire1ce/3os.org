---
description: Linux - Apache how to, guides, examples, and simple usage
---

# Apache

## Apache Memory Usage

```bash
ps -ylC httpd | awk '{x += $8;y += 1} END {print "Apache Memory Usage (MB): "x/1024; print "Average Process Size (MB): "x/((y-1)*1024)}'
```

## Find Root of a Site and CD to it

Replace domain.com with desired domain

```bash
cd `grep "domain.com" /etc/apache2/conf/httpd.conf -A7|grep Root|head -1|awk '{print $2}'`
```
