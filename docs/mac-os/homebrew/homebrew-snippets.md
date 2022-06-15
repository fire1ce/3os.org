---
description: Homebrew tweaks, guides and snippets
---

# Homebrew Snippets

## Brew Pinns - Freez and Unfreez Specific Packages

This will alow you to pin specific packages to your Homebrew installation and then unfreeze them.

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

## Uninstall brew package and dependencies

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
