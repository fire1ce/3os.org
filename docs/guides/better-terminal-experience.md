---
description: short guide for better terminal experience for macOS/Linux using Oh-My-Zsh, Bira Theme Autosuggestions, and Highlight plugins.
---

# Better Terminal Experience - Oh-My-Zsh + Bira Theme + Autosuggestions

This is a short guide for better terminal experience for macOS/Linux using `Oh-My-Zsh`, `Bira Theme`, `Autosuggestions` and `Highlight` plugins.

## MacOS Installation with iTerm2 and Homebrew

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/guides/better-terminal-experience/linuxTerminal.png" alt="terminal screenshot">
</div>

First of all we need to install [**Homebrew**](https://brew.sh/)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

This will install all the necessary requirements:

```bash
brew tap homebrew/cask-fonts
brew install zsh-autosuggestions zsh-syntax-highlighting git wget zsh iterm2 font-fira-code-nerd-font 
```

Install [**Oh-My-Zsh**](https://github.com/robbyrussell/oh-my-zsh)

```bash
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

**~/.zshrc Config Modifications for MacOS**

Theme:

```bash
ZSH_THEME="bira"
```

Plugins

```bash
plugins=(git colored-man-pages docker docker-compose iterm2 node npm brew pip colorize macos pyenv colorize adb aws)
```

Add this to the the end of ~/.zshrc

```bash
# Shell Integration and plugins
source "${HOME}/.iterm2_shell_integration.zsh"

if [ $(arch) = "i386" ]; then
  source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
  source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

if [ $(arch) = "arm64" ]; then
  source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
  source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
fi
# Fix for Slow zsh-autosuggestions copy&paste
autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
zstyle ':bracketed-paste-magic' active-widgets '.self-*'
```

## Linux Installation

Requirements:

-   git
-   zsh
-   wget

The example below uses **apt** package manager (change to your package manager accordingly)

Install the Requirements

```bash
apt install -y git zsh wget
```

Install [Oh-My-Zsh](https://github.com/robbyrussell/oh-my-zsh)

```bash
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

Install Autosuggestions, Syntax-Highlighting Plugins

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.zsh/zsh-syntax-highlighting
```

**~/.zshrc Auto Config Modifications**

Auto:

```bash
wget https://3os.org/assets/zshrc_config
mv zshrc_config ~/.zshrc
```

**~/.zshrc Manual Config Modifications**



Manual:

Theme:

```bash
ZSH_THEME="bira"
```

Plugins

```bash
plugins=(git colored-man-pages docker docker-compose iterm2 node npm brew pip colorize macos pyenv colorize adb aws)
```

Add this to the the end of ~/.zshrc

```bash
## Shell Integration and plugins
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
## Fix for Slow zsh-autosuggestions copy&paste
autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
zstyle ':bracketed-paste-magic' active-widgets '.self-*'
```
