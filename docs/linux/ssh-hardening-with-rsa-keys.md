---
description: SSH Hardening with RSA Keys
---

# SSH Hardening with RSA Keys

## Generating a new SSH key

RSA 4096

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Ed25519 Algorithm

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## Automatic Copy RSA Key to The Server

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@host
```

## Manually Copy RSA Key to The Server

ssh to the host (`do not close this connection`)

```bash
mkdir -p ~/.ssh && touch .ssh/authorized_keys
```

copy your public key usually located at `~/.ssh/id_rsa.pub`

```bash
echo PUCLICK_Key_STRING >> ~/.ssh/authorized_keys
```

### SSH Hardening - Disable Password Login

edit `/etc/ssh/sshd_config`
change:

```bash
#PasswordAuthentication yes
```

to

```bash
PasswordAuthentication no
```

save&exit

restart ssh service:

```bash
sudo systemctl restart ssh
```

<!-- prettier-ignore-start -->
!!! danger
    Open new SSH season and test login with RSA Keys before __closing__ the existing connection
<!-- prettier-ignore-end -->

---

### Optional: change ssh port

edit `/etc/ssh/sshd_config`
change the port to a desired one

```bash
port 1337
```

save&exit

restart ssh service:

```bash
sudo systemctl restart ssh
```

## Add Privet id_rsa key to Server

copy the id_rsa key to ~/.ssh folder

```bash
cd ~/.ssh
sudo ssh-agent bash
ssh-add id_rsa
```
