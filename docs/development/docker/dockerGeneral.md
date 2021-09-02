---

description: Docker General useful commands tips, SSH to a Docker Container, Update All Downloaded Docker Container Images, Purging All Unused or Dangling Docker Container Images, Create mysql Docker with Mapping to Host
---
# Docker

## Update All Downloaded Images

```bash
docker images |grep -v REPOSITORY|awk '{print $1}'|xargs -L1 docker pull
```

## Purging All Unused or Dangling Images

Purging All Unused or Dangling Images, Containers, Volumes, and Networks
Docker provides a single command that will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container):

```bash
docker system prune
```

To additionally remove any stopped containers and all unused images (not just dangling images), add the -a flag to the command:

```bash
docker system prune -a
```

## Portainer.io Docker UI management

[Portainer.io](https://portainer.io/)

## Find Container IP

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```

## Show all Containers

```bash
docker ps -a
```

## Create mysql Docker with Mapping to Host

```bash
docker run --name mysqldb -v /data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="qweQWE123" -p 3306:3306 -it mysql/mysql-server:5.7
```

## Exit Container Without Closing It

```bash
crtl+shift+D
```

## Container Specific Logs (to view the output of commands running in container)

```bash
docker logs mysqldb
```

## Create Volume and Map Container to it

```bash
docker volume create vol1
docker run --name mysqldb_map -v vol1:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="qweQWE123" -p 3306:3306 -it mysql/mysql-server:5.7
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
