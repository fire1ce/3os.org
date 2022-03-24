---
title: Submodules Cheat Sheet
description: Cheat sheet for Pip Git sumboduls. Git submodules allow you to keep a git repository as a subdirectory. Git Submodule Cli Useful Commands cheat sheet.
template: comments.html
tags: [github, cheat-sheet, submodules]
---

# Git Submodules Cheat Sheet

## What is a Submodule?

Git submodules allow you to keep a git repository as a subdirectory of another git repository. Git submodules are simply a reference to another repository at a particular snapshot in time. Git submodules enable a Git repository to incorporate and track version history of external code.

## Add a Submodule

You need to know the remote git repository url and where you want to place that it in your repository.

for example:

```shell
git submodule add https://github.com/fire1ce/3os.org path/to/submodule
git add .
git commit -m "adds submodule path/to/submodule"
```

## Cloning A Project With Submodules

When you clone a repository that contains submodules there are a few extra steps to be taken.

for example:

```shell
git clone https://github.com/fire1ce/3os.org repo
cd repo
git submodule init
git submodule update
```

If you’re sure you want to fetch all submodules (and their submodules), you can also use this fancy one-liner:

```shell
git clone --recurse-submodules https://github.com/fire1ce/3os.org
```

## Submodule Update

If you’re simply tracking the `master` or `main` branch for the submodule, you can suffice with a simple `fetch` and `merge`.

```shell
cd path/to/submodule
git fetch
git merge origin/master
```

If you’re in a hurry, you can streamline this for all submodules in your repo with:

```shell
git submodule update --remote --recursive
```

Commit this change to your own repo, so others are locked to this new version of the submodule as well.

## Remove a submodule

- Delete the relevant section from the `.gitmodules` file.
- Stage the `.gitmodules` changes git add `.gitmodules`
- Delete the relevant section from `.git/config`.
- Run `git rm --cached path_to_submodule` (no trailing slash).
- Run `rm -rf .git/modules/path_to_submodule` (no trailing slash).
- Commit `git commit -m "Removed submodule"`
- Delete the now untracked submodule files `rm -rf path_to_submodule`

<!-- appendices -->

<!-- end appendices -->
