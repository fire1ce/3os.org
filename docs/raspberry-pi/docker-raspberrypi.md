---
description: How to install Docker and Docker-compose on Raspberry Pi
---

# Docker and Docker-compose on Raspberry Pi

## How to install docker on Raspberry Pi

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker pi
```

### Manage Docker as a non-root user

The Docker daemon binds to a Unix socket instead of a TCP port. By default that Unix socket is owned by the user root and other users can only access it using sudo. The Docker daemon always runs as the root user.

If you don’t want to preface the docker command with sudo, create a Unix group called docker and add users to it. When the Docker daemon starts, it creates a Unix socket accessible by members of the docker group.

!!! warning
    The docker group grants privileges equivalent to the root user.

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

## How to install docker-compose on Raspberry Pi

!!! note
    Docker must be installed

```bash
sudo apt install docker-compose
```
