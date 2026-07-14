---
title: macOS Application Tweaks
description: Practical macOS shortcuts for opening another application instance and launching the Firefox Profile Manager.
template: comments.html
tags: [macos, applications, firefox]
---

# macOS Application Tweaks

These are two small macOS shortcuts I keep around: opening another instance of an application and launching Firefox's Profile Manager without remembering the full command.

## Open another application instance

macOS `open` supports `-n`, which opens a new application instance even when one is already running:

```shell
open -n -a 'Visual Studio Code'
```

Not every application supports multiple independent instances cleanly. Test the command before creating a permanent shortcut.

### Turn it into an app

1. Open **Script Editor**.
2. Create a new script.
3. Add the command, replacing the application name:

```applescript
do shell script "open -n -a 'Visual Studio Code'"
```

4. Click **File > Export**.
5. Choose a name and the **Applications** folder.
6. Set **File Format** to **Application**, then export.

You can now launch the shortcut from Finder, Spotlight, or the Dock.

To change its icon, open **Get Info** for both the source app and the shortcut. Copy the source icon, select the small icon in the shortcut's Get Info window, and paste.

## Firefox Profile Manager shortcut

Firefox provides a built-in Profile Manager. Close Firefox first, then test it in Terminal:

```shell
/Applications/Firefox.app/Contents/MacOS/firefox -P
```

If Firefox is installed somewhere else, adjust the path. Mozilla also provides `about:profiles` for managing profiles from a running Firefox session.

To create a launcher, repeat the Script Editor export steps with:

```applescript
do shell script "/Applications/Firefox.app/Contents/MacOS/firefox -P"
```

Be careful when deleting profiles. Mozilla recommends keeping the profile files unless you are certain you no longer need bookmarks, passwords, settings, and other stored data.

## Sources

- Run `man open` in macOS Terminal for Apple's current `open` options.
- [Mozilla: create, remove, or switch Firefox profiles][firefox-profiles]

<!-- appendices -->

[firefox-profiles]: https://support.mozilla.org/en-US/kb/profile-manager-create-remove-switch-firefox-profiles

<!-- end appendices -->
