---
title: Submodules Cheat Sheet
description: Cheat sheet for adding, cloning, updating, and removing Git submodules in a parent repository.
template: comments.html
tags: [git, cheat-sheet, submodules]
---

# Git Submodules Cheat Sheet

Git submodules let a repository track another repository at a specific commit. This cheat sheet covers the common lifecycle; see the [official Git submodule documentation][git-submodule-url]{target=\_blank} for every option.

## What Is a Submodule?

A submodule stores another Git repository inside a parent repository, also called the superproject. The parent tracks the submodule's path, URL, and selected commit rather than copying its full history.

## Add a Submodule

Add a remote repository at the path where it should appear in the parent repository:

```shell
git submodule add https://github.com/fire1ce/3os.org.git path/to/submodule
git commit -m "Add submodule"
```

## Clone a Project With Submodules

Clone the parent repository and initialize every nested submodule in one command:

```shell
git clone --recurse-submodules https://github.com/fire1ce/3os.org.git
```

Initialize submodules after cloning a repository without `--recurse-submodules`:

```shell
git submodule update --init --recursive
```

## Update Submodules

Fetch each submodule's configured remote branch and update nested submodules:

```shell
git submodule update --remote --recursive
```

Review and commit the updated submodule references in the parent repository:

```shell
git status
git add path/to/submodule
git commit -m "Update submodule"
```

## Remove a Submodule

!!! danger

    These commands remove the submodule working tree. Commit or back up any changes inside it before continuing.

Deinitialize the submodule, remove it from the parent repository, and delete its local metadata:

```shell
git submodule deinit -f -- path/to/submodule
git rm -f path/to/submodule
rm -rf .git/modules/path/to/submodule
git commit -m "Remove submodule"
```

<!-- appendices -->

<!-- urls -->

[git-submodule-url]: https://git-scm.com/docs/git-submodule 'Official Git Submodule Documentation'

<!-- images -->

<!--css-->

<!-- end appendices -->
