---
title: Android ADB Cheat Sheet
description: Current ADB commands for connecting Android devices, installing packages, transferring files, collecting logs, and capturing screens.
template: comments.html
tags: [android, adb, cheat-sheet, platform-tools]
---

# Android ADB Cheat Sheet

Android Debug Bridge (`adb`) is a command-line tool for communicating with an Android device or emulator. You can use it to install applications, transfer files, run shell commands, collect logs, and more. ADB is included in the [Android SDK Platform Tools package][platform-tools-url].

Before using ADB with a physical device, enable **Developer options** and **USB debugging**. Connect the device, accept the RSA authorization prompt, and run `adb devices` to check the connection.

The commands below follow the current [Android Debug Bridge documentation][adb-docs-url]. You can also run `adb --help` to check the commands supported by the Platform Tools version installed on your computer.

## Select a Device

| Command | Purpose |
| --- | --- |
| `adb devices` | List connected devices and emulators. |
| `adb devices -l` | Include descriptive device information. |
| `adb -d <command>` | Send a command to the only connected hardware device. |
| `adb -e <command>` | Send a command to the only running emulator. |
| `adb -s <serial> <command>` | Send a command to the device with the specified serial. |

When more than one target is connected, use `-d`, `-e`, or `-s`; otherwise, `adb` reports that more than one device or emulator is available.

## ADB Server

```shell
adb start-server
adb kill-server
```

After `adb kill-server`, the next `adb` command will start the server again.

## Wireless Debugging

Android 11 and later support wireless debugging on phones and tablets. Enable **Wireless debugging** in Developer options, select **Pair device with pairing code**, and use the IP address and port shown on the device:

```shell
adb pair <ip-address>:<pairing-port>
adb connect <ip-address>:<debugging-port>
adb devices
```

The pairing port and debugging port can be different. Make sure the computer and Android device are connected to the same wireless network.

## Install and Uninstall Packages

Install an APK stored on the computer:

```shell
adb install app.apk
```

Reinstall an existing package while keeping its data:

```shell
adb install -r app.apk
```

Install an APK that is already stored on the Android device:

```shell
adb shell pm install /sdcard/Download/app.apk
```

Uninstall a package by its package name:

```shell
adb shell pm uninstall com.example.app
```

Use `adb install -t app.apk` when installing an APK marked as a test package.

## Query Packages

| Command | Purpose |
| --- | --- |
| `adb shell pm list packages` | List installed package names. |
| `adb shell pm list packages -f` | Include each package's associated APK path. |
| `adb shell pm list packages -3` | List third-party packages. |
| `adb shell pm list packages -s` | List system packages. |
| `adb shell pm list packages -u` | Include uninstalled packages. |
| `adb shell pm path <package>` | Print the APK path for a package. |
| `adb shell pm list permission-groups` | List known permission groups. |
| `adb shell pm list permissions -g -f` | List permissions with full details, organized by group. |

## Transfer Files

Copy a local file or directory to the device:

```shell
adb push <local-path> <device-path>
```

Copy a file or directory from the device to the computer:

```shell
adb pull <device-path> <local-path>
```

For example:

```shell
adb push app.apk /sdcard/Download/app.apk
adb pull /sdcard/Download/app.apk ./app.apk
```

The ADB shell can only access paths allowed by the Android device permissions.

## Run Shell Commands

Start an interactive shell:

```shell
adb shell
```

Run a single device command without starting an interactive session:

```shell
adb shell <command>
```

List the command-line tools available on the connected device:

```shell
adb shell ls /system/bin
```

Many shell commands provide their own `--help` output. The available commands can be different between Android versions and device builds.

## View Logs and Create a Bug Report

Stream the device log:

```shell
adb logcat
```

Write a bug report archive to the current directory:

```shell
adb bugreport
```

See the [official Logcat command-line reference][logcat-docs-url] for filtering and formatting options.

The [`adb bugreport` guide][bugreport-docs-url] explains what is included in the report and how it is collected.

## Capture the Screen

Save a PNG screenshot directly on the computer:

```shell
adb exec-out screencap -p > screen.png
```

Record the device display to an MPEG-4 file on the device, stop with ++ctrl+c++, and then copy the recording to the computer:

```shell
adb shell screenrecord /sdcard/demo.mp4
adb pull /sdcard/demo.mp4
```

The official ADB reference documents `screenrecord` for Android 4.4 and later and lists its current limitations and options.

<!-- appendices -->

<!-- urls -->

[adb-docs-url]: https://developer.android.com/tools/adb 'Android Debug Bridge'
[bugreport-docs-url]: https://developer.android.com/studio/debug/bug-report 'Capture and Read Android Bug Reports'
[logcat-docs-url]: https://developer.android.com/tools/logcat 'Logcat Command-Line Tool'
[platform-tools-url]: https://developer.android.com/tools/releases/platform-tools 'SDK Platform Tools Release Notes'

<!-- end appendices -->
