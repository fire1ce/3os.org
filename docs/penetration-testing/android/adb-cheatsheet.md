---
description: ADB CheatSheet - In this CheatSheet, you will find a series of practical example commands for running ADB and getting the most of Android Debug Bridge powerful tool.
---

# ADB CheatSheet

## ADB Basics

| Command                             | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| __adb devices__                     | __Lists connected devices__                 |
| __adb connect 192.168.2.1__         | __Connects to adb device over network__     |
| adb root                            | Restarts adbd with root permissions         |
| adb start-server                    | Starts the adb server                       |
| adb kill-server                     | Kills the adb server                        |
| __adb reboot__                      | __Reboots the device__                      |
| __adb devices -l__                  | __List of devices by product/model__        |
| __adb -s `<deviceName> <command>`__ | __Redirect command to specific device__     |
| adb –d `<command>`                  | Directs command to only attached USB device |
| adb –e `<command>`                  | Directs command to only attached emulator   |

## Logs

| Command                                      | Description         |
| -------------------------------------------- | ------------------- |
| __adb logcat `[options] [filter] [filter]`__ | __View device log__ |
| adb bugreport                                | Print bug reports   |

## Permissions

| Command                          | Description                        |
| -------------------------------- | ---------------------------------- |
| adb shell permissions groups     | List permission groups definitions |
| adb shell list permissions -g -r | List permissions details           |

## Package Installation

| Command                        | Description                     |
| ------------------------------ | ------------------------------- |
| __adb shell install__ `<apk>`  | __Install app__                 |
| __adb shell install `<path>`__ | __Install app from phone path__ |
| adb shell install -r `<path>`  | Install app from phone path     |
| adb shell uninstall `<name>`   | Remove the app                  |

## Paths

| Command                                   | Description                               |
| ----------------------------------------- | ----------------------------------------- |
| /data/data/`<package name>`/databases     | App databases                             |
| /data/data/`<package name>`/shared_prefs/ | Shared preferences                        |
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
| __adb shell pm path `<package name>`__    | __Get full path of a package__            |
| __adb shell pm list packages -f__         | __Lists all the packages and full paths__ |

## File Operations

| Command                         | Description                      |
| ------------------------------- | -------------------------------- |
| __adb push `<local> <remote>`__ | __Copy file/dir to device__      |
| __adb pull `<remote> <local>`__ | __Copy file/dir from device__    |
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

| Command                                                     | Description                              |
| ----------------------------------------------------------- | ---------------------------------------- |
| adb reboot-recovery                                         | Reboot device into recovery mode         |
| adb reboot fastboot                                         | Reboot device into recovery mode         |
| adb shell screencap -p "/path/to/screenshot.png"            | Capture screenshot                       |
| adb shell screenrecord "/path/to/record.mp4"                | Record device screen                     |
| adb backup -apk -all -f backup.ab                           | Backup settings and apps                 |
| adb backup -apk -shared -all -f backup.ab                   | Backup settings, apps and shared storage |
| adb backup -apk -nosystem -all -f backup.ab                 | Backup only non-system apps              |
| adb restore backup.ab                                       | Restore a previous backup                |
| -------                                                     | -----------                              |
| adb shell am start -a android.intent.action.VIEW -d URL     | Opens URL                                |
| adb shell am start -t image/* -a android.intent.action.VIEW | Opens gallery                            |

