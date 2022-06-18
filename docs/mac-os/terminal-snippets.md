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
        include /opt/homebrew/share/nano/asm.nanorc
        include /opt/homebrew/share/nano/autoconf.nanorc
        include /opt/homebrew/share/nano/awk.nanorc
        include /opt/homebrew/share/nano/c.nanorc
        include /opt/homebrew/share/nano/changelog.nanorc
        include /opt/homebrew/share/nano/cmake.nanorc
        include /opt/homebrew/share/nano/css.nanorc
        include /opt/homebrew/share/nano/debian.nanorc
        include /opt/homebrew/share/nano/default.nanorc
        include /opt/homebrew/share/nano/elisp.nanorc
        include /opt/homebrew/share/nano/fortran.nanorc
        include /opt/homebrew/share/nano/gentoo.nanorc
        include /opt/homebrew/share/nano/go.nanorc
        include /opt/homebrew/share/nano/groff.nanorc
        include /opt/homebrew/share/nano/guile.nanorc
        include /opt/homebrew/share/nano/html.nanorc
        include /opt/homebrew/share/nano/java.nanorc
        include /opt/homebrew/share/nano/javascript.nanorc
        include /opt/homebrew/share/nano/json.nanorc
        include /opt/homebrew/share/nano/lua.nanorc
        include /opt/homebrew/share/nano/makefile.nanorc
        include /opt/homebrew/share/nano/man.nanorc
        include /opt/homebrew/share/nano/mgp.nanorc
        include /opt/homebrew/share/nano/mutt.nanorc
        include /opt/homebrew/share/nano/nanohelp.nanorc
        include /opt/homebrew/share/nano/nanorc.nanorc
        include /opt/homebrew/share/nano/nftables.nanorc
        include /opt/homebrew/share/nano/objc.nanorc
        include /opt/homebrew/share/nano/ocaml.nanorc
        include /opt/homebrew/share/nano/patch.nanorc
        include /opt/homebrew/share/nano/perl.nanorc
        include /opt/homebrew/share/nano/php.nanorc
        include /opt/homebrew/share/nano/po.nanorc
        include /opt/homebrew/share/nano/postgresql.nanorc
        include /opt/homebrew/share/nano/pov.nanorc
        include /opt/homebrew/share/nano/python.nanorc
        include /opt/homebrew/share/nano/ruby.nanorc
        include /opt/homebrew/share/nano/rust.nanorc
        include /opt/homebrew/share/nano/sh.nanorc
        include /opt/homebrew/share/nano/spec.nanorc
        include /opt/homebrew/share/nano/tcl.nanorc
        include /opt/homebrew/share/nano/tex.nanorc
        include /opt/homebrew/share/nano/texinfo.nanorc
        include /opt/homebrew/share/nano/xml.nanorc
        ```

    === "Intel Based"

        ```shell
        ssh-add --apple-use-keychain ~/.ssh/id_rsa
        include /usr/local/share/nano/asm.nanorc
        include /usr/local/share/nano/autoconf.nanorc
        include /usr/local/share/nano/awk.nanorc
        include /usr/local/share/nano/c.nanorc
        include /usr/local/share/nano/changelog.nanorc
        include /usr/local/share/nano/cmake.nanorc
        include /usr/local/share/nano/css.nanorc
        include /usr/local/share/nano/debian.nanorc
        include /usr/local/share/nano/default.nanorc
        include /usr/local/share/nano/elisp.nanorc
        include /usr/local/share/nano/fortran.nanorc
        include /usr/local/share/nano/gentoo.nanorc
        include /usr/local/share/nano/go.nanorc
        include /usr/local/share/nano/groff.nanorc
        include /usr/local/share/nano/guile.nanorc
        include /usr/local/share/nano/html.nanorc
        include /usr/local/share/nano/java.nanorc
        include /usr/local/share/nano/javascript.nanorc
        include /usr/local/share/nano/json.nanorc
        include /usr/local/share/nano/lua.nanorc
        include /usr/local/share/nano/makefile.nanorc
        include /usr/local/share/nano/man.nanorc
        include /usr/local/share/nano/mgp.nanorc
        include /usr/local/share/nano/mutt.nanorc
        include /usr/local/share/nano/nanohelp.nanorc
        include /usr/local/share/nano/nanorc.nanorc
        include /usr/local/share/nano/nftables.nanorc
        include /usr/local/share/nano/objc.nanorc
        include /usr/local/share/nano/ocaml.nanorc
        include /usr/local/share/nano/patch.nanorc
        include /usr/local/share/nano/perl.nanorc
        include /usr/local/share/nano/php.nanorc
        include /usr/local/share/nano/po.nanorc
        include /usr/local/share/nano/postgresql.nanorc
        include /usr/local/share/nano/pov.nanorc
        include /usr/local/share/nano/python.nanorc
        include /usr/local/share/nano/ruby.nanorc
        include /usr/local/share/nano/rust.nanorc
        include /usr/local/share/nano/sh.nanorc
        include /usr/local/share/nano/spec.nanorc
        include /usr/local/share/nano/tcl.nanorc
        include /usr/local/share/nano/tex.nanorc
        include /usr/local/share/nano/texinfo.nanorc
        include /usr/local/share/nano/xml.nanorc
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
