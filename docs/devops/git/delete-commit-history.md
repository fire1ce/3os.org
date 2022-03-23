---
title: Removing Sensitive Data
description: Removing sensitive data such as a password, SSH key, API tokens, license keys and so on from the Github repository history
template: comments.html
tags: [github, history, security]
---

# Removing Sensitive Data from a Repository History

As humans, we sometimes make mistakes. One of them is committing sensitive data in our Git repository.
If you commit sensitive data, such as a password, SSH key, API tokens, license keys and so on into a Git repository, you can remove it from the history.
You can follow the official [GitHub instructions][github-instructions-url]{target=\_blank} to remove sensitive data from the history.
It's probably the best and the right way to do it.

**Below is a fast way to remove sensitive data from a repository's history but with a few caveats like loosing all the history of the repository.**

## Delete Commit History in Github Repository

!!! danger

    This will remove your old commit history completely, You can’t recover it again!

Create Orphan Branch – Create a new orphan branch in git repository. The newly created branch will not show in ‘git branch’ command.

```bash
git checkout --orphan temp_branch
```

Add Files to Branch – Now add all files to newly created branch and commit them using following commands.

```bash
git add -A
git commit -am "first commit"
```

Delete **master/main** Branch. Adjust the command according your git repository

```bash
git branch -D main
```

Rename Current Branch – After deleting the **master/main** branch, let’s rename newly created branch name to **master/main**.

```bash
git branch -m main
```

Push Changes – You have completed the changes to your local git repository. Finally, push your changes to the remote **master/main** (Github) repository forcefully.

```bash
git push -f origin main
```

<!-- appendices -->

[github-instructions-url]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository

<!-- end appendices -->
