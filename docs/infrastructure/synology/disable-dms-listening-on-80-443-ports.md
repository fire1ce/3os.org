---
title: Free 80,443 Ports
description: Vestibulum quam turpis, lacinia lacinia ex finibus, egestas malesuada nunc. Maecenas euismod neque rhoncus suscipit viverra. Nulla venenatis enim vel mauris ornare viverra.
template: comments.html
tags: [template, markdown]
---

# Free 80,443 Ports On Synology NAS (DSM)

Synology NAS (DSM) is a network storage device, with some additional features like native support for virtualization, and docker support.
One of the issues is that the default ports 80 and 443 are used by the web server even if you change the default ports of the Synology's DSM to other ports.
In some cases, you want to use these ports for other purposes, such as a reverse proxy as an entry point for the web serivces.
The following steps will help you to free the default ports 80 and 443 on the Synology NAS (DSM) for other purposes.

## Configure the Synology NAS (DSM) to Listen on Other Ports

First, you need to configure the Synology NAS (DSM) to listen on other ports then 80, 443.

Login to the Synology NAS (DSM) as administrator user open `Control Panel` and find `Login Portal` under `System`

**Under `DSM` tab, change the DSM port (http) to a different port then 80, and the DSM port (https) to a different port then 443.**

![DSM Change Default Port][dsm-change-default-port-img]

Click `Save` to save the changes. Then, relogin to the Synology NAS (DSM) with the new port as administrator user as we did above.

## Disable the Synology NAS (DSM) to Listen on 80, 443 Ports

Synology NAS (DSM) will listen on 80, 443 ports after each reboot. Therefore, the changes will be lost after each reboot. The workaround is to run the a script to free the ports 80, 443 on each time the Synology NAS (DSM) is boots.

The following one liner will free the ports 80, 443 on Nginx web server of the Synology NAS (DSM), until the Synology NAS (DSM) is rebooted.
It removes the port 80, 443 from the `Nginx` config and restarts the `Nginx` service.

=== "DSM 7.x.x"

    ```shell
    sed -i -e 's/80/81/' -e 's/443/444/' /usr/syno/share/nginx/server.mustache /usr/syno/share/nginx/DSM.mustache /usr/syno/share/nginx/WWWService. mustache

    synosystemctl restart nginx
    ```

=== "DSM 6.x.x"

    ```shell
    sed -i -e 's/80/81/' -e 's/443/444/' /usr/syno/share/nginx/server.mustache /usr/syno/share/nginx/DSM.mustache /usr/syno/share/nginx/WWWService. mustache

    synoservicecfg --restart nginx
    ```

In order to presist the changes, we will create a `Scheduled Task` to run the above script on each reboot.

Head to `Control Panel` and find `Task Scheduler`, then click `Create` and select `Triggerd Task` - `User-defined script`.

At `Create Task` - `General` page, fill in the following information:

> Task: Disable_DSM_Listening_on_80_443  
> User: root  
> Event: Boot-up  
> Pre-taks: None <blank>  
> Enabled: Yes

![DSM Create Task][dsm-create-task-img]

At `Task Settings` tab, under `Run command` fill the `User-defined script` with the following acording to the Synology NAS (DSM) version:

=== "DSM 7.x.x"

    ```shell
    sed -i -e 's/80/81/' -e 's/443/444/' /usr/syno/share/nginx/server.mustache /usr/syno/share/nginx/DSM.mustache /usr/syno/share/nginx/WWWService. mustache

    synosystemctl restart nginx
    ```

=== "DSM 6.x.x"

    ```shell
    sed -i -e 's/80/81/' -e 's/443/444/' /usr/syno/share/nginx/server.mustache /usr/syno/share/nginx/DSM.mustache /usr/syno/share/nginx/WWWService. mustache

    synoservicecfg --restart nginx
    ```

Suggestion: Select the Notification when the task is terminated abnormally.

![DSM Task Settings][dsm-task-settings-img]

Click `OK`. The new task should be created. You can check the task by clicking `Run` in the `Task Scheduler` page.
Prefered to reboot the Synology NAS (DSM) to make shure the changes are applied at boot.

<!-- images -->

[dsm-change-default-port-img]: /assets/images/ce653b82-c3a7-11ec-8d1f-17eb1f5bd0eb.jpg 'DSM Change Default Port'
[dsm-create-task-img]: /assets/images/944c1cbc-c3ad-11ec-b5f1-5f23693b3268.jpg 'DSM Create Task'
[dsm-task-settings-img]: /assets/images/d163247e-c3ad-11ec-89c1-b30522ee9186.jpg 'DSM Task Settings'

<!--css-->

<!-- end appendices -->
