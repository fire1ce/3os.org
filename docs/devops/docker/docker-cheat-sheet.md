---
title: Containers Cheat Sheet
description: Docker commands cheat sheet for managing the Docker environment. Docker is an open source platform that can be used to build, submit, and run applications through container
template: comments.html
tags: [docker, cheat-sheet]
---

# Docker Containers Cheat Sheet

Docker is an open source platform that can be used to build, submit, and run applications through container packaging software. Docker has many commands and options and it is very difficult to remember each command. If you're new to Docker, or even experienced Docker, it can be helpful to have a quick reference to the most commonly used Docker commands cheat sheet for managing the Docker environment.

## Show all Containers

```bash
docker ps -a
```

## Update All Downloaded Images

```bash
docker images | grep -v REPOSITORY|awk '{print $1}'| xargs -L1 docker pull
```

## Find Container IP

{% raw %}

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```

{% endraw %}

## Container Specific Logs (to view the output of commands running in container)

```bash
docker logs mysqldb
```

## View Details for Specific Docker

```bash
docker inspect mysqldb_map
```

## Rename a Container

```bash
docker rename CONTAINER NEW_NAME
```

## Copy Files Into Docker Container

```bash
docker cp 1.txt mycontainer:/1.txt
```

## Run Docker to Map Port 9000 to Forward 3306

```bash
docker run -d -p 3306:9000 dockercloud/mysql
```

## Allow Outbound Forwarding for the Container to the World

on the host server run the following command:

```bash
sysctl net.ipv4.conf.all.forwarding=1
iptables -P FORWARD ACCEPT
```

## Starting and Stopping

| Command                               | Description                                         |
| ------------------------------------- | --------------------------------------------------- |
| [docker start][docker-start-url]      | Starts a container so it is running.                |
| [docker stop][docker-stop-url]        | Stops a running container.                          |
| [docker restart][docker-restart-url]  | Stops and starts a container.                       |
| [docker pause][docker-pause-url]      | Pauses a running container, "freezing" it in place. |
| [docker unpause][docker-unpause-url]  | Will unpause a running container.                   |
| [docker wait blocks][docker-wait-url] | Until running container stops.                      |
| [docker kill][docker-kill-url]        | Sends a SIGKILL to a running container.             |
| [docker attach][docker-attach-url]    | Will connect to a running container.                |

[docker-start-url]: https://docs.docker.com/engine/reference/commandline/start/
[docker-stop-url]: https://docs.docker.com/engine/reference/commandline/stop/
[docker-restart-url]: https://docs.docker.com/engine/reference/commandline/restart/
[docker-pause-url]: https://docs.docker.com/engine/reference/commandline/pause/
[docker-unpause-url]: https://docs.docker.com/engine/reference/commandline/unpause/
[docker-wait-url]: https://docs.docker.com/engine/reference/commandline/wait/
[docker-kill-url]: https://docs.docker.com/engine/reference/commandline/kill/
[docker-attach-url]: https://docs.docker.com/engine/reference/commandline/attach/

## Lifecycle

| Command                            | Description                                      |
| ---------------------------------- | ------------------------------------------------ |
| [docker create][docker-create-url] | Creates a container but does not start it.       |
| [docker rename][docker-rename-url] | Allows the container to be renamed.              |
| [docker run][docker-run-url]       | Creates and starts a container in one operation. |
| [docker rm][docker-rm-url]         | Deletes a container.                             |
| [docker update][docker-update-url] | Updates a container's resource limits.           |

[docker-create-url]: https://docs.docker.com/engine/reference/commandline/create/
[docker-rename-url]: https://docs.docker.com/engine/reference/commandline/rename/
[docker-run-url]: https://docs.docker.com/engine/reference/commandline/run/
[docker-rm-url]: https://docs.docker.com/engine/reference/commandline/rm/
[docker-update-url]: https://docs.docker.com/engine/reference/commandline/update/
