---
title: Brew Snippets
description: Homebrew usage snippets for macOS. This is a collection of snippets that I use to install and manage homebrew packages.
template: comments.html
tags: [macOS, homebrew]
---

# Brew Snippets

## Brew Pinns - Freez and Unfreez Specific Packages

This will alow you to pin (freez update) to specific packages to your Homebrew installation and then unfreeze them.

List of packages that you freeze

```shell
brew list --pinned
```

Freeze Version

```shell
brew pin <formula>
```

Unfreeze Version

```shell
brew unpin <formula>
```

## Uninstall Brew Package and Dependencies

Remove package's dependencies (does not remove package):

```bash
brew deps [FORMULA] | xargs brew remove --ignore-dependencies
```

Remove package:

```bash
brew remove [FORMULA]
```

Reinstall missing libraries:

```bash
brew missing | cut -d: -f2 | sort | uniq | xargs brew install
```
