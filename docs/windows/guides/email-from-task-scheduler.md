---
title: Send Email from Windows Task Scheduler (Legacy)
description: Legacy reference for sending email from Windows Task Scheduler and why the old SendEmail and Gmail password workflow should not be used.
template: comments.html
tags: [windows, task-scheduler, email, legacy]
---

# Send Email from Windows Task Scheduler (Legacy)

!!! danger "Legacy guide"

    Do not use the old instructions from this page on a current system. They passed an SMTP username and password directly in Task Scheduler arguments and depended on an old third-party executable.

This page is kept as a legacy reference because people still reach it from old bookmarks and search results. The original workflow is no longer a safe, supported guide.

## Why the Old Method Is Retired

- Microsoft's built-in Task Scheduler **Send an e-mail** action was removed in Windows 8 and Windows Server 2012.
- The old workflow placed the SMTP password in the task's command-line arguments.
- Gmail no longer accepts a normal Google account password from third-party apps that use basic username-and-password authentication.
- The page depended on a third-party `SendEmail.exe` binary that this website does not maintain.

The previous command examples and screenshots have been removed so that a reader cannot accidentally copy an exposed-password workflow.

## What to Keep from the Original Idea

Task Scheduler can still run a program on a schedule or in response to an event. The program used for email must support the current authentication method required by the mail provider, and its credentials must be stored outside the task's visible command-line arguments.

This legacy page does not prescribe a replacement architecture because the correct method depends on the mail provider, account type and authentication policy.

## Sources

- [Microsoft: Task Scheduler SendEmail action was removed](https://learn.microsoft.com/en-us/windows/win32/taskschd/taskschedulerschema-sendemail-actiongroup-element)
- [Google: Less secure apps and normal account passwords](https://support.google.com/accounts/answer/6010255)
- [Google: Sign in with app passwords](https://support.google.com/accounts/answer/185833)
