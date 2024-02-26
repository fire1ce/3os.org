---
title: Pyenv-virtualenv Multi Version
description: Multiple Version Python Virtual Environment Manager for Python development in macOS.
template: comments.html
tags: [maco, python]
---

# Pyenv-virtualenv - Multiple Version Python Virtual Environment Manager

For easy non-multiple version Python Virtual Environment follow this [Venv Python Virtual Environment][venv-python-virtual-environment-url]

## Intro

Using and developing with Python on macOS sometimes may be frustrating...

The reason for that is that macOS uses **Python 2** for its core system with **pip** as a package manager. When **Xcode Command Line Tools** are installed **Python 3** and **pip3** package manager will be available at the cli. When using **Python2, Python3** and their package managers this way, all the packages will be installed at the system level and my effect the native packages and their dependences , this can **break** or lead to **unwanted bugs** in OS.

The right way to use python at macOS is to use **Virtual Environments** for python. This way all the system related versions of python and their packages won't be affected and use by you.

## Installing and configuring pyenv, pyenv-virtualenv

In order to use pyenv, pyenv-virtualenv without conflicting with the native macOS python we need to add some configuration to our ~/.zshrc config (for mac os catalina) or your bash config if you are still using bash.

**It's very imported to maintain the order of the configuration for the loading order**

- First of all we need to include your Executable Paths. In the example we added all the common paths, including the paths for pyenv, pyenv-virtualenv. If you have any other path that you use, you can add them at the same line or create a new line below this one.
- Second to Executable Paths we will add two if statements that will check if the pyenv,pyenv-virtualenv are installed, if they are it will load them. If they aren't and you are using the same zsh or bash config it will ignore loading them
- Third is a fix for **brew, brew doctor**. When using this method it may conflict with brew as it uses python as well. If you run run **brew doctor** without the fix, it will show config warnings related to the python configuration files.

Configuration for ~/.zshrc or ~/.zprofile

```config
# Executable Paths
## Global
export PATH="/usr/local/bin:/usr/local/sbin:/Users/${USER}/.local/bin:/usr/bin:/usr/sbin:/bin:/sbin:$PATH"

## Curl
export PATH="/opt/homebrew/opt/curl/bin:$PATH"
export LDFLAGS="-L/opt/homebrew/opt/curl/lib"
export CPPFLAGS="-I/opt/homebrew/opt/curl/include"
export PKG_CONFIG_PATH="/opt/homebrew/opt/curl/lib/pkgconfig"

# pyenv, pyenv-virtualenv
## Initiating pyenv and fix Brew Doctor: "Warning: "config" scripts exist outside your system or Homebrew directories"
if which pyenv >/dev/null; then
  eval "$(pyenv init --path)"
  alias brew='env PATH=${PATH//$(pyenv root)\/shims:/} brew'
fi

## Initiating pyenv-virtualenv
if which pyenv-virtualenv-init >/dev/null; then
  eval "$(pyenv virtualenv-init -)"
fi
```

After you saved your configuration the best way to load it is to close your terminal session and open it again. This will load the session with your updated configuration.
There should be no errors at the new session.

This will install both pyenv and pyenv-virtualenv

```bash
brew install pyenv-virtualenv
```

Test if pyenv loaded currently

```python
pyenv -v
```

After the installation we would like to set a system level python version, you can chose the default from the list available from the pyenv

List available Python Version and find the version suited for your needs:

```python
pyenv install --list
```

Install Requeued Python Version (Exmaple version 3.9.5) as a default system

```python
pyenv install 3.9.5
```

Set it as global

```python
pyenv global 3.9.5
```

You can install multiply versions of python at the same time.

List all installed python versions and virtual environments and their python versions

```python
pyenv versions
```

Now let's test our system Python version we set before, it should be the version you choose as Global before

```bash
python -V
```

So far we cleaned your system and installed and configured pyenv, pyenv-virtualenv.

## How to use pyenv-virtualenv

Now let's understand how to use Python Virtual Environment with **pyenv-virtualenv**

Full documentation can be found at the original repo at git hub:
[pyenv-virtualenv github](https://github.com/pyenv/pyenv-virtualenv 'pyenv-virtualenv github')

We will list here some basic examples for a quick start and basic understanding

To create a virtualenv for the Python version used with pyenv, run pyenv virtualenv, specifying the Python version you want and the name of the virtualenv directory. For example,

```python
pyenv virtualenv 3.9.5 my-project-name
```

This will create a virtualenv based on Python 3.9.5 under $(pyenv root)/versions in a folder called my-project-name

**Activating virtualenv automatically for project**

The best way we found to activate the virtualenv at your project is to link the projects directory to the virtualenv.

cd to the project's directory and link the virtualenv for example _my-project-name_ virtualenv

```python
pyenv local my-project-name
```

This will activate the linked virtualenv every time you cd to this directory automatically
From now you can use pip to install any packages you need for your project, the location of the installed packages will be at $(pyenv root)/versions/<virtualenv name>

**Activating virtualenv manually for project**

You can also activate and deactivate a pyenv virtualenv manually:

```python
pyenv activate <virtualenv name>
pyenv deactivate
```

This will alow you to use multiply versions of python or packages for the same project

List existing virtualenvs

```python
pyenv virtualenvs
```

Delete existing virtualenv

```python
pyenv uninstall my-virtual-env
```

or

```python
pyenv virtualenv-delete my-virtual-env
```

You and your macOS should be ready for using python the **right way** without conflicting any system or Xcode Command Line Tools (used by brew)

<!-- appendices -->

<!-- urls -->

[venv-python-virtual-environment-url]: ../../development/python/virtualenv.md 'Venv Python Virtual Environment'

<!-- images -->
<!--css-->

<!-- end appendices -->
