---
description: Fix Locales errors in terminal, setting ntp timezone
---

# Locales & Timezone

## Fix Locales (Fix Bash Local Error)

Set the Locale, Find the en_US.UTF-8 in the list and select it, at the following screen select it.

```bash
dpkg-reconfigure locales
```

## Set System Time With Time Zone (timedatectl ntp)

Find your time zone with __timedatectl list-timezones__ use __grep__ for easier results:

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
