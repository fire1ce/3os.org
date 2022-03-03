---
description: Apktool A tool for reverse engineering 3rd party, closed, binary Android apps. you will find a series of practical example commands for running Apktool and getting the most of this powerful tool.
---

# Apktool

A tool for reverse engineering 3rd party, closed, binary Android apps. It can decode resources to nearly original form and rebuild them after making some modifications. It also makes working with an app easier because of the project like file structure and automation of some repetitive tasks like building apk, etc.

It is `NOT` intended for piracy and other non-legal uses. It could be used for localizing, adding some features or support for custom platforms, analyzing applications and much more.

## Download and Documentation

[Official Apktool Website](https://ibotpeaches.github.io/Apktool/){target=\_blank}

## How to Singe APK After Compile

Install **apksigner**

```bash
apt install -y apksigner
```

Create certificate at the same folder you've compiled your modified APK

```bash
keytool -genkey -v -keystore keystore.jks -keyalg RSA -keysize 2048 -validity 10000
```

Enter A password (we will need it to singe the APK), enter any data you wish for the certificate information. At the end enter **'y'** at the end to create the certificate.

Now we should have 2 files: your.apk, keystore.jks. The only step left is to singe the APK with new certificate.

```bash
apksigner sign --ks keystore.jks your.apk
```

When installing the APK you will be prompted with a warning of "unknown certificate" just hit Install.
