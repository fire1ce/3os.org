---
title: Files Handling
description: Linux files handling with the Linux file system tips and tricks for the Linux user. This is a collection of tips and tricks for the Linux user.
template: comments.html
tags: [linux, files-handling]
---

# Files Handling

## NCurses Disk Usage

Ncdu is a disk usage analyzer with an ncurses interface.

```shell
apt-get install ncdu
```

## Delete Large File List - _Argument list too long_

```shell
find . -name '*'|xargs rm
```

## Change permissions (chmod) to folders and files

```shell
find . -type d -exec chmod 755 {} +
find . -type f -exec chmod 644 {} +
```

## Recursively chown user and group

```shell
chown -R user:group /some/path/here
```

## Recursively chmod to 775/664

```shell
chmod -R a=,a+rX,u+w,g+w /some/path/here
```

```shell
          ^  ^    ^   ^ adds write to group
          |  |    | adds write to user
          |  | adds read to all and execute to all folders (which controls access)
          | sets all to `000`
```

## Find UID/GID for user

```shell
id <username>
```
