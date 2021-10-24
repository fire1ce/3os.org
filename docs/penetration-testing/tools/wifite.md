---
description: Wifite is an automated wireless attack tool. You will find a series of practical example commands for running Wifite and getting the most of this powerful tool.
---


# Wifite

Wifite is an automated wireless attack tool.

[Wifite2 Github page](https://github.com/derv82/wifite2){target=_blank}

In order to perform wifi attacks you need a wifi card with `Monitor Mode` and `Frame Injection` like Realtek  rtl8812au chipset.

Suggested Wifi Dongles

* [Alfa AWUS036ACH](https://amzn.to/3jwqhWk){target=_blank}
* [Alfa AC1900](https://amzn.to/3m4mm4F){target=_blank}
* [1200Mbps USB WiFi Adapter](https://amzn.to/2ZcK7i2){target=_blank}
* [Alfa AWUS036ACS](https://amzn.to/3GkQDEG){target=_blank}

## Install in kali

```bash
apt install wifite
```

## Install Pyrit for Wifite

[Pyrit Github page](https://github.com/JPaulMora/Pyrit/wiki){target=_blank}

Install dependencies

```bash
apt install python zlib openssl git
```

The Install

```bash
cd ~
git clone https://github.com/JPaulMora/Pyrit.git;
pip install psycopg2 scapy;
cd Pyrit
python setup.py clean;
python setup.py build;
python setup.py install;
rm -rf ~/Pyrit
```
