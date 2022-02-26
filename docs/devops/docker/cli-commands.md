---
description: Docker General useful cli commands, show all containers, update all downloaded images, find container IP, logs, copying files to docker and more...
---

# Docker Cli Commands

## Show all Containers

```bash
docker ps -a
```

## Update All Downloaded Images

```bash
docker images |grep -v REPOSITORY|awk '{print $1}'|xargs -L1 docker pull
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
