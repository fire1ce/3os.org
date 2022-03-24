---
title: Watchtower
description: Watchtower is a container-based solution for automating Docker container base image updates. Watchtower will monitor your running Docker containers and watch for changes to the images that those containers were originally started from.
template: comments.html
tags: [docker, container, watchtower]
---

# Watchtower

![Watchtower logo][watchtower-logo-img]{: style="width:300px"}

## Quick Start

{{ external_markdown('https://raw.githubusercontent.com/containrrr/watchtower/main/docs/index.md', '## Quick Start') }}

## What is Watchtower?

Watchtower is an application that will monitor your running Docker containers and watch for changes to the images that those containers were originally started from. If watchtower detects that an image has changed, it will automatically restart the container using the new image.

With watchtower you can update the running version of your containerized app simply by pushing a new image to the Docker Hub or your own image registry. Watchtower will pull down your new image, gracefully shut down your existing container and restart it with the same options that were used when it was deployed initially.

Full documanation can be found at [Watchtower Documentation][watchtower-docs-url]{target=\_blank}.  
Github repo can be found at [Watchtower Github Repository][watchtower-github-url]{target=\_blank}.

## Run Ones

You can run Watchtower run `once` to force an update of a containers by running the following command:

```bash
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once
```

## Docker Compose Example

Blow is and example of a docker-compose.yml file that uses watchtower to automatically update your running containers at 3:30 AM every day, sending notifications to `Telegram` with `shoutrrr`

```yaml
version: '3'

services:
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    hostname: port-watchtower
    restart: always
    network_mode: bridge
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /etc/localtime:/etc/localtime
    environment:
      - WATCHTOWER_NOTIFICATIONS=shoutrrr
      - WATCHTOWER_NOTIFICATION_URL=telegram://<Bot-api-token>@telegram/?channels=<channel-id>
    command: --schedule '0 30 3 * * *' --cleanup
```

<!-- appendices -->

[watchtower-logo-img]: /assets/images/ff061dba-a7a0-11ec-bba5-d7f313e92b3a.png 'Watchtower logo'
[watchtower-docs-url]: https://containrrr.dev/watchtower/
[watchtower-github-url]: https://github.com/containrrr/watchtower

<!-- end appendices -->
