---
title: pyenv and pyenv-virtualenv on macOS
description: Install pyenv and pyenv-virtualenv on macOS, configure zsh, install Python versions, and create per-project environments.
template: comments.html
tags: [macos, python, pyenv, virtualenv, homebrew]
---

# pyenv and pyenv-virtualenv on macOS

This guide uses `pyenv` to install and select Python versions and `pyenv-virtualenv` to create isolated project environments. It does not replace or modify Apple's system tools.

## Install with Homebrew

```shell
brew install pyenv pyenv-virtualenv
```

## Configure zsh

Add the current pyenv initialization to `~/.zshrc`:

```shell
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init - zsh)"
eval "$(pyenv virtualenv-init -)"
```

If pyenv is needed in non-interactive login shells, add the first three pyenv lines to `~/.zprofile` as well.

Restart the shell:

```shell
exec "$SHELL"
```

Verify both commands:

```shell
pyenv --version
pyenv virtualenv --help
```

## Install a Python Version

List the versions pyenv can install:

```shell
pyenv install --list
```

Choose a supported version required by the project, then replace `VERSION` in these commands:

```shell
pyenv install VERSION
pyenv global VERSION
python --version
pyenv version
```

Do not copy a version number from an old guide without checking the project's requirements.

## Create a Project Environment

Create an environment from the selected Python version:

```shell
pyenv virtualenv VERSION my-project
```

Move into the project and make that environment local to the directory:

```shell
cd /path/to/my-project
pyenv local my-project
```

`pyenv local` writes a `.python-version` file. With `pyenv virtualenv-init` enabled, entering this directory activates the environment and leaving it deactivates the environment.

Verify:

```shell
python --version
which python
pyenv version
```

## Manage Environments

```shell
pyenv versions
pyenv virtualenvs
pyenv activate my-project
pyenv deactivate
```

Remove an environment only after checking that the project no longer needs it:

```shell
pyenv uninstall my-project
```

## Sources

- [pyenv installation and shell setup](https://github.com/pyenv/pyenv#installation)
- [pyenv-virtualenv installation and usage](https://github.com/pyenv/pyenv-virtualenv)
