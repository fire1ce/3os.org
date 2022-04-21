---
description: macOS Applications tweaks and tips for better experience, productivity and workflow and more
---

# Applications Tweaks

## iTerm2 Tweaks and Tips

**Using Alt/Cmd + Right/Left Arrow in iTerm**

Go to iTerm Preferences → Profiles, select your profile, then the Keys tab. Click Load Preset... and choose Natural Text Editing.

**Remove the Right Arrow Before the Cursor Line**

you can turn it off by going in to Preferences > Profiles > (your profile) > Terminal, scroll down to "Shell Integration", and turn off "Show mark indicators".

## Add External Wireless USB Adapter Support macOS (Wifi)

If you have an external Wireless USB Adapter macOS won't let you use or control it.
Thanks to **chris1111** for his git repository with supported software that's allows you to use external wireless usb parallel to the internal wifi card. Follow this link to for supported devices installation:

- [chris1111's Wireless-USB-Adapter Github Page](https://github.com/chris1111/Wireless-USB-Adapter){target=\_blank}
- [Wireless-USB-Adapter Releases Download](https://github.com/chris1111/Wireless-USB-Adapter/releases){target=\_blank}

## Disable FortiClinet Auto Start-up

Change RunAtLoad to **false** in both:

/Library/LaunchAgents/com.fortinet.forticlient.credential_store.plist
/Library/LaunchAgents/com.fortinet.forticlient.fct_launcher.plist

```bash
sudo sed 's/true/false/' /Library/LaunchAgents/com.fortinet.forticlient.credential_store.plist
sudo sed 's/true/false/' /Library/LaunchAgents/com.fortinet.forticlient.fct_launcher.plist

```

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
