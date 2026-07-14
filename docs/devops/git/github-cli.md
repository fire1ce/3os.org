---
title: GitHub CLI
description: Cheat sheet for installing GitHub CLI and opening repositories or pull requests from the terminal.
template: comments.html
tags: [github, git, cheat-sheet]
---

# GitHub CLI Cheat Sheet

GitHub CLI is a free and open source command-line tool for working with GitHub repositories. It can manage GitHub workflows from the terminal and open repository pages in a browser.

## Installation

Follow the [official installation instructions][github-cli-url]{target=\_blank}, or install GitHub CLI with Homebrew on macOS:

```shell
brew install gh
```

## Repository Commands

View the repository remotely.

```shell
gh repo view --web
```

Create a pull request remotely.

```shell
gh pr create --web
```

<!-- appendices -->

<!-- urls -->

[github-cli-url]: https://cli.github.com/ 'GitHub CLI official website'

<!-- end appendices -->
