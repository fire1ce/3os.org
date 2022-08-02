---
title: Locales & Timezone
description: Linux locales and timezone tips and tricks for the Linux user. This is a collection of tips and tricks for the Linux user.
template: comments.html
tags: [linux, locales, timezone]
---

# Locales & Timezone

## Fix Locales (Fix Bash Local Error)

Set the Locale, Find the en_US.UTF-8 in the list and select it, at the following screen select it.

```bash
dpkg-reconfigure locales
```

## Set System Time With Time Zone (timedatectl ntp)

Find your time zone with **timedatectl list-timezones** use **grep** for easier results:

```bash
timedatectl list-timezones | grep "Toronto"
```

The output should look like this:

```bash
America/Toronto
```

Now set the Time Zone and active it.

```bash
timedatectl set-timezone Asia/Jerusalem
timedatectl set-ntp true
```

Now test timedatectl status

```bash
timedatectl status
```

Check your system time

```bash
date
```
