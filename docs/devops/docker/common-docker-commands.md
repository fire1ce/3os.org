---
title: Common Docker Commands
description: This is a short summary of the most commonly used Docker commands. If you're new to Docker, or even experienced Docker, it can be helpful to have a quick reference to the most commonly used Docker commands for managing the Docker environment
template: comments.html
tags: [docker, cheat-sheet]
---

# Common Docker Commands

This is a short summary of the most commonly used Docker commands. If you're new to Docker, or even experienced Docker, it can be helpful to have a quick reference to the most commonly used Docker commands for managing the Docker environment.

## Show all Containers Including Running and Stopped

```shell
docker ps -a
```

## Show Docker Container Logs

```shell
docker logs <container_id>
```

## Get Into Container Shell

```shell
docker exec -it <container_id> /bin/bash
```

or

```shell
docker exec -it <container_id> /bin/sh
```

## Stoping Containers

```shell
docker stop <container_id>
```

foce stop with `kill`

```shell
docker kill <container_id>
```

## Removing Containers

```shell
docker rm <container_id>
```

force remove

```shell
docker rm -f <container_id>
```

## Find Container IP Address

{% raw %}

```shell
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container name/id>
```

{% endraw %}

## Copy Files into Docker Container

```shell
docker cp <local file> <container name/id>:<remote file>
```

## Copy Files from Docker Container

```shell
docker cp <container name/id>:<remote file> <local file>
```

## Purging

Purging All Unused or Dangling Images, Containers, Volumes, and Networks Docker provides a single command that will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container):

```shell
docker system prune
```

To additionally remove any stopped containers and all unused images (not just dangling images), add the -a flag to the command:

```shell
docker system prune -a
```

## Monitor System Resource Utilization for Running Containers

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '### Monitor system resource utilization for running containers') }}

## Credit

Thanks to [@wsargent][wsargent-url]{target=\_blank} for creating this cheat sheet.

<!-- appendices -->

[wsargent-url]: https://github.com/wsargent/docker-cheat-sheet

<!-- end appendices -->
