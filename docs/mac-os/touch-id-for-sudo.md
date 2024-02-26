---
title: TouchID for sudo
description: Enable TouchID for sudo in terminal and iTerm2 with a simple config change.
template: comments.html
tags: [macOS, iTerm2, terminal, touchID]
---

# TouchID for sudo

Apple devices such Macbooks and some Apple Magic Keyboards have a fingerprint - Touch ID scanner that can be used to authenticate a user with a touch of a finger. This functionality isn't available when using `sudo` to run commands.
You have to enter your password every time you run commands with high privileges.

We can enable TouchID for sudo with a simple config change. This will allow you to use Touch ID to authenticate with `sudo` without entering your password including the authentication with Apple Watch.

!!! warning "Display Link - Known Issue"

    As of the writing of this article, the Display Link Driver will privent the use of Touch ID for sudo when using the Display link device. It will work when the Display Link device isn't connected. This is a known issue.

## Enable TouchID for sudo

Open in text editor file with sudo privileges `/etc/pam.d/sudo`. In the next example we will use the `nano` editor.

```shell
sudo nano /etc/pam.d/sudo
```

Add at the top of the config file this line:

```shell
auth       sufficient     pam_tid.so
```

Your config should look like this:

![sudo config][sudo-config-img]

Save and Exit.

You can test your TouchID prompt in terminal by opening new session and running:

```shell
sudo -l
```

## Enable TouchID Support in iTerm2

In order to enable TouchID support in iTerm2, you need to complete the above section and then follow the steps below:

Go to `iTerm2` -> `Preferences` -> `Advanced` and search for:

```text
Allow session to survive
```

Change Allow session to survive logging out and back in. to `No`

![iterm2 config][iterm2-config-img]

You can test your TouchID prompt in iTerm2 by opening new session and running:

```shell
sudo -l
```

<!-- appendices -->

<!-- urls -->

<!-- images -->

[sudo-config-img]: ../assets/images/fb12505e-efb0-11ec-a168-bb2b078361cc.jpg 'sudo config'
[iterm2-config-img]: ../assets/images/1005eba0-efb2-11ec-ae3d-93f62b51db08.jpg 'iterm2 config'

<!--css-->

<!-- end appendices -->
