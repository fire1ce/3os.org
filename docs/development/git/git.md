---
description: Git Cli Useful Commands
---

# Git Cli Commands

## Untrack Files Already Added to git Repository Based on .gitignore

Commit all your changes. Before proceeding, make sure all your changes are committed, including your .gitignore file.
Remove everything from the repository. To clear your repo, use:

```bash
git rm -r --cached .
```

Re add everything.

```bash
git add .
```

Commit.

```bash
git commit -m ".gitignore fix"
```

## Use Gist as Repository

It's probably easiest if you just start by cloning the gist, so that `origin` (a "remote" that refers to the original repository) is set up for you. Then you can just do `git push origin master`. For example:

```bash
git clone git@gist.github.com:869085.git mygist
cd mygist
# Make your changes...
git add .
git commit -m "Better comments"
git push origin master
```

However, if you don't want to redo your changes, you can do:

```bash
cd mygist
git remote add origin git@gist.github.com:869085.git
git fetch origin
# Push your changes, also setting the upstream for master:
git push -u origin master
```

Strictly speaking, the `git fetch origin` and `-u` argument to `git push origin master` are optional, but they will helpfully associate the upstream branch `master` in `origin` with your local branch `master`.
