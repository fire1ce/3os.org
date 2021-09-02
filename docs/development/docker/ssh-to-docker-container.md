---
description: How to SSH to docker container with container name or id
---

# SSH to Docker Container

`mysqldb` is an example name of a container. You can use the _CONTAINER ID_ like `439c1bdc0ff2`

```bash
docker exec -it mysqldb "bash"
```

If you get a an error that bash not found use:

```bash
docker exec -it mysqldb "sh"
```

