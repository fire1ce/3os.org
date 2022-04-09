---
title: Pip Package Manager
description: Cheat sheet for Pip. Pip Python Package Manager Cheat Sheet. Pip is the package installer for Python. You can use it to install packages from the Python Package Index and other indexes.
template: comments.html
tags: [python, pip, package-manager, cheat-sheet]
---

# Pip Python Package Manager Cheat Sheet

Pip is the package installer for Python. You can use it to install packages from the Python Package Index and other indexes.

## List Installed Packages With Pip

```shell
pip list
```

## List Outdated Packages

```shell
pip list --outdated
```

## Instal Or Update Package To Specific Version

exmaple with MySQL_python package:

```shell
pip install MySQL_python==1.2.2
```

## Update Package To The Latest Avalable Version

exmaple with MySQL_python package:

```shell
pip install MySQL_python --upgrade
```

## Update Pip Itself

```shell
pip install --upgrade pip
```

## Update All Packages Installed With Pip

```shell
pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip install -U
```

## Generate requirements.txt For a Project

Run this command at terminal at the root of the project:

```shell
pip freeze > requirements.txt
```

<!-- appendices -->

<!-- end appendices -->
