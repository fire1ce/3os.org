---
title: Docker Security Best Practices
description: Practical Docker security baseline for images, builds, containers, secrets, privileges, and the Docker daemon.
template: comments.html
tags: [docker, security, containers]
---

# Docker Security Best Practices

Containers share the host kernel. Docker adds isolation, but a container is not a security boundary you can forget about after deployment. This is the short baseline I check before running a workload.

## Start with the image

- Use a trusted base image and keep it updated.
- Pin versions or image digests where repeatable deployment matters.
- Keep the image small and remove build tools from the final stage.
- Use `.dockerignore` so credentials, Git history, and local files do not enter the build context.
- Scan the built image and review the result before release.

## Do not bake in secrets

Do not pass passwords or tokens through Dockerfile `ARG` or `ENV`. Docker documents that those values can persist in image metadata or layers.

Use a BuildKit secret mount for build-time credentials:

```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=build_token \
    command-that-reads /run/secrets/build_token
```

Pass the secret only for that build:

```shell
docker build --secret id=build_token,src=./build-token.txt .
```

For runtime data, use the secret mechanism supported by your deployment platform and grant it only to the service that needs it.

## Drop privileges

If the application can run without root, set a non-root user in the Dockerfile:

```dockerfile
USER app
```

At runtime:

- Do not use `--privileged` unless the workload genuinely needs full device access.
- Add only the Linux capabilities the process needs.
- Use a read-only root filesystem where the application supports it.
- Set CPU, memory, and process limits for exposed services.
- Consider Docker Rootless mode when its limitations fit the host.

The `docker` Unix group gives root-level control over the daemon. Treat membership in that group as privileged access.

## Reduce exposure

- Publish only required ports. Bind administrative services to a trusted interface or `127.0.0.1` when they are local-only.
- Put related containers on a user-defined network instead of the default bridge.
- Never expose an unauthenticated Docker daemon TCP socket.
- Keep Docker Engine, the host kernel, images, and application dependencies patched.

## Quick review

```shell
docker image inspect image-name
docker container inspect container-name
docker network inspect network-name
docker info
```

These commands do not prove that a deployment is secure, but they show the actual user, mounts, capabilities, ports, networks, and daemon security options you need to review.

## Sources

- [Docker Engine security][docker-security]
- [Docker Rootless mode][docker-rootless]
- [Docker build secrets][docker-secrets]
- [Docker build best practices][docker-build]

<!-- appendices -->

[docker-security]: https://docs.docker.com/engine/security/
[docker-rootless]: https://docs.docker.com/engine/security/rootless/
[docker-secrets]: https://docs.docker.com/build/building/secrets/
[docker-build]: https://docs.docker.com/build/building/best-practices/

<!-- end appendices -->
