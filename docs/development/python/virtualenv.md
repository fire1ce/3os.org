---
title: Virtual Environment
description: Cheat sheet for venv. Python Virtual Environment - venv. How to install and Use venv with Python. venv is a tool to create isolated Python environments.
template: comments.html
tags: [python, venv, cheat-sheet]
---

# Python Virtual Environment

## About Python Virtual Environment - **venv**

**venv** is a tool to create isolated Python environments. Since Python 3.3, a subset of it has been integrated into the standard library under the venv module.
Using **venv** is very useful for creating isolated Python environments for your project,it will allow you installing Python packages and modules in a separate location from the rest of your host os without conflicting versions.

## Install venv

In order to install `venv`, we need to install the following packages:

```shell
sudo apt install python3-venv
```

## Initialization of a Virtual Environment

Go to the root destination of your project and run the following command:

```shell
python3 -m venv .venv
```

This will create a virtual environment in the current directory. The virtual environment folder will be named `.venv`.

## Activation of a Virtual Environment

In order to activate a virtual environment, from the root directory of your project, run the following command:

```shell
source .venv/bin/activate
```

Check if the virtual environment is activated by running the following command:

```shell
which python
```

The output should be with `../.venv/bin/python` as the output.

Bonus:

You can add an alias to your bash profile to make it easier to activate the virtual environment:

```shell
alias activate='source .venv/bin/activate'
```

## Deactivation of a Virtual Environment

When you are done with the virtual environment, you can deactivate it by running the following command:

```shell
deactivate
```

<!-- appendices -->

<!-- end appendices -->
