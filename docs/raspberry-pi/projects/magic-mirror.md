---
title: Original Raspberry Pi MagicMirror Build
description: Legacy photo record of my first Raspberry Pi MagicMirror hardware build, with current software guidance linked separately.
template: comments.html
tags: [raspberry-pi, magic-mirror, legacy]
---

# Original Raspberry Pi MagicMirror Build

!!! warning "Legacy build record"
    This is my first MagicMirror hardware build. The original software section used old Raspbian graphics, LXDE autostart, Node.js 10, `/etc/network/interfaces`, and retired Raspberry Pi display settings. I removed those commands because they are not a current installation guide.

For current software installation, use the [official MagicMirror² installation guide][magicmirror-install]. My [second MagicMirror build][second-build] also shows the later hardware and control setup.

<div style="width:80%; margin:0 auto">
    <img src="/assets/images/raspberry-pi/magicMirror/IMG_2134.jpg" alt="Completed first Raspberry Pi MagicMirror build">
</div>

## MagicMirror Build Pictures

23-inch Samsung screen power connection work:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1719.jpg" alt="Samsung display power connection for the MagicMirror">
</div>

Initial wooden-frame fitting test on glass with dual-mirror film:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1717.jpg" alt="Wooden MagicMirror frame fitted over mirror film">
</div>

Testing the display installation with the frame removed:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1722.jpg" alt="MagicMirror screen installation test">
</div>

Testing a black-and-white image from a laptop after assembling the frame:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1732.jpg" alt="Black-and-white display test through the MagicMirror glass">
</div>

Power, LAN, and USB cutouts:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1766.jpg" alt="Power LAN and USB cutouts in the MagicMirror frame">
</div>

Extended ports fitted with wood filler:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1767.jpg" alt="Extended ports fitted into the wooden frame">
</div>

The finished external ports:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1768.jpg" alt="Finished external ports on the MagicMirror">
</div>

Display, Raspberry Pi, cable routing, and blackout material behind the mirror:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1771.jpg" alt="Raspberry Pi display and cable routing behind the mirror">
</div>

Adding color to the frame:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1978.jpg" alt="Painted wooden MagicMirror frame">
</div>

Final function test:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1984.jpg" alt="MagicMirror function test before final assembly">
</div>

Full assembly behind the mirror:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_1985.jpg" alt="Completed electronics assembly behind the MagicMirror">
</div>

Final product:

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/raspberry-pi/magicMirror/IMG_2134.jpg" alt="Completed first MagicMirror mounted on the wall">
</div>

## What Still Transfers to a New Build

- Prove the screen, controller, and HDMI path before building the frame.
- Plan cable exits, service access, ventilation, and a safe shutdown path before closing the back.
- Block light around the active display area.
- Keep mains-voltage parts enclosed and strain-relieved.
- Treat the software as a separate, replaceable layer and follow current project documentation.

## Sources

- [MagicMirror² current installation and usage][magicmirror-install]
- [MagicMirror² current hardware requirements][magicmirror-requirements]

<!-- appendices -->

[magicmirror-install]: https://docs.magicmirror.builders/getting-started/installation.html
[magicmirror-requirements]: https://docs.magicmirror.builders/getting-started/requirements.html
[second-build]: magic-mirror-v2.md

<!-- end appendices -->
