---
title: ADB Cheat Sheet
description: Cheat sheet for ADB. ADB, Android Debug Bridge, is a command-line utility for Android. ADB can control your device over USB from a computer, copy files back and forth, install and uninstall apps, run shell commands
template: comments.html
tags: [android, adb, cheat-sheet]
---

# Android ADB Cheat Sheet

ADB, Android Debug Bridge, is a command-line utility included with Google's Android SDK. ADB can control your device over USB from a computer, copy files back and forth, install and uninstall apps, run shell commands, and more. ADB is a powerful tool that can be used to control your Android device from a computer. Below are some of the most common commands you can use with ADB and their usage. You can find more information about ADB and its usage by visiting the [official website][adb-docs-url]{target=\_blank}.

## Common ADB Commands

### Push a file to Download folder of the Android Device

```bash
adb push example.apk /mnt/sdcard/Download/
```

### Lists all the installed packages and get the full paths

```bash
adb shell pm list packages -f
```

### Pulls a file from android device

```bash
adb pull /mnt/sdcard/Download/example.apk
```

---

### Install apk from host to Android device

```bash
adb shell install example.apk
```

### Install apk from Android device storage

```bash
adb shell install /mnt/sdcard/Download/example.apk
```

---

### Set network proxy

```bash
adb shell settings put global http_proxy <address>:<port>
```

Disable network proxy

```bash
adb shell settings put global http_proxy :0
```

## ADB Basics Commands

| Command                             | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| **adb devices**                     | **Lists connected devices**                 |
| **adb connect 192.168.2.1**         | **Connects to adb device over network**     |
| adb root                            | Restarts adbd with root permissions         |
| adb start-server                    | Starts the adb server                       |
| adb kill-server                     | Kills the adb server                        |
| **adb reboot**                      | **Reboots the device**                      |
| **adb devices -l**                  | **List of devices by product/model**        |
| **adb -s `<deviceName> <command>`** | **Redirect command to specific device**     |
| adb –d `<command>`                  | Directs command to only attached USB device |
| adb –e `<command>`                  | Directs command to only attached emulator   |

## Logs

| Command                                      | Description         |
| -------------------------------------------- | ------------------- |
| **adb logcat `[options] [filter] [filter]`** | **View device log** |
| adb bugreport                                | Print bug reports   |

## Permissions

| Command                          | Description                        |
| -------------------------------- | ---------------------------------- |
| adb shell permissions groups     | List permission groups definitions |
| adb shell list permissions -g -r | List permissions details           |

## Package Installation

| Command                        | Description                     |
| ------------------------------ | ------------------------------- |
| **adb shell install** `<apk>`  | **Install app**                 |
| **adb shell install `<path>`** | **Install app from phone path** |
| adb shell install -r `<path>`  | Install app from phone path     |
| adb shell uninstall `<name>`   | Remove the app                  |

## Paths

| Command                                   | Description                               |
| ----------------------------------------- | ----------------------------------------- |
| /data/data/`<package name>`/databases     | App databases                             |
| /data/data/`<package name>`/shared_prefs/ | Shared preferences                        |
| /mnt/sdcard/Download/                     | Download folder                           |
| /data/app                                 | Apk installed by user                     |
| /system/app                               | Pre-installed APK files                   |
| /mmt/asec                                 | Encrypted apps (App2SD)                   |
| /mmt/emmc                                 | Internal SD Card                          |
| /mmt/adcard                               | External/Internal SD Card                 |
| /mmt/adcard/external_sd                   | External SD Card                          |
| -------                                   | -----------                               |
| adb shell ls                              | List directory contents                   |
| adb shell ls -s                           | Print size of each file                   |
| adb shell ls -R                           | List subdirectories recursively           |
| **adb shell pm path `<package name>`**    | **Get full path of a package**            |
| **adb shell pm list packages -f**         | **Lists all the packages and full paths** |

## File Operations

| Command                         | Description                      |
| ------------------------------- | -------------------------------- |
| **adb push `<local> <remote>`** | **Copy file/dir to device**      |
| **adb pull `<remote> <local>`** | **Copy file/dir from device**    |
| run-as `<package>` cat `<file>` | Access the private package files |

## Phone Info

| Command                                           | Description                            |
| ------------------------------------------------- | -------------------------------------- |
| adb get-statе                                     | Print device state                     |
| adb get-serialno                                  | Get the serial number                  |
| adb shell dumpsys iphonesybinfo                   | Get the IMEI                           |
| adb shell netstat                                 | List TCP connectivity                  |
| adb shell pwd                                     | Print current working directory        |
| adb shell dumpsys battery                         | Battery status                         |
| adb shell pm list features                        | List phone features                    |
| adb shell service list                            | List all services                      |
| adb shell dumpsys activity `<package>/<activity>` | Activity info                          |
| adb shell ps                                      | Print process status                   |
| adb shell wm size                                 | Displays the current screen resolution |

## Package Info

| Command                            | Description                       |
| ---------------------------------- | --------------------------------- |
| adb shell list packages            | Lists package names               |
| adb shell list packages -r         | Lists package name + path to apks |
| adb shell list packages -3         | Lists third party package names   |
| adb shell list packages -s         | Lists only system packages        |
| adb shell list packages -u         | Lists package names + uninstalled |
| adb shell dumpsys package packages | Lists info on all apps            |
| adb shell dump `<name>`            | Lists info on one package         |
| adb shell path `<package>`         | Path to the apk file              |

## Device Related Commands

| Command                                                      | Description                              |
| ------------------------------------------------------------ | ---------------------------------------- |
| adb reboot recovery                                          | Reboot device into recovery mode         |
| adb reboot fastboot                                          | Reboot device into recovery mode         |
| adb shell screencap -p "/path/to/screenshot.png"             | Capture screenshot                       |
| adb shell screenrecord "/path/to/record.mp4"                 | Record device screen                     |
| adb backup -apk -all -f backup.ab                            | Backup settings and apps                 |
| adb backup -apk -shared -all -f backup.ab                    | Backup settings, apps and shared storage |
| adb backup -apk -nosystem -all -f backup.ab                  | Backup only non-system apps              |
| adb restore backup.ab                                        | Restore a previous backup                |
| -------                                                      | -----------                              |
| adb shell am start -a android.intent.action.VIEW -d URL      | Opens URL                                |
| adb shell am start -t image/\* -a android.intent.action.VIEW | Opens gallery                            |

<!-- appendices -->

[adb-docs-url]: https://developer.android.com/studio/command-line/adb.html 'Android Debug Bridge'

<!-- end appendices -->
