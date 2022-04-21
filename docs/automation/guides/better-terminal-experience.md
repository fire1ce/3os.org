---
title: Better Terminal Experience
description: Better terminal experience installation and configuration guide, for macOS and Linux. Based on zsh, oh-my-zsh with auto suggestions and syntax highlighting.
template: comments.html
tags: [macos, linux, terminal, zsh, oh-my-zsh]
---

# Better Terminal Experience

![Terminal Screenshot][terminal-screenshot-img]

## Intoduction

I have been using terminal for a long time, it's one of my essential tools for my everyday work and hobbies.  
The default terminal experience is not very user friendly, and I find it sometimes frustrating to use for basic tasks.  
So I decided to make a better terminal experience for macOS and Linux without too much effort from user side.  
This guide will help you to install and configure the \*\*better terminal experience in less than 5 minutes.

**Better Terminal Experience** guide based on [ZSH Shell][zsh-url]{target=\_blank} with [Oh My Zsh][ohmyz.sh-url]{target=\_blank} on top of it.  
Using built-in theme called `Bira`, [zsh auto suggestions][zsh-autosuggestions-url]{target=\_blank} plugin that suggests commands as you type based on history and completions and [zsh syntax highlighting][zsh-syntax-highlighting-url]{target=\_blank} plugin that highlighting of commands whilst they are typed at a zsh prompt into an interactive terminal.

### What's ZSH

Z-shell (Zsh) is a Unix shell that can be used as an interactive login shell and as a shell scripting command interpreter. Zsh is an enhanced Bourne shell with many enhancements, including some Bash, ksh and tcsh features.

### What's Oh-My-Zsh

Oh My Zsh is an open source, community-driven framework for managing your [zsh][zsh-url]{target=\_blank} configuration.

## MacOS Installation

My personal preference is to use [iTerm2][iterm2-url]{target=\_blank} as a replacement for macOS default Terminal.

### Homebrew Package Manager

We need a package manager to install all the required packages. [Homebrew](https://brew.sh/){target=\_blank} is a package manager for macOS. if you don't have it, you can install it with the following command:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Requirements Installation

Using Homebrew, we can install the following packages: zsh, git, wget, zsh-autosuggestions zsh-syntax-highlighting

```shell
brew install git wget zsh zsh-autosuggestions zsh-syntax-highlighting
```

### Oh My Zsh Installation

We can proceed to install Oh My Zsh with the following command:

```shell
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

Answer **Yes** when asked to change the default shell to zsh.

### Oh My Zsh Configuration

Oh My Zsh crates a default configuration file called `.zshrc` in the user's home directory.

We need to eddit the configuration file. You can use any editor to edit the file.

nano example:

```shell
nano ~/.zshrc
```

We need to add or change the following lines to the configuration file:

Find the theme and change it to `bira`

```shell
ZSH_THEME="bira"
```

find the `plugins` and change it to the following:

```shell
plugins=(git colored-man-pages docker docker-compose iterm2 node npm brew pip colorize macos pyenv colorize adb aws command-not-found virtualenv poetry)
```

Since we have intel and arm based macs the homebrew path is different. So i've made it to load the proper plugins based on the cpu architecture.  
The autosuggestions plugin has a bug with copy and paste so there is a workaround for that.  
Append the following to the end of the config:

```shell
# Loads the plugins from /usr/local for intel based
if [ $(arch) = "i386" ]; then
  source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
  source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

# Loads the plugins from /opt/homebrew/ for arm based
if [ $(arch) = "arm64" ]; then
  source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
  source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

# Fix for Slow zsh-autosuggestions copy&paste
autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
zstyle ':bracketed-paste-magic' active-widgets '.self-*'
```

Save and exit the file.  
Open new terminal windown and enjoy Better Terminal Experience!

## Linux Installation

The instructions bellow are for Debian Linux with **apt** as package manager. If you are using another package manager, just change the commands to install the packages.

### Requirements

- git
- zsh
- wget

Install the following requirements packages with the following commands:

```shell
apt install -y git zsh wget
```

### Oh My Zsh

We can proceed to install Oh My Zsh with the following command:

```shell
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

Answer **Yes** when asked to change the default shell to zsh.

Install Autosuggestions, Syntax-Highlighting Plugins using git clone:

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.zsh/zsh-syntax-highlighting
```

### Auto Config Installation

!!! Danger

    The following commands will overwrite your current config if exists.

    Make sure you have a backup of your config before proceeding!!!

```shell
wget -O ~/.zshrc https://3os.org/assets/zshrc_config
```

For **non root** user eddit the config file:

```shell
nano ~/.zshrc
```

Change the `export ZSH="users-home-dir-path"` to users' home directory path.

```shell
# Path to your oh-my-zsh installation.
export ZSH="/home/${USER}/.oh-my-zsh"
```

### Oh My Zsh Manual Configuration

Oh My Zsh crates a default configuration file called `.zshrc` in the user's home directory.

We need to eddit the configuration file. You can use any editor to edit the file.

nano example:

```shell
nano ~/.zshrc
```

We need to add or change the following lines to the configuration file:

Find the theme and change it to `bira`

```shell
ZSH_THEME="bira"
```

find the `plugins` and change it to the following:

```shell
plugins=(git colored-man-pages docker docker-compose iterm2 node npm brew pip colorize macos pyenv colorize adb aws command-not-found virtualenv poetry)
```

The autosuggestions plugin has a bug with copy and paste so there is a workaround for that.  
Append the following to the end of the config to activate the workaround and to load the plugins:

```shell
## Shell Integration and plugins
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
## Fix for Slow zsh-autosuggestions copy&paste
autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
zstyle ':bracketed-paste-magic' active-widgets '.self-*'
```

Save and exit the file.  
Open new terminal windown and enjoy Better Terminal Experience!

<!-- appendices -->

[zsh-url]: https://www.zsh.org/ 'ZSH'
[ohmyz.sh-url]: https://ohmyz.sh/ 'Oh-My-Zsh'
[zsh-autosuggestions-url]: https://github.com/zsh-users/zsh-autosuggestions 'ZSH Autosuggestions github page'
[zsh-syntax-highlighting-url]: https://github.com/zsh-users/zsh-syntax-highlighting 'ZSH Syntax-Highlighting github page'
[iterm2-url]: https://iterm2.com/ 'iTerm2 homepage'
[homebrew-url]: https://brew.sh/ 'Homebrew homepage'
[terminal-screenshot-img]: /assets/images/a0514d0c-abca-11ec-93a6-ffaf1c727a0d.jpg 'Terminal Screenshot'

<!-- end appendices -->
