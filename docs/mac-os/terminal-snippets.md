---
title: Terminal Snippets
description: Terminal usage snippets for macOS. This is a collection of snippets that I use without specific category.
template: comments.html
tags: [template, markdown]
---

# Terminal Snippets

Terminal usage snippets for macOS. This is a collection of snippets that I use without specific category.

## Install macOS Updates via CLI

```shell
softwareupdate -i -a
```

## Install Command Line Tools

```shell
xcode-select --install
```

## Shell Safe rm

Source [shell-safe-rm github](https://github.com/kaelzhang/shell-safe-rm/blob/master/README.md)

A much safer replacement of shell `rm` with _ALMOST FULL_ features of the origin `rm` command.

Initially developed on Mac OS X, then tested on Linux.

Using `safe-rm`, the files or directories you choose to remove will move to `$HOME/.Trash` instead of simply deleting them. You could put them back whenever you want manually.

If a file or directory with the same name already exists in the Trash, the name of newly-deleted items will be ended with the current date and time.

Install with npm:

```shell
npm i -g safe-rm
```

Add Alias to your _zshrc_ config

```shell
alias rm='safe-rm'
```

## Disable StrictHostKeyChecking in SSH

To disable strict host checking on OS X for the current user,
create or edit `~/.ssh/ssh_config` and add the following lines:

```shell
StrictHostKeyChecking no
```

## Set macOS Hostname via CLI

```shell
sudo scutil --set HostName <NewHostNameHere>
```

## Syntax Highlighting for Nano

Install Nano from homebrew
Create `~/.nanorc` file with the syntax below

```shell
brew install nano
touch ~/.nanorc
```

Edit `~/.nanorc` file with the syntax below

!!! Example ""

    === "M1 (ARM)"

        ```shell
        echo 'include "/opt/homebrew/share/nano/*.nanorc"' >> ~/.nanorc
        ```

    === "Intel Based"

        ```shell
        echo 'include "/usr/local/share/nano/*.nanorc"' >> ~/.nanorc
        ```

## Disable/Enable Gatekeeper

Disable Gatekeeper

```shell
sudo spctl --master-disable
```

Enable Gatekeeper

```shell
sudo spctl --master-enable
```

Check Status

```shell
spctl --status
```

## Disable/Enable SIP (System Integrity Protection)

Reboot your Mac into Recovery Mode by restarting your computer and holding down **Command+R** until the Apple logo appears on your screen.  
Click _Utilities > Terminal._  
In the Terminal window, type in:

Status:

```shell
csrutil status
```

Disable:

```shell
csrutil disable
```

Enable:

```shell
csrutil enable
```

Press Enter and restart your Mac.

## Installing rbenv (ruby send box) - Ruby alternative to the one that macOS uses

Install rbenv with brew

```shell
brew install rbenv
```

Add eval `"$(rbenv init -)"` to the end of `~/.zshrc` or `~/.bash_profile`

Install a ruby version

```shell
rbenv install 2.3.1
```

Select a ruby version by rbenv

```shell
rbenv global 2.3.1
```

Open a new terminal window

Verify that the right gem folder is being used with `gem env home`(should report something in your user folder not system wide)

## List listening Ports and Programs and Users _(netstat like)_

```shell
sudo lsof -i -P | grep -i "listen"
```

## Disable "last login" at Terminal

```shell
cd ~/
touch .hushlogin
```

## Fix Missing **/Users/Shared** Folder

Create he missing /Users/Shared folder

```shell
sudo mkdir -p /Users/Shared/
```

Fix permissions for the /Users/Shared folder

```shell
sudo chmod -R 1777 /Users/Shared
```

## iTerm2

Using Alt/Cmd + Right/Left Arrow in iTerm2

Go to `iTerm Preferences` → `Profiles`, select your profile, then the `Keys` tab. click `Load Preset`... and choose `Natural Text Editing`.

Remove the Right Arrow Before the Cursor Line

you can turn it off by going in to `Preferences` > `Profiles` > (your profile) > `Terminal`, scroll down to `Shell Integration`, and turn off `Show mark indicators`.

## Clear Google Drive cache

```shell
rm -rf ~/Library/Application\ Support/Google/DriveFS/[0-9]*
```
