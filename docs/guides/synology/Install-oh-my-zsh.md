---
description: how to install ZSH and oh-my-zsh on synology dsm nas
---

# Install zsh and oh-my-zsh

Add community package source to package center
Open package center -> preference. Now we are at General tab. Allow install package from Synology Inc. and trusted publishers.

Switch to Package Sources tab and add the source of synocommunity: http://packages.synocommunity.com

Now you can see a list of packages in the Community tab

Install zsh from package center
Simply search and install zsh from package center. Package name
"Z shell".

Change shell when ssh login
It is not safe to edit /etc/passwd to set default shell, since in DSM cannot use chsh command, so I found a trick to switch shell as long as you ssh login

Locate zsh's location:

```bash
which zsh
```

The default shell on DSM was ash when ssh into, edit ~/.profile append the codes below with the zsh location:

```bash
if [[ -x /usr/local/bin/zsh ]]; then
  export SHELL=/usr/local/bin/zsh
  exec /usr/local/bin/zsh
fi
```

Now logout and login again, shell should be zsh

Install oh my zsh
To install oh my zsh, you need git, you can install git from package center. Simply search git and choose "Git Server" to install

Then according to https://github.com/robbyrussell/oh-my-zsh, you can have it.