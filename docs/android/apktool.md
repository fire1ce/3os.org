---
title: Apktool Decode, Build, and Sign Guide
description: Install Apktool, decode and rebuild an APK, then align, sign, and verify the rebuilt package with Android SDK tools.
template: comments.html
tags: [android, reverse-engineering, apktool, apksigner]
---

# Apktool Decode, Build, and Sign Guide

Apktool decodes Android resources and disassembles DEX files into a project-like directory. It can build that directory back into an APK, but it does not recreate the original source project.

Use this workflow only for an application you own or have permission to analyze or modify.

## Install Apktool

Apktool requires Java. Follow the official install guide for the current Java requirement and download locations.

On macOS with Homebrew:

```shell
brew install apktool
```

For Linux and Windows, the project provides a wrapper script plus the release JAR. Download both from the official site and put them in a directory on your `PATH`.

Verify the installation:

```shell
apktool --version
```

## Decode an APK

```shell
apktool d app.apk -o app-src
```

The output normally includes decoded resources, the manifest, and Smali code. Some applications use resource formats or protection that Apktool cannot decode or rebuild cleanly.

## Rebuild the APK

```shell
apktool b app-src -o app-unsigned.apk
```

The rebuilt file is unsigned. Android will not accept it as an update to an app signed with a different certificate, and changing the package can also break integrity checks inside the application.

## Align and sign the rebuilt APK

Install current Android SDK Build Tools through Android Studio's SDK Manager or `sdkmanager`. This provides `zipalign` and `apksigner`.

Create a test signing key if you do not already have one:

```shell
keytool -genkeypair \
  -keystore release.jks \
  -alias release \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Protect this keystore and its password. Losing a production signing key can prevent future updates, so do not treat this example key as a production key-management design.

Align the unsigned APK before signing it:

```shell
zipalign -P 16 -f -v 4 app-unsigned.apk app-aligned.apk
```

Sign to a new file:

```shell
apksigner sign \
  --ks release.jks \
  --out app-signed.apk \
  app-aligned.apk
```

Verify both alignment and signature:

```shell
zipalign -c -P 16 -v 4 app-signed.apk
apksigner verify --verbose --print-certs app-signed.apk
```

Do not modify the APK after `apksigner` runs; any later change invalidates its signature.

## Sources

- [Apktool official site and basic commands][apktool]
- [Apktool install guide][apktool-install]
- [Apktool CLI parameters][apktool-cli]
- [Android `zipalign` reference][zipalign]
- [Android `apksigner` reference][apksigner]

<!-- appendices -->

[apktool]: https://apktool.org/
[apktool-install]: https://apktool.org/docs/install/
[apktool-cli]: https://apktool.org/docs/cli-parameters/
[zipalign]: https://developer.android.com/tools/zipalign
[apksigner]: https://developer.android.com/tools/apksigner

<!-- end appendices -->
