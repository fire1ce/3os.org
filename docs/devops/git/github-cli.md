---
title: GitHub Cli
description: Cheat sheet for GitHub Cli. 
template: comments.html
tags: [github, git, cheat-sheet]
---

# GitHub Cli Cheat Sheet

The GitHub Cli a is free and open source Cli tool to interact with GitHub repositories. It allows you to work solely from the command line, as well as navigate to remote (web) repositories very easily.

## Installation

The GitHub Cli can be found at [https://cli.github.com/](https://cli.github.com/). The installation are very straightfoward, for example,

```shell
brew install gh
```
on macOS.

## Some example commands

View the repository remotely.

```shell
gh repo view --web
```

Create a pull request remotely.

```shell
gh pr create --web
```
