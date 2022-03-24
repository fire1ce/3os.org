---
title: Ruby Gem Package Manager
description: Cheat sheet for RubyGems. RubyGems is a package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries.
tags: [ruby, gem, package-manager, cheat-sheet]
---

# Ruby Gem Package Manager

RubyGems is a package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries (in a self-contained format called a "gem"), a tool designed to easily manage the installation of gems, and a server for distributing them.

## Finding Installed And Available Gems

```shell
gem list
```

## Installing New Gems

```shell
gem install rails_utils
```

## Removing / Deleting Gems

```shell
gem uninstall rails_utils
```

## Finding Outdated Gems

```shell
gem outdated
```

## Get Gem & Ruby Environment Information

```bash
gem environment
```

## Update All the Gems

Install rubygems-update

```bash
gem install rubygems-update
```

Then run:

```bash
gem update --system
update_rubygems
```

## Reading The Gem Documentation

One of the most handy and important things about gems is that they [should] come with good documentation to allow you to start working with them fast. The simplest way to go with documentation is to run a local server where you will have access to all installed gems’ usage instructions.

Run the following to run a documentation server:

```shell
gem server
```

it will start a server on port 8808.

```terminal
# Server started at http://0.0.0.0:8808
# Server started at http://[::]:8808
```

<!-- appendices -->

<!-- end appendices -->
