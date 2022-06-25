---
title: Applications Tweaks
description: macOS Applications tweaks and tips for better experience, productivity and workflow and more
template: comments.html
tags: [macOS]
---

# Applications Tweaks

## Running Multi Instances of an Application

Launch the Script Editor choose temporary folder

Copy the command to be executed to the Script Editor

```bash
do shell script "open -n <path to application>"
```

!!! example

    do shell script "open -n /Applications/'Visual Studio Code.app'"

File > Export

Use the following settings:

- Export As: **Your New Application Name**
- Where: **Applications**
- File Format: **Application**

^^Change The Icon of Your New Application:^^

In **Finder** got to **Applications** folder.
Right Click on the new **Your New Application** application we just created and click **Get Info**.
Drug the original application icon (or any other) to the in the left corner of the "get info" menu.

## Lunch Firefox Profile Manager as Application

Launch the Script Editor choose temporary folder

Copy the command to be executed to the Script Editor

```bash
do shell script "/Applications/Firefox.app/Contents/MacOS/firefox -ProfileManager &> /dev/null &"
```

File > Export

Use the following settings:

- Save As: **Firefox Profile Manager**
- Where: **Applications**
- File Format: **Application**

^^Change The Icon of Your New Firefox Profile Manager Application:^^

In **Finder** got to **Applications** folder.
Right Click on the new **Firefox Profile Manager** application we just created and click **Get Info**.
Drug the original application to the icon in the left corner of the "get info" menu.
