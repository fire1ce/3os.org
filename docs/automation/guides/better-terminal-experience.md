---
title: Better Terminal Experience
description: Better terminal experience installation and configuration guide, for macOS and Linux. Based on zsh, oh-my-zsh with auto suggestions and syntax highlighting.
template: comments.html
tags: [macos, linux, terminal, zsh, oh-my-zsh]
---

# Better Terminal Experience

![Terminal Screenshot][terminal-screenshot-img]

## Introduction

I have been using terminal for a long time, it's one of my essential tools for my everyday work and hobbies.  
The default terminal experience is not very user friendly, and I find it sometimes frustrating to use for basic tasks.  
So I decided to improve my terminal experience for macOS and Linux without too much effort from the user side.  
This guide will help you to install and configure the \*\*better terminal experience in less than 5 minutes.

**Better Terminal Experience** guide based on [ZSH Shell][zsh-url]{target=\_blank} with [Oh My Zsh][ohmyz.sh-url]{target=\_blank} on top of it.  
Using built-in theme called `Bira`, [zsh auto suggestions][zsh-autosuggestions-url]{target=\_blank} plugin that suggests commands as you type based on history and completions and [zsh syntax highlighting][zsh-syntax-highlighting-url]{target=\_blank} plugin that highlighting of commands whilst they are typed at a zsh prompt into an interactive terminal.

### What's ZSH

Z-shell (Zsh) is a Unix shell that can be used as an interactive login shell and as a shell scripting command interpreter. Zsh is an enhanced Bourne shell with many enhancements, including some Bash, ksh and tcsh features.

### What's Oh-My-Zsh

Oh My Zsh is an open source, community-driven framework for managing your [zsh][zsh-url]{target=\_blank} configuration.

## Installation

### Requirements

- git
- zsh
- wget

Install the following requirements packages with the following commands:

=== "Linux apt example"

    ```shell
    apt install -y git zsh wget
    ```

=== "MacOS homebrew example"

    ```shell
    brew install git wget zsh
    ```

### Oh My Zsh

We can proceed to install Oh My Zsh with the following command:

```shell
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

Answer **Yes** when asked to change the default shell to zsh.

Install Autosuggestions, Syntax-Highlighting Plugins using git clone:

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
```

## Configuration

Oh My Zsh crates a default configuration file called `.zshrc` in the user's home directory.

We need to edit the configuration file. You can use any editor to edit the file.

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
plugins=(git colored-man-pages docker docker-compose iterm2 node npm brew colorize macos pip pyenv virtualenv adb aws command-not-found zsh-autosuggestions zsh-syntax-highlighting)
```

The autosuggestions plugin has a bug with copy and paste so there is a workaround for that.  
Append the following to the end of the config to activate the workaround.

```shell
## Fix for Slow zsh-autosuggestions copy&paste
autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
zstyle ':bracketed-paste-magic' active-widgets '.self-*'
```

Save and exit the file.  
Open new terminal window and enjoy Better Terminal Experience!

## Bonus: Personal Theme, preconfigured

I've made a personal theme **3os** based on the **Bira** theme with some tweaks.

![Personal Terminal Screenshot][personal-terminal-screenshot-img]

!!! Danger

    **The following commands will overwrite your current config if exists.**

    **Make sure you have a backup of your config before proceeding!!!**

```shell
wget -O ~/.oh-my-zsh/themes/3os.zsh-theme https://3os.org/assets/zsh/3os.zsh-theme
wget -O ~/.zshrc https://3os.org/assets/zsh/zshrc_config
```

<!-- appendices -->

[zsh-url]: https://www.zsh.org/ 'ZSH'
[ohmyz.sh-url]: https://ohmyz.sh/ 'Oh-My-Zsh'
[zsh-autosuggestions-url]: https://github.com/zsh-users/zsh-autosuggestions 'ZSH Autosuggestions github page'
[zsh-syntax-highlighting-url]: https://github.com/zsh-users/zsh-syntax-highlighting 'ZSH Syntax-Highlighting github page'
[iterm2-url]: https://iterm2.com/ 'iTerm2 homepage'
[homebrew-url]: https://brew.sh/ 'Homebrew homepage'
[terminal-screenshot-img]: ../../assets/images/a0514d0c-abca-11ec-93a6-ffaf1c727a0d.jpg 'Terminal Screenshot'
[personal-terminal-screenshot-img]: ../../assets/images/0e1913a6-0616-11ed-872f-4f150aadb6cd.jpg 'Personal Terminal Screenshot'

<!-- end appendices -->
