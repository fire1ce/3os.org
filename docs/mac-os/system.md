---
description: macOS System tweaks and tips for better experience, productivity and workflow and more
---

# macOS System Tweaks and Guides for Better Experience, Productivity and Workflow

## Install macOS Updates via CLI

```bash
softwareupdate -i -a
```

## Install Command Line Tools

```bash
xcode-select --install
```


## Import RSA Keys to macOS Keychain

Copy your id_rsa, id_rsa.pub to _~/.ssh/_ folder

Step 1 - Store the key in the keychain
Just do this once:

```bash
ssh-add -K ~/.ssh/[your-private-key]
```

Enter your key passphrase, and you won't be asked for it again.

(If you're on a pre-Sierra version of OSX, you're done, Step 2 is not required.)

Step 2 - Configure SSH to always use the keychain
It seems that OSX Sierra removed the convenient behavior of persisting your keys between logins, and the update to ssh no longer uses the keychain by default. Because of this, you will get prompted to enter the passphrase for a key after you upgrade, and again after each restart.

The solution is fairly simple, and is outlined in this github thread comment. Here's how you set it up:

Ensure you've completed Step 1 above to store the key in the keychain.

If you haven't already, create an ~/.ssh/config file. In other words, in the .ssh directory in your home dir, make a file called config.

In that .ssh/config file, add the following lines:

```bash
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
```

Change ~/.ssh/id_rsa to the actual filename of your private key. If you have other private keys in your ~.ssh directory, also add an IdentityFile line for each of them. For example, I have one additional line that reads IdentityFile ~/.ssh/id_ed25519 for a 2nd private key.

The UseKeychain yes is the key part, which tells SSH to look in your OSX keychain for the key passphrase.

That's it! Next time you load any ssh connection, it will try the private keys you've specified, and it will look for their passphrase in the OSX keychain. No passphrase typing required.

## Shell Safe rm

Source [shell-safe-rm github](https://github.com/kaelzhang/shell-safe-rm/blob/master/README.md)

A much safer replacement of bash `rm` with _ALMOST FULL_ features of the origin `rm` command.

Initially developed on Mac OS X, then tested on Linux.

Using `safe-rm`, the files or directories you choose to remove will move to `$HOME/.Trash` instead of simply deleting them. You could put them back whenever you want manually.

If a file or directory with the same name already exists in the Trash, the name of newly-deleted items will be ended with the current date and time.

Install with npm:

```bash
npm i -g safe-rm
```

Add Alias to your _zshrc_ config

```bash
alias rm='safe-rm'
```

## Disable StrictHostKeyChecking in SSH

To disable strict host checking on OS X for the current user,
create or edit ~/.ssh/ssh_config and add the following lines:

```bash
   StrictHostKeyChecking no
```

## Set macOS Hostname via CLI

```bash
sudo scutil --set HostName <NewHostNameHere>
```

## Syntax Highlighting In Nano on Mac OS X

### For M1 (ARM)

Install Nano from homebrew
Create _nanorc_ file with the syntax below

```bash
brew install nano
nano ~/.nanorc
```

```bash
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

### For Intel Based

Install Nano from homebrew
Create _nanorc_ file with the syntax below

```bash
brew install nano
nano ~/.nanorc
```

nanorc:

```bash
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

Save & Exit

```bash
source ~/.zshrc
```

## Disable/Enable Gatekeeper

Disable Gatekeeper

```bash
sudo spctl --master-disable
```

Enable Gatekeeper

```bash
sudo spctl --master-enable
```

Check Status

```bash
spctl --status
```

## Disable/Enable SIP (System Integrity Protection)

Reboot your Mac into Recovery Mode by restarting your computer and holding down **Command+R** until the Apple logo appears on your screen.  
Click _Utilities > Terminal._  
In the Terminal window, type in:

Status:

```bash
csrutil status
```

Disable:

```bash
csrutil disable
```

Enable:

```bash
csrutil enable
```

Press Enter and restart your Mac.

## Installing rbenv (ruby send box) - Ruby alternative to the one that macOS uses

Install rbenv with brew

```bash
brew install rbenv
```

Add eval `"$(rbenv init -)"` to the end of `~/.zshrc` or `~/.bash_profile`

Install a ruby version

```bash
rbenv install 2.3.1
```

Select a ruby version by rbenv

```bash
rbenv global 2.3.1
```

Open a new terminal window

Verify that the right gem folder is being used with `gem env home`(should report something in your user folder not system wide)

## List listening Ports and Programs and Users _(netstat like)_

```bash
sudo lsof -i -P | grep -i "listen"
```

## Disable "last login" at Terminal

```bash
cd ~/
touch .hushlogin
```

## Flush DNS

```bash
sudo killall -HUP mDNSResponder;sudo killall mDNSResponderHelper;sudo dscacheutil -flushcache
```

## Fix Missing __/Users/Shared__ Folder

Create he missing /Users/Shared folder

```bash
sudo mkdir -p /Users/Shared/
```

Fix permissions for the /Users/Shared folder

```bash
sudo chmod -R 1777 /Users/Shared
```

## Clear Google Drive cache

```bash
rm -rf ~/Library/Application\ Support/Google/DriveFS/[0-9]*
```