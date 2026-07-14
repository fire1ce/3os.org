---
title: vGPU Split Passthrough
description: Proxmox vGPU split passthrough to VM configuration for hardware acceleration.
template: comments.html
tags: [proxmox, vgpu, passthrough]
---

# vGPU Split Passthrough (Nvidia)

## Credit and Thanks

Thanks to [@polloloco][polloloco-url]{target=\_blank} for creating and maintaining this guide.

Official GitLab repository: [polloloco/vgpu-proxmox][vgpu-proxmox-url]{target=\_blank}

## RTX 30xx and 40xx Compatibility { #your-rtx-30xx-or-40xx-will-not-work-at-this-point-in-time }

!!! warning

    Consumer GeForce RTX 30- and 40-series GPUs are not supported by the upstream method. NVIDIA-qualified vGPU models are the exception; follow the NVIDIA documentation linked from the embedded guide for those cards.

## NVIDIA vGPU with the GRID

{{ external_markdown('https://gitlab.com/polloloco/vgpu-proxmox/-/raw/master/README.md', '') }}

<!-- appendices -->

[polloloco-url]: https://gitlab.com/polloloco 'polloloco GitLab Page'
[vgpu-proxmox-url]: https://gitlab.com/polloloco/vgpu-proxmox 'vgpu-split-passthrough GitLab Page'
[video tutorial to find the right driver]: https://gitlab.com/polloloco/vgpu-proxmox/-/raw/master/downloading_driver.mp4
[downloading_driver.mp4]: https://gitlab.com/polloloco/vgpu-proxmox/-/raw/master/downloading_driver.mp4

<!-- end appendices -->
