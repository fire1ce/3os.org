---
title: JADX Android Decompiler
description: Install and use the current JADX command-line and GUI tools to inspect APK, DEX, AAB, and related Android files.
template: comments.html
tags: [android, jadx, decompiler, java]
---

# JADX Android Decompiler

JADX produces Java source from Android DEX bytecode and decodes resources such as `AndroidManifest.xml`. It includes both a command-line tool and a desktop GUI.

!!! note
    Decompiled source is a reconstruction, not the original project. JADX warns that it cannot recover 100% of every application, so expect errors around obfuscated, optimized, or unusual bytecode.

Use it only on applications you own or are authorized to inspect.

## Install JADX

The project publishes release archives containing both `jadx` and `jadx-gui`. The cross-platform archive requires a 64-bit Java 11 or later runtime.

On macOS, the project also documents Homebrew:

```shell
brew install jadx
```

On Arch Linux:

```shell
sudo pacman -S jadx
```

On other systems, download a release archive, unpack it, and run the launcher from its `bin` directory. Prefer the official release page over third-party download sites.

## Use the GUI

Open an APK directly:

```shell
jadx-gui app.apk
```

The GUI provides syntax highlighting, navigation to declarations, usage search, and full-text search. Start here when you need to explore an unfamiliar application.

## Use the CLI

Decompile an APK into a chosen directory:

```shell
jadx -d app-source app.apk
```

Skip resources when you only need source output:

```shell
jadx --no-res -d app-source app.apk
```

Skip source decompilation when you only need decoded resources:

```shell
jadx --no-src -d app-resources app.apk
```

Check the options supported by your installed version:

```shell
jadx --help
```

JADX accepts APK, DEX, JAR, CLASS, AAB, AAR, ZIP, XAPK, APKM, and several related input formats. Support can change between releases, so the local `--help` output is the final reference for your installed build.

## When output looks wrong

- Check the GUI log for decompilation errors.
- Compare questionable Java output with the Smali view.
- Search by strings, resources, and call sites instead of trusting one reconstructed method.
- Retest with the current JADX release before reporting a decompiler bug.

## Sources

- [JADX official repository and usage][jadx]
- [JADX releases][jadx-releases]
- [JADX troubleshooting guide][jadx-troubleshooting]

<!-- appendices -->

[jadx]: https://github.com/skylot/jadx
[jadx-releases]: https://github.com/skylot/jadx/releases
[jadx-troubleshooting]: https://github.com/skylot/jadx/wiki/Troubleshooting-Q&A#decompilation-issues

<!-- end appendices -->
