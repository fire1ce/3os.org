---
description: Linux - Files Handling how to, guides, examples, and simple usage
---

# Files Handling

## NCurses Disk Usage

Ncdu is a disk usage analyzer with an ncurses interface.

```bash
apt-get install ncdu
```

## Delete Large File List - _Argument list too long_

```bash
find . -name '*'|xargs rm
```

## Change permissions (chmod) to folders and files

```bash
find . -type d -exec chmod 755 {} +
find . -type f -exec chmod 644 {} +
```

## Change Permissions and Group with UID 1000

```bash
chgrp 1000 -R  FOLDER
chown 1000 -R FOLDER
```
