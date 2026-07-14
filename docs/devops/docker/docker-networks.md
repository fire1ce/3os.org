---
title: Docker Networks Cheat Sheet
description: Create, inspect, connect, disconnect, and remove Docker networks with current Docker CLI examples.
template: comments.html
tags: [docker, networking, cheat-sheet]
---

# Docker Networks Cheat Sheet

Docker creates `bridge`, `host`, and `none` networks on a typical Engine installation. For normal multi-container applications, I use a user-defined bridge: containers on it can resolve each other by container name and stay isolated from unrelated networks.

## List and inspect networks

```shell
docker network ls
docker network inspect app-net
```

Show the network used by a container:

```shell
docker inspect app
```

Look under `NetworkSettings.Networks` in the output.

## Create a bridge network

```shell
docker network create app-net
```

Docker uses the `bridge` driver when no driver is specified. To choose an address range:

```shell
docker network create \
  --driver bridge \
  --subnet 172.28.0.0/16 \
  app-net
```

Use a subnet that does not overlap the host, VPN, or other Docker networks.

## Start and connect containers

Start a container directly on the network:

```shell
docker run -d --name web --network app-net nginx
```

Connect an existing container:

```shell
docker network connect app-net api
```

Containers can belong to more than one network. Disconnect one when the path is no longer needed:

```shell
docker network disconnect app-net api
```

## Isolate a network from external routes

An internal network allows connected containers to communicate with each other but does not give them the normal external route:

```shell
docker network create --internal backend-net
```

This is useful for a database or internal service. It does not replace application authentication or host firewall rules.

## Remove networks

Disconnect or remove dependent containers first, then remove the network:

```shell
docker network rm app-net
```

Remove every unused custom network:

```shell
docker network prune
```

Review the prompt before confirming. The default `bridge`, `host`, and `none` networks are not removed.

## Docker Compose example

Compose creates a project network automatically. Declare networks when you want a clear frontend/backend boundary:

```yaml
services:
  web:
    image: nginx
    networks: [frontend]

  api:
    image: example/api
    networks: [frontend, backend]

  db:
    image: postgres
    networks: [backend]

networks:
  frontend: {}
  backend:
    internal: true
```

Legacy container links are not needed for this setup. User-defined networks provide name-based service discovery.

## Sources

- [Docker network command reference][docker-network]
- [Docker bridge network driver][docker-bridge]
- [Docker Compose networks reference][compose-networks]

<!-- appendices -->

[docker-network]: https://docs.docker.com/reference/cli/docker/network/
[docker-bridge]: https://docs.docker.com/engine/network/drivers/bridge/
[compose-networks]: https://docs.docker.com/reference/compose-file/networks/

<!-- end appendices -->
