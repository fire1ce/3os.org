---
title: MagicMirror² Raspberry Pi 4 Build
description: My second MagicMirror build using a Raspberry Pi 4, recycled 27-inch iMac display, motion sensor, and external power button.
template: comments.html
tags: [raspberry-pi, magicmirror]
---

# MagicMirror² Raspberry Pi 4 Build

![Magic Mirror Final][magicmirror-final-img]

To be honest, this was not my first Magic Mirror project. My [first build][old-magicmirror-project-url] is still available as a legacy build record.

This second version uses a [Raspberry Pi 4][amazon-raspberry-pi-4-url]{target=\_blank}, a recycled 27-inch iMac display, a motion sensor, and an external power button. The original software deployment used Docker; the build story and hardware are still useful, but the old container recipe is retired below.

## References

- [Official MagicMirror² documentation][magicmirror-install-url]{target=\_blank}
- [Community Docker deployment linked by MagicMirror²][magicmirror-docker-build-url]{target=\_blank}

## The Build Process

I had a dead 2011 27-inch iMac with a 2K display. I managed to reuse its LCD panel with this [controller][aliexpress-lcd-contoller-url]{target=\_blank} from AliExpress. It includes the backlight inverter and turns the panel into an HDMI monitor for the [Raspberry Pi 4][amazon-raspberry-pi-4-url]{target=\_blank}.

I first tested the controller with the LCD panel still inside the original iMac body.

![LCD Controller][lcd-controller-img]

Then I connected the Raspberry Pi for the first MagicMirror² test and configuration.

![iMac Raspberry P][imac-rasperry-pi-img]

From my first MagicMirror build, I knew I wanted a [motion sensor][aliexpress-pir-sensor-url]{target=\_blank} to detect someone in front of the mirror and control the display. I also added a [power button][aliexpress-button-url]{target=\_blank} to shut down or restart the Raspberry Pi without opening the frame.

I could not find one project that handled the exact button and motion-sensor behavior I wanted, so I created these two parts:

- [External Power Button Wake/Power Off/Restart][external-power-button-for-raspberry-pi-url]
- [Motion Sensor Display Control][motion-sensor-display-control-url]

This was my test setup for the power button and motion sensor.

![PIR Button Test][pir-button-test-img]

I ordered reflective glass with four mounting holes. Finding suitable glass was one of the harder parts. This piece is tinted and not perfect, but it worked much better than the [mirror film][amazon-glass-mirror-film-url]{target=\_blank} I used on the first build.

![Row Glass][row-glass-img]

After proving that every part worked as intended, I continued with the frame.

I used scrap wood for the frame and the LCD-panel and glass mounts.

![Wood Frame][wood-frame-img]

For mounting the Magic Mirror to the wall, I used the smallest [TV mount][amazon-tv-mount-url]{target=\_blank} I could find.

![Frame TV Mount][frame-tv-mount-img]

After building the frame, I added the electronics.

![Frame Electronics][frame-electronics-img]

I performed one more sanity check on the electronics and display assembly.

![Frame Screen Test][frame-screen-test-img]

I wanted a floating-glass effect, so the glass does not cover the whole frame. I covered the exposed areas behind it to prevent light leaks.

![Glass Cover][glass-cover-img]

Finally, the Magic Mirror was ready for the wall.

![Magic Mirror Final Side][magicmirror-final-side-img]

![Magic Mirror Final][magicmirror-final-img]

## Current Software Setup

!!! warning "Original Docker recipe retired"
    The first version of this page used a Compose v3 file with Raspberry Pi X11, `/opt/vc`, and `/dev/vchiq` mappings. That stack describes the older Raspberry Pi graphics environment and should not be copied to a current Raspberry Pi OS installation.

The MagicMirror² team currently supports manual installation. Check its required Node.js version first because the requirement changes between releases:

```shell
git clone https://github.com/MagicMirrorOrg/MagicMirror.git
cd MagicMirror
node --run install-mm
cp config/config.js.sample config/config.js
node --run start
```

MagicMirror² also links to a community Docker deployment, but it is not maintained by the core team. If you choose Docker, use the current compose example from that project and review its image tag, mounts, display mode, port binding, and update procedure before deploying it.

The official installation page is the source of truth for current commands. It also documents server-only mode, X11, Wayland, and the current autostart service.

<!-- appendices -->

<!-- urls -->

[old-magicmirror-project-url]: magic-mirror.md 'Magic Mirror Project'
[external-power-button-for-raspberry-pi-url]: ../external-power-button.md 'External Power Button'
[motion-sensor-display-control-url]: ../motion-sensor-display-control.md 'Motion Sensor Display Control'
[magicmirror-homepage-url]: https://magicmirror.builders/ 'Magic Mirror Homepage'
[magicmirror-install-url]: https://docs.magicmirror.builders/getting-started/installation.html 'MagicMirror Installation'
[magicmirror-docker-build-url]: https://khassel.gitlab.io/magicmirror/ 'Magic Mirror Docker Build'
[amazon-raspberry-pi-4-url]: https://amzn.to/3xJJLyG 'Amazon Raspberry Pi 4'
[aliexpress-lcd-contoller-url]: https://s.click.aliexpress.com/e/_9RQ0KF 'Aliexpress LCD Controller'
[aliexpress-pir-sensor-url]: https://s.click.aliexpress.com/e/_AfCHaP 'Aliexpress PIR Sensor'
[aliexpress-button-url]: https://s.click.aliexpress.com/e/_A6J5Jp 'Aliexpress Button'
[amazon-glass-mirror-film-url]: https://amzn.to/3OyMmBu 'Amazon Glass Mirror Film'
[amazon-tv-mount-url]: https://amzn.to/3xTDuQW 'Amazon TV Mount'

<!-- images -->

[magicmirror-final-img]: ../../assets/images/7b9035d6-c3b8-11ec-983a-277c87c79876.JPG 'Magic Mirror Final'
[lcd-controller-img]: ../../assets/images/e6531a42-c3bc-11ec-926f-efeac023c51f.JPG 'LCD Controller'
[imac-rasperry-pi-img]: ../../assets/images/96f0cf48-c3bd-11ec-bd26-3bb9671d2760.JPG 'iMac Raspberry Pi'
[pir-button-test-img]: ../../assets/images/849ac868-c3c1-11ec-bced-43218d8bdf1c.JPG 'PIR Button Test'
[row-glass-img]: ../../assets/images/b1db6a1e-c3c9-11ec-b82b-4f85c9b1fe37.JPG 'Row Glass'
[wood-frame-img]: ../../assets/images/89d51168-c3ca-11ec-8696-bb85fc9f7c43.JPG 'Wood Frame'
[frame-tv-mount-img]: ../../assets/images/5a524640-047a-44bd-a380-096ab786cd44.JPG 'Frame TV Mount'
[frame-electronics-img]: ../../assets/images/9bd60754-c3cb-11ec-8b9f-eb26a00d1231.jpg 'Frame Electronics'
[frame-screen-test-img]: ../../assets/images/d2bebf22-c3cb-11ec-a455-afd361c4ca85.JPG 'Frame Screen Test'
[glass-cover-img]: ../../assets/images/1f5e958c-c3cc-11ec-9baa-43c39fc35135.JPG 'Glass Cover'
[magicmirror-final-side-img]: ../../assets/images/ab8824e2-c3cc-11ec-b5ba-536c8b1ec876.JPG 'Magic Mirror Final Side'

<!--css-->

<!-- end appendices -->
