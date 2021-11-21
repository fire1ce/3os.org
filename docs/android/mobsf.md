---
description: Mobile Security Framework (MobSF) is an automated, all-in-one mobile application (Android/iOS/Windows) pen-testing, malware analysis and security assessment framework capable of performing static and dynamic analysis. MobSF support mobile app binaries (APK, XAPK, IPA & APPX) along with zipped source code and provides REST APIs for seamless integration with your CI/CD or DevSecOps pipeline.The Dynamic Analyzer helps you to perform runtime security assessment and interactive instrumented testing.
---

# Mobile Security Framework (MobSF)

Mobile Security Framework (MobSF) is an automated, all-in-one mobile application (Android/iOS/Windows) pen-testing, malware analysis and security assessment framework capable of performing static and dynamic analysis. MobSF support mobile app binaries (APK, XAPK, IPA & APPX) along with zipped source code and provides REST APIs for seamless integration with your CI/CD or DevSecOps pipeline.The Dynamic Analyzer helps you to perform runtime security assessment and interactive instrumented testing.

[MobSF/Mobile-Security-Framework-MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF){target=_blank}

<div style="width:100%; margin:0 auto">
   <img src="/assets/images/penetration-testing/android/mobsf.png" alt="mobsf-webgui">
</div>

I'm using the mobSF tool as docker container
change -v path according to your system

```docker
docker run \
-d \
-it \
-v /root/tools/mobSF:/root/.MobSF \
-h mobsf \
--name mobsf \
--restart always \
-e TZ=Asia/Jerusalem \
-p 8005:8000 \
opensecurity/mobile-security-framework-mobsf:latest
```