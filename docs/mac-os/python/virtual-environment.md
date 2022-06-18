---
title: Virtual Environment
description: Usage of a native Python virtual environment in macOS with venv.
template: comments.html
tags: [MacOS, Python]
---

# Python Virtual Environment

Usage of a native Python virtual environment in macOS with `venv`

The venv module provides support for creating lightweight “virtual environments” with their own site directories, optionally isolated from system site directories. Each virtual environment has its own Python binary (which matches the version of the binary that was used to create this environment) and can have its own independent set of installed Python packages in its site directories.

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
