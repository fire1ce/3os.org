---
description: Android Penetration Testing - guide for installing and using frida server on android for bypassing SSL Pinning
---

# Frida Server for SSL Pinning Bypass

## Requirements

-   Rooted Adnroid Phone
-   Python 3
-   pip(pip3)

Install Frida framework, objection to your host

```bash
pip3 install frida-tools
pip3 install objection
```

Download [Frida Server](https://github.com/frida/frida/releases)
Extract and Rename the file to _frida-server_
Move the file to the Adnroid Phone to **/data/local/tmp/**

Connect to adb shell to the android device

```bash
adb shell
```

Change to Root

```bash
su
```

Check if you are root

```bash
whoami
```

Change permissions to the /data/local/tmp/frida-server to be able to run the server

```bash
chmod 755 /data/local/tmp/frida-server
```

Run the Frida Server in background:

```bash
/data/local/tmp/frida-server
```

!!! warning
    Do no close the terminal

Go Back to Host Terminal
List all the Applications and find the name of the desired application you want to by bypass SSL Pinning

```bash
frida-ps -Ua
```

Now Run with the name of the application

```bash
objection -g c**********n explore -q
```

Now remove the SSL Pining with

```bash
android sslpinning disable
```

## Set Proxy for Applciation with frida and objection

```bash
android proxy set 192.168.5.102 8081
```
