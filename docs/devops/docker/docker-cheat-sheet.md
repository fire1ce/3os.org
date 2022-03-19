---
title: Containers Cheat Sheet
description: Docker commands cheat sheet for managing the Docker environment. Docker is an open source platform that can be used to build, submit, and run applications through container
template: comments.html
tags: [docker, cheat-sheet]
---

# Docker Containers Cheat Sheet

Docker is an open source platform that can be used to build, submit, and run applications through container packaging software. Docker has many commands and options and it is very difficult to remember each command. If you're new to Docker, or even experienced Docker, it can be helpful to have a quick reference to the most commonly used Docker commands cheat sheet for managing the Docker environment.

## Common Docker Commands

This is a short summary of the most commonly used Docker commands. You can find more detailed information about Docker and its usage at this page below.

### Show all containers including running and stopped

```shell
docker ps -a
```

### Show docker container logs

```shell
docker logs <container_id>
```

## Get adShell to a container

```shell
docker exec -it <container_id> /bin/bash
```

or

```shell
docker exec -it <container_id> /bin/sh
```

### Find container IP address

{% raw %}

```shell
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container name/id>
```

{% endraw %}

### Copy files into docker container

```shell
docker cp <local file> <container name/id>:<remote file>
```

### Copy files from docker container

```shell
docker cp <container name/id>:<remote file> <local file>
```

### Purging

Purging All Unused or Dangling Images, Containers, Volumes, and Networks Docker provides a single command that will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container):

```shell
docker system prune
```

To additionally remove any stopped containers and all unused images (not just dangling images), add the -a flag to the command:

```shell
docker system prune -a
```

## Installation

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Installation') }}

## Containers

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Containers') }}

## Images

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Images') }}

## Networks

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Networks') }}

## Registry & Repository

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Registry & Repository') }}

## Dockerfile

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Dockerfile') }}

## Links

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Links') }}

## Volumes

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Volumes') }}

## Best Practices

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Best Practices') }}

## Security

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Security') }}

## Tips

{{ external_markdown('https://raw.githubusercontent.com/wsargent/docker-cheat-sheet/master/README.md', '## Tips') }}

## Credit

Thanks to [@wsargent][wsargent-url]{target=\_blank} for creating this cheat sheet.

<!-- appendices -->

[wsargent-url]: https://github.com/wsargent/docker-cheat-sheet

<!-- end appendices -->
