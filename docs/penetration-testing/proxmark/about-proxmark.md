---
description: The Proxmark is an RFID swiss-army tool, allowing for both high and low level interactions with the vast majority of RFID tags and systems world-wide.
---

# About Promark 3

The Proxmark is an RFID swiss-army tool, allowing for both high and low level interactions with the vast majority of RFID tags and systems world-wide.

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/penetration-testing/proxmark/rsz_img_1044.jpg" alt="terminal screenshot">
</div>

There are few Promark Devices, and you can find them at the offical website. I personally use the device at the picture above, you can get one at [Amazon](https://amzn.to/3AcCQvL){target=_blank} or [Aliexpress](https://s.click.aliexpress.com/e/_APt1x8){target=_blank}, it's cheap and suites my needs.

Useful Links:

* [Official Proxmark Website](https://proxmark.com/){target=_blank}
* [Official Proxmark3 Github Repo](https://github.com/Proxmark/proxmark3){target=_blank}
* [Andprox - Android client](https://github.com/AndProx/AndProx){target=_blank}




# Mifare Classic 1K ISO14443A 

When I first started using the Proxmark, it all sounded like it was going to be easy, you wave a card at the device, the Proxmark works it’s magic and then you can emulate or clone the card.

Wrong, wrong, wrong. For most cards I’ve encountered anyway.

It’s really not that straight forward, there are different cards with different functionality, some have defaults that make it simple to clone them (if the defaults haven’t been changed), some have good security and there are currently no methods to clone them – unless you’ve already got access keys. Maybe some of the security isn’t that strong but the card type isn’t popular enough to have had people scrutinise it.

I have so far had experience with a few different card types, the only relatively easily cloneable one being the Mifare Classic 1K. Understanding how to clone this card felt like a bit of a trek, but once I got there it didn’t seem like such a big deal. Hopefully this step by step guide means others won’t need to do the trek.

A quick note on cloning a card
Cards typically have their own unique ID (UID). They get written when the card is created and that area of memory is then made read only, so it can’t be changed. If you want a clone of the card then you want both the UID and the data on the card to be copied across to the new card, but this isn’t normally possible due to the UID being read only.

Enter the “UID changeable”, aka “Chinese backdoor” (seriously) cards, which allow you to change their UID. It’s useful to have one of these before progressing.

A good start is to update the device………

Install from the command line (I’m using a Mac here):

> brew tap proxmark/proxmark3
> brew install proxmark3
Connecting to the proxmark:

Change to your proxmark client directory:

> cd proxmark3/client
List modems, e.g. /dev/cu.usbmodem14101 :

> ls /dev/cu*
Connect to the modem show from the last command:

> /proxmark3 /dev/cu.usbmodem14101
The cloning process
You should now have a proxmark command prompt, so with a card on the proxmark, assuming it’s a high frequency card, you can:

