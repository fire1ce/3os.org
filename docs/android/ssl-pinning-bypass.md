---
title: SSL Pinning Bypass
description: Android SSL Pinning bypass using Frida. Frida is dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers.
template: comments.html
tags: [android, frida, ssl-pinning]
---

# Android SSL Pinning Bypass with Frida

## Whats SSL Pinning?

Android app establishes an HTTPS connection, it checks the issuer of the server's certificate against the internal list of trusted Android system certificate authorities to make sure it is communicating with a trusted server. This is called SSL Pinning. If the server's certificate is not in the list of trusted certificates, the app won't be able to communicate with the server.

## Whats Frida?

Frida is dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers. It is a powerful tool that allows you to modify Android applications and libraries without having to recompile them.

## Requirements

- Rooted Adnroid Phone
- Python 3
- pip(pip3)

## Installation

Install Frida framework, objection to your **host** os.

```bash
pip install frida-tools
pip install objection
```

Download the proper version from: [Frida Server Downloads][frida-releases]{target=\_blank}

!!! danger

    Make sure to download the proper version of Frida Server for your Android cpu architecture.
    Alwasys use the latest version of Frida Server and frida-tools

Extract and rename the file to **frida-server**  
Move the file to the Adnroid Phone to **/data/local/tmp/**

## Usage

Connect to adb shell to the android device

For more inforatmati

```bash
adb shell
```

Change user to **Root**

```bash
su
```

Make sure you are running as **root** with the folowing command:

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

    Do no close the terminal - this will stop the Frida Server

Go Back to **host's terminal**  
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

<!-- appendices -->

[frida-releases]: https://github.com/frida/frida/releases

<!-- end appendices -->
