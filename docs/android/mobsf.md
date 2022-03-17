---
title: MobSF
description: Mobile Security Framework (MobSF) is an automated, all-in-one mobile application (Android/iOS/Windows) pen-testing, malware analysis and security assessment framework capable of performing static and dynamic analysis.
template: comments.html
tags: [android, penetration-testing]
---

# Mobile Security Framework (MobSF)

Mobile Security Framework (MobSF) is an automated, all-in-one mobile application (Android/iOS/Windows) pen-testing, malware analysis and security assessment framework capable of performing static and dynamic analysis. MobSF support mobile app binaries (APK, XAPK, IPA & APPX) along with zipped source code and provides REST APIs for seamless integration with your CI/CD or DevSecOps pipeline.The Dynamic Analyzer helps you to perform runtime security assessment and interactive instrumented testing.

Follow the projet at github: [MobSF/Mobile-Security-Framework-MobSF][mobsf-url]{target=\_blank}

![mobsf webgui][mobsf-webgui-img]

## Running MobSF as Docker

Below is a `docker run` command for running MobSF as a Docker container.

```shell
docker run \
-d \
-it \
-v /root/tools/mobSF:/root/.MobSF \
-h mobsf \
--name mobsf \
--restart always \
-p 8005:8000 \
opensecurity/mobile-security-framework-mobsf:latest
```

docker compose example for `docker-compose.yml`:

```yaml
version: '2.4'

services:
  mobsf:
    image: opensecurity/mobile-security-framework-mobsf
    container_name: mobsf
    hostname: mobsf
    restart: always
    network_mode: bridge
    volumes:
      - ./:/root/.MobSF
      - /etc/localtime:/etc/localtime
    ports:
      - '1337:1337'
      - '8000:8000'
```

<!-- appendices -->

[mobsf-url]: https://github.com/MobSF/Mobile-Security-Framework-MobSF
[mobsf-webgui-img]: /assets/images/6f0ec169-8a64-4019-9bbb-c0f542c00972.png 'mobsf webgui'

<!-- end appendices -->
