---
description: Homebrew tweaks, guides and snippets
---

# Homebrew Snippets

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