---
title: Mifare Classic 1K ISO14443A
description: How to clone Mifare Classic 1K ISO14443A NFC Tag with proxmark3
template: comments.html
tags: [pt, tools, rfid]
---

# Clone Mifare Classic 1K ISO14443A

## Read Mifare ISO14443A Basic Information

```shell
proxmark3> hf search
```

Which results in a response along the lines of:

```shell
 #db# DownloadFPGA(len: 42096)
 UID : de 0f 3d cd
ATQA : 00 04
 SAK : 08 [2]
TYPE : NXP MIFARE CLASSIC 1k | Plus 2k SL1
proprietary non iso14443-4 card found, RATS not supported
No chinese magic backdoor command detected
Prng detection: HARDENED (hardnested)
Valid ISO14443A Tag Found - Quiting Search
```

As we can see the output `ISO14443A Tag Found` it's `Mifare 1k` card.

This also shows us the UID `de0f3dcd` of the card, which we’ll need later.

## Find and Extract the 32 Keys From The Mifare ISO14443A

From there we can find keys in use by checking against a list of default keys (hopefully one of these has been used)

```shell
proxmark3> hf mf chk * ?
```

This should show us the key we require looking something like

```shell hl_lines="16 19"
No key specified, trying default keys
chk default key[ 0] ffffffffffff
chk default key[ 1] 000000000000
chk default key[ 2] a0a1a2a3a4a5
chk default key[ 3] b0b1b2b3b4b5
chk default key[ 4] aabbccddeeff
chk default key[ 5] 4d3a99c351dd
chk default key[ 6] 1a982c7e459a
chk default key[ 7] d3f7d3f7d3f7
chk default key[ 8] 714c5c886e97
chk default key[ 9] 587ee5f9350f
chk default key[10] a0478cc39091
chk default key[11] 533cb6c723f6
chk default key[12] 8fd0a4f256e9
--sector: 0, block:  3, key type:A, key count:13
Found valid key:[ffffffffffff]
...omitted for brevity...
--sector:15, block: 63, key type:B, key count:13
Found valid key:[ffffffffffff]
```

If you see ==Found valid key==:[ffffffffffff]

This shows a key of `ffffffffffff`, which we can plug into the next command, which dumps keys to file `dumpkeys.bin`.

```shell
proxmark3> hf mf nested 1 0 A ffffffffffff d
```

If you see see an a table like this in output without `valid key`

```shell
|---|----------------|---|----------------|---|
|sec|key A           |res|key B           |res|
|---|----------------|---|----------------|---|
|000|  a0a1a2a3a4a5  | 1 |  ffffffffffff  | 0 |
|001|  ffffffffffff  | 0 |  ffffffffffff  | 0 |
|002|  a0a1a2a3a4a5  | 1 |  ffffffffffff  | 0 |
|003|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|004|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|005|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|006|  ffffffffffff  | 1 |  ffffffffffff  | 0 |
|007|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|008|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|009|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|010|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|011|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|012|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|013|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|014|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|015|  ffffffffffff  | 1 |  ffffffffffff  | 1 |
|---|----------------|---|----------------|---|
```

In this case use `002` key like this

```shell
proxmark3> hf mf nested 1 0 A a0a1a2a3a4a5 d
```

Now you should be able to dump the contents of the 32 keys from the original card.
This dumps data from the card into `dumpdata.bin`

```shell
proxmark3> hf mf dump
```

## Clone Mifare ISO14443A Using The Dumped Keys

At this point we’ve got everything we need from the card, we can take it off the reader.

To copy that data onto a new card, place the [(Chinese backdoor) card](https://amzn.to/2XdKnfv){target=\_blank} on the [Proxmark](https://amzn.to/3AcCQvL){target=\_blank}.

This restores the dumped data onto the new card. Now we just need to give the card the UID we got from the original hf search command

```shell
proxmark3> hf mf restore 1
```

Copy the UID of the original card `de0f3dcd`

```shell
proxmark3> hf mf csetuid de0f3dcd
```

We’re done.

<!-- appendices -->

<!-- urls -->

[common-keys]: /assets/pages/proxmark/commonkeys.txt 'common-keys'

<!-- images -->

<!--css-->

<!-- end appendices -->
