---
title: JADX Decompiler
description: JADX Decompiler is a Java bytecode decompiler for Android applications.
template: comments.html
tags: [android, decompiler, java]
---

# JADX - Dex to Java Decompiler

Command line and GUI tools for producing Java source code from Android Dex and Apk files

Github Repository: [skylot-jadx][jadx-github-repository-url]{target="\_blank"}

:exclamation::exclamation::exclamation: Please note that in most cases **jadx** can't decompile all 100% of the code, so errors will occur. Check [Troubleshooting guide](https://github.com/skylot/jadx/wiki/Troubleshooting-Q&A#decompilation-issues) for workarounds

**Main features:**

- decompile Dalvik bytecode to java classes from APK, dex, aar, aab and zip files
- decode `AndroidManifest.xml` and other resources from `resources.arsc`
- deobfuscator included

**jadx-gui features:**

- view decompiled code with highlighted syntax
- jump to declaration
- find usage
- full text search
- smali debugger, check [wiki page](https://github.com/skylot/jadx/wiki/Smali-debugger) for setup and usage

Jadx-gui key bindings can be found [here](https://github.com/skylot/jadx/wiki/JADX-GUI-Key-bindings)

See these features in action here: [jadx-gui features overview](https://github.com/skylot/jadx/wiki/jadx-gui-features-overview)

<img src="https://user-images.githubusercontent.com/118523/142730720-839f017e-38db-423e-b53f-39f5f0a0316f.png" width="700"/>

{{ external_markdown('https://raw.githubusercontent.com/skylot/jadx/master/README.md', '### Download') }}
{{ external_markdown('https://raw.githubusercontent.com/skylot/jadx/master/README.md', '### Install') }}
{{ external_markdown('https://raw.githubusercontent.com/skylot/jadx/master/README.md', '### Use jadx as a library') }}
{{ external_markdown('https://raw.githubusercontent.com/skylot/jadx/master/README.md', '### Usage') }}

<!-- appendices -->

<!-- urls -->

[wireguard-vyatta-ubnt-url]: https://github.com/WireGuard/wireguard-vyatta-ubnt 'wireguard-vyatta-ubnt Github Repository'
[jadx-github-repository-url]: https://github.com/skylot/jadx 'jadx Github Repository'

<!-- images -->

<!--css-->
<style>
  .md-typeset img {
    display: inline;
</style>

<!-- end appendices -->
