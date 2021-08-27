---
description: macOS UI tweaks, system tweaks, guides and tips for better experience, productivity and workflow and more
---

# macOS Tweaks and Guides for Better Experience, Productivity and Workflow

This section is intended to provide usefully tweaks and guides for better experience with **macOS** for everyday use.

<div style="width:80%; margin:0 auto">
   <img src="/assets/images/macOS/macosWall.jpg" alt="mac image">
</div>

## What apps works and what doesn't at M1 Silicon

[Is Apple silicon ready?](https://isapplesiliconready.com/){target=_blank}

## Categories

- [UI Tweaks](/macOS/ui/)
- [System Tweaks](/macOS/system/)
- [Applications Tweaks](/macOS/applications/)

## HomeBrew Tips

### Uninstall brew package and dependencies

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
