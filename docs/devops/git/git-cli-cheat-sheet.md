---
title: Git Cli Cheat Sheet
description: Cheat sheet for Git. Git version control system designed to quickly and efficiently manage projects cheet sheet for the command line.
template: comments.html
tags: [github, git, cheat-sheet]
---

# Git Cli Cheat Sheet

Git is a free and open source distributed version control system designed to quickly and efficiently manage everything from small to very large projects.

## Create Repositories

A new repository can either be created locally, or an existing repository can be cloned. When a repository was initialized locally, you have to push it to GitHub afterwards.

The git init command turns an existing directory into a new Git repository inside the folder you are running this command. After using the `git init` command, link the local repository to an empty GitHub repository using the following command:

```shell
git init
```

Specifies the remote repository for your local repository. The url points to a repository on GitHub.

```shell
git remote add origin [url]
```

Clone (download) a repository that already exists on GitHub, including all of the files, branches, and commits

```shell
git clone [url]
```

## Git Configuration

Configure user information for all local repositories

Sets the name you want attached to your commit transactions

```shell
git config --global user.name "[name]"
```

Sets the email you want attached to your commit transactions

```shell
git config --global user.email "[email address]"
```

Enables helpful colorization of command line output

```shell
git config --global color.ui auto
```

## Synchronize Changes

Synchronize your local repository with the remote repository on GitHub.com

Downloads all history from the remote tracking branches

```shell
git fetch
```

Combines remote tracking branches into current local branch

```shell
git merge
```

Uploads all local branch commits to GitHub

```shell
git push
```

Updates your current local working branch with all new commits from the corresponding remote branch on GitHub. `git pull` is a combination of `git fetch` and `git merge`

```shell
git pull
```

## Redo Commits

Erase mistakes and craft replacement history

Undoes all commits after [commit], preserving changes locally

```shell
git reset [commit]
```

Discards all history and changes back to the specified commit

```shell
git reset --hard [commit]
```

## Branches

Branches are an important part of working with Git. Any commits you make will be made on the branch you’re currently “checked out” to. Use git status to see which branch that is.

Creates a new branch

```shell
git branch [branch-name]

```

Switches to the specified branch and updates the working directory

```shell
git switch -c [branch-name]
```

Combines the specified branch’s history into the current branch. This is usually done in pull requests, but is an important Git operation.

```shell
git merge [branch]
```

Deletes the specified branch

```shell
git branch -d [branch-name]
```

## Make Changes

Browse and inspect the evolution of project files

Lists version history for the current branch

```shell
git log
```

Lists version history for a file, beyond renames (works only for a single file)

```shell
git log --follow [file]
```

Shows content differences between two branches

```shell
git diff [first-branch]...[second-branch]
```

Outputs metadata and content changes of the specified commit

```shell
git show [commit]
```

Snapshots the file in preparation for versioning

```shell
git add [file]
```

Records file snapshots permanently in version history

```shell
git commit -m "[descriptive message]"
```

## The .gitignore file

Sometimes it may be a good idea to exclude files from being tracked with Git. This is typically done in a special file named .gitignore. You can find helpful templates for `.gitignore` files at [github.com/github/gitignore][gitignore-url]{target=\_blank}.

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

```shell
git clone git@gist.github.com:869085.git mygist
cd mygist
```

Add you changes to the repository.

```shell
git add .
git commit -m "Better comments"
git push origin master
```

However, if you don't want to redo your changes, you can do:

```shell
cd mygist
git remote add origin git@gist.github.com:869085.git
git fetch origin
# Push your changes, also setting the upstream for master:
git push -u origin master
```

Strictly speaking, the `git fetch origin` and `-u` argument to `git push origin master` are optional, but they will helpfully associate the upstream branch `master` in `origin` with your local branch `master`.

<!-- appendices -->

[gitignore-url]: https://github.com/github/gitignore

<!-- end appendices -->
