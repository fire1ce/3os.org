---
description: Delete Commit History in Github Repository
---

# Delete Commit History in Github Repository

!!! warning
    This will remove your old commit history completely, You can’t recover it again.

Create Orphan Branch – Create a new orphan branch in git repository. The newly created branch will not show in ‘git branch’ command.

```bash
git checkout --orphan temp_branch
```

Add Files to Branch – Now add all files to newly created branch and commit them using following commands.

```bash
git add -A
git commit -am "first commit"
```

Delete __master/main__ Branch. Adjust the command according your git repository

```bash
git branch -D main
```

Rename Current Branch – After deleting the __master/main__ branch, let’s rename newly created branch name to __master/main__.

```bash
git branch -m main
```

Push Changes – You have completed the changes to your local git repository. Finally, push your changes to the remote __master/main__ (Github) repository forcefully.

```bash
git push -f origin main
```
