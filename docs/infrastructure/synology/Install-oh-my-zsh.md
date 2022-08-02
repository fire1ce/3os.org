---
title: oh-my-zsh on Synology NAS
description: Install oh-my-zsh on Synology NAS (DSM)
template: comments.html
tags: [synology, oh-my-zsh]
---

# How to install oh-my-zsh on Synology NAS

## Introduction

The following steps will instruct you how to install oh-my-zsh on Synology DSM NAS.

### Whats' ZSH

Z-shell (Zsh) is a Unix shell that can be used as an interactive login shell and as a shell scripting command interpreter. Zsh is an enhanced Bourne shell with many enhancements, including some Bash, ksh and tcsh features.

### What's Oh-My-Zsh

Oh My Zsh is an open source, community-driven framework for managing your [zsh][zsh-url]{target=\_blank} configuration.

## Community Packages for Synology DSM

In order to install oh-my-zsh, we need to add 3rd party packages to Synology DSM.
[Synology Community Packages][synocommunity-url]{target=\_blank} provides packages for Synology-branded NAS devices.

DSM 6 and below:

Log into your NAS as administrator and go to Main Menu → Package Center → Settings and set Trust Level to Synology Inc. and trusted publishers.

In the Package Sources tab, click Add, type SynoCommunity as Name and `https://packages.synocommunity.com/` as Location and then press OK to validate.

![syno-community-install][syno-community-install-img]

Go back to the Package Center and enjoy SynoCommunity's packages in the Community tab.

## Install `Z shell (with modules)`

Install `Z shell (with modules)` from package center Community tab.

![Z shell (with modules) package][z-shell-with-modules-package-img]

## Install `Git`

Install `Git` from package center Community tab.

![Git package][git-package-img]

## Change The Default Shell to `ZSH`

The following steps will be performed via SSH

edit `~/.profile` the file may be missing, so create it if it doesn't exist.

```shell
vi ~/.profile
```

Append the codes below to the end of the file or add if empty.

```bash
if [[ -x /usr/local/bin/zsh ]]; then
  export SHELL=/usr/local/bin/zsh
  exec /usr/local/bin/zsh
fi
```

Open new SSH session to Synology NAS the shell should be `zsh`

## Install Oh My Zsh

From new SSH session with `zsh` shell, install Oh My Zsh with the one of following command:

with curl:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

with wget:

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

At this point you should have a working `oh-my-zsh` working on your Synology NAS.

<!-- appendices -->

<!-- urls -->

[zsh-url]: https://www.zsh.org/ 'ZSH'
[ohmyz.sh-url]: https://ohmyz.sh/ 'Oh-My-Zsh'
[synocommunity-url]: https://synocommunity.com/ 'Synology Community Packages'

<!-- images -->

[syno-community-install-img]: /assets/images/e38b4c1c-bbc9-11ec-b13f-033bc9ab9d10.jpg 'SynoCommunity install'
[z-shell-with-modules-package-img]: /assets/images/76a71404-bbca-11ec-847d-87c4502ecefc.jpg 'Z shell (with modules) package'
[git-package-img]: /assets/images/7dcaaea2-f474-11ec-a4a2-57286e786d91.jpg 'git package'

<!-- end appendices -->
