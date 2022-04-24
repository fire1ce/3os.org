---
title: Magic Mirror 2.0
description: Magic Mirror 2.0 is a Raspberry Pi based mirror that can be used to display information from various sources.
template: comments.html
tags: [raspberry-pi, magicmirror]
---

# Magic Mirror 2.0

![Magic Mirror Final][magicmirror-final-img]

To be honest, it's not my fist time building a Magic Mirror project. My first magicmirror can be found [here][old-magicmirror-project-url].
The Magic Mirror 2.0 is based on [Raspberry Pi 4][amazon-raspberry-pi-4-url]{target=\_blank} with Docker Container.

## References

> [magicmirror.builders][magicmirror-homepage-url]{target=\_blank} official website.  
> [khassel's magicmirror docker image][magicmirror-docker-build-url]{target=\_blank} documentation website.

## The Build Process

I had dead iMac 2011 27" with 2k display. I've managed to use it's LCD panel with this [product][aliexpress-lcd-contoller-url]{target=\_blank} from AliExpress. It actually a full controller for the specific LCD panel, including the inverter for backlight. Basically, it's a full-fledged LCD Monitor with HDMI we need for the [Raspberry Pi 4][amazon-raspberry-pi-4-url]{target=\_blank}.

I've decided to test the controller for the LCD Panel inside the original iMac's body.

![LCD Controller][lcd-controller-img]

I've connected raspberry to the new monitor for the magicmirror testing and configuration.

![iMac Raspberry P][imac-rasperry-pi-img]

Since my previous experience with my first magicmirror build, I've decided to add a [Motion Sensor][aliexpress-pir-sensor-url]{target=\_blank} to the Raspberry Pi to detect the movement of the person infront of the mirror and turn the display on/off accordingly.  
The second thing i've added is a [Power Button][aliexpress-button-url]{target=\_blank} to turn the Raspberry Pi on, off and restart it without a physical access to the Raspberry Pi.

I couldn't find any open source projects for the functionality I needed of the power button and the Motion Sensor. So I've decided to create my own solution. Bellow are the scripts that I've created:

- [External Power Button Wake/Power Off/Restart][motion-sensor-display-control-url]
- [Motion Sensor Display Control][motion-sensor-display-control-url]

Thats how i've tested the functionality of the power button and the motion sensor.

![PIR Button Test][pir-button-test-img]

I've order a reflective glass with 4 holes for mounting. It was a challenge to find a suitable reflective glass for the MagicMirror. The product I've found is not perfect - the glass is tinted, but it's a good enough solution and way better then [Glass Mirror Films][amazon-glass-mirror-film-url]{target=\_blank} I've used on my first Magic Mirror Project.

![Row Glass][row-glass-img]

After I've done all the `proof of concepts` that every thing will work as i intended, I've continue to build the frame to house all the components.

I've used scrap wood I had laying around to build the frame and the mounting for the LCD panel, and the glass

![Wood Frame][wood-frame-img]

For mounting the Magic Mirror to the wall i've used the smallest [TV Mount][amazon-tv-mount-url]{target=\_blank} I've found.

![Frame TV Mount][frame-tv-mount-img]

After the frame is built, I've added the electronics to the frame.

![Frame Electronics][frame-electronics-img]

Performing senity check on the electronics, and display assembly.

![Frame Screen Test][frame-screen-test-img]

Since I when on the `floating` effect the glass isn't covering the all the frame, all the exposed parts of the glass are needed to be covered to avoid light leaking.

![Glass Cover][glass-cover-img]

And the final Magic Mirror on the wall.

![Magic Mirror Final Side][magicmirror-final-side-img]

![Magic Mirror Final][magicmirror-final-img]

## The Software

The magicmiror is based on [MagicMirror][magicmirror-homepage-url]{target=\_blank} project. running on docker on Raspberry OS.

Below the docker compose file for your reference.

```yml
version: '3'

services:
  magicmirror:
    image: karsten13/magicmirror
    container_name: magicmirror
    hostname: magicmirror
    restart: always
    ports:
      - 80:8080
    volumes:
      - ./config:/opt/magic_mirror/config
      - ./modules:/opt/magic_mirror/modules
      - ./css:/opt/magic_mirror/css
      - /tmp/.X11-unix:/tmp/.X11-unix
      - /opt/vc:/opt/vc/:ro
      - /sys:/sys
      - /usr/bin/vcgencmd:/usr/bin/vcgencmd
      - /etc/localtime:/etc/localtime
    devices:
      - /dev/vchiq
    environment:
      - LD_LIBRARY_PATH=/opt/vc/lib
      - DISPLAY=unix:0.0
      - TZ=Asia/Jerusalem
      - SET_CONTAINER_TIMEZONE=true
      - CONTAINER_TIMEZONE=Asia/Jerusalem
    shm_size: '1024mb'
    command:
      - npm
      - run
      - start
```

<!-- appendices -->

<!-- urls -->

[magicmirror-homepage-url]: https://magicmirror.builders/ 'Magic Mirror Homepage'
[magicmirror-docker-build-url]: https://khassel.gitlab.io/magicmirror/ 'Magic Mirror Docker Build'
[old-magicmirror-project-url]: /raspberry-pi/projects/magic-mirror/ 'Magic Mirror Project'
[amazon-raspberry-pi-4-url]: https://amzn.to/3xJJLyG 'Amazon Raspberry Pi 4'
[aliexpress-lcd-contoller-url]: https://s.click.aliexpress.com/e/_9RQ0KF 'Aliexpress LCD Controller'
[aliexpress-pir-sensor-url]: https://s.click.aliexpress.com/e/_AfCHaP 'Aliexpress PIR Sensor'
[aliexpress-button-url]: https://s.click.aliexpress.com/e/_A6J5Jp 'Aliexpress Button'
[external-power-button-for-raspberry-pi-url]: docs/raspberry-pi/external-power-button/ 'External Power Button'
[motion-sensor-display-control-url]: docs/raspberry-pi/motion-sensor-display-control/ 'Motion Sensor Display Control'
[amazon-glass-mirror-film-url]: https://amzn.to/3OyMmBu 'Amazon Glass Mirror Film'
[amazon-tv-mount-url]: https://amzn.to/3xTDuQW 'Amazon TV Mount'

<!-- images -->

[magicmirror-final-img]: /assets/images/7b9035d6-c3b8-11ec-983a-277c87c79876.JPG 'Magic Mirror Final'
[lcd-controller-img]: /assets/images/e6531a42-c3bc-11ec-926f-efeac023c51f.JPG 'LCD Controller'
[imac-rasperry-pi-img]: /assets/images/96f0cf48-c3bd-11ec-bd26-3bb9671d2760.JPG 'iMac Raspberry Pi'
[pir-button-test-img]: /assets/images/849ac868-c3c1-11ec-bced-43218d8bdf1c.JPG 'PIR Button Test'
[row-glass-img]: /assets/images/b1db6a1e-c3c9-11ec-b82b-4f85c9b1fe37.JPG 'Row Glass'
[wood-frame-img]: /assets/images/89d51168-c3ca-11ec-8696-bb85fc9f7c43.JPG 'Wood Frame'
[frame-tv-mount-img]: /assets/images/5a524640-047a-44bd-a380-096ab786cd44.JPG 'Frame TV Mount'
[frame-electronics-img]: /assets/images/9bd60754-c3cb-11ec-8b9f-eb26a00d1231.jpg 'Frame Electronics'
[frame-screen-test-img]: /assets/images/d2bebf22-c3cb-11ec-a455-afd361c4ca85.JPG 'Frame Screen Test'
[glass-cover-img]: /assets/images/1f5e958c-c3cc-11ec-9baa-43c39fc35135.JPG 'Glass Cover'
[magicmirror-final-side-img]: /assets/images/ab8824e2-c3cc-11ec-b5ba-536c8b1ec876.JPG 'Magic Mirror Final Side'

<!--css-->

<!-- end appendices -->
