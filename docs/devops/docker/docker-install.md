---
title: Install Docker on Linux, macOS, or Windows
description: Choose the supported Docker installation for Linux, macOS, or Windows and verify Docker Engine and Docker Compose.
template: comments.html
tags: [docker, installation, linux, macos, windows, containers]
---

# Install Docker on Linux, macOS, or Windows

Use Docker's official installer for the operating system. Installation commands change with repositories and supported releases, so this page links directly to the maintained Docker instructions instead of copying a third-party cheat sheet.

## Choose the Correct Docker Package

### macOS

Install [Docker Desktop for Mac](https://docs.docker.com/desktop/setup/install/mac-install/). Choose the Apple silicon or Intel installer that matches the Mac.

### Windows

Install [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/). Check Docker's current Windows and WSL requirements before starting.

### Linux Desktop

[Docker Desktop for Linux](https://docs.docker.com/desktop/setup/install/linux/) provides the desktop application and its managed virtual machine.

### Linux Server

Install Docker Engine from Docker's repository for the exact distribution:

- [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Debian](https://docs.docker.com/engine/install/debian/)
- [Fedora](https://docs.docker.com/engine/install/fedora/)
- [CentOS](https://docs.docker.com/engine/install/centos/)
- [RHEL](https://docs.docker.com/engine/install/rhel/)
- [Raspberry Pi OS](https://docs.docker.com/engine/install/raspberry-pi-os/)

The full platform list is in the [Docker Engine installation documentation](https://docs.docker.com/engine/install/).

Docker states that the `get.docker.com` convenience script is for testing and development, not production. Use the distribution repository instructions for a maintained server installation.

## Verify the Installation

Open a new terminal:

```shell
docker version
docker compose version
```

Run Docker's test image:

```shell
docker run --rm hello-world
```

The command downloads the image, runs it and prints a confirmation before the container exits.

On Linux, the Docker daemon may require `sudo` until the official [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) are completed. Membership in the `docker` group grants root-level privileges; read Docker's warning before enabling it.

## Keep Docker Updated

Use Docker Desktop's update flow on macOS and Windows. On Linux, update Docker through the same official package repository used during installation.

Before a major update, check the release notes and back up data that is not already stored outside the containers.

## Sources

- [Install Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Desktop documentation](https://docs.docker.com/desktop/)
