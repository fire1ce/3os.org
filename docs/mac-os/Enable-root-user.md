---
title: Enable Root User
description: How to enable and disable root user in macOS. This will allow you to login as root user.
template: comments.html
tags: [macOS]
---

# Enable or Disable the Root User on macOS

Mac administrators can use the root user account to perform tasks that require access to more areas of the system.

The user account named ”root” is a superuser with read and write privileges to more areas of the system, including files in other macOS user accounts. The root user is disabled by default. If you can log in to your Mac with an administrator account, you can enable the root user, then log in as the root user to complete your task.

## How to Enable the Root User

`System Preferences` > `Users & Groups`
Click `lock` icon, enter an administrator name and password.
Click `Login Options`.
Click `Join` at `Newotk Account Server`.

![User and Groups][user-and-groups-img]

Click `Open Directory Utility`.

![Directory Utility][directory-utility-img]

Click lock icon in the Directory Utility window, then enter an administrator name and password.

From the menu bar in Directory Utility:
Choose Edit > Enable Root User, then enter the password that you want to use for the root user.
Or choose Edit > Disable Root User.

![Enable Root User][enable-root-user-img]

## How to Disable the Root User

To Disable the Root User repeat the steps above, but change the last step to Disable Root User.

## Login as The Root User

When the root user is enabled, you have the privileges of the root user only while logged in as the root user.

Logout of your current account, then log in as the root user. user name ”root” and the password you created for the root user.

<!-- appendices -->

<!-- urls -->

<!-- images -->

[user-and-groups-img]: /assets/images/334cb53a-ef2b-11ec-ab52-ebf010b57462.jpg 'User and Groups'
[directory-utility-img]: /assets/images/f2ee518c-ef2b-11ec-9ca3-bb1ecfcef48f.jpg 'Directory Utility'
[enable-root-user-img]: /assets/images/616b2b62-ef2c-11ec-ae47-2f82399a54e5.jpg 'Enable Root User'

<!--css-->

<!-- end appendices -->
