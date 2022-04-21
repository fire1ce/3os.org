---
title: Gmail Mark Archived as Read
description: Automatically mark archived emails as read in Gmail
template: comments.html
tags: []
---

# Automatically Mark Archived Email as Read in Gmail

## Background

My preferred method of managing emails in Gmail is `Zero Inbox`. In short, emails in Inbox work as to-do list. The Inbox may contain important email i need to attend or a digital receipt from a payment I've made a minute ago. Since I know the content of that email the task is done and I archive it. This email will move from Inbox to All Mail or a dedicated label if you have automation rules.

## The Problem

When using the `Archive` function email which weren't opened or marked as `Read` will show as number counter in All Mail or Dedicated Label. Since I'm done with those emails I have to manually mark emails as read. This is a tedious task and I don't want to do it manually

## The Solution

Using [Google Scripts][google-scripts-url]{target=\_blank} We can create a personal `app` that will automatically mark emails as read when they are archived. This is a simple script that will run on Gmail and will mark emails as read when they are no longer in the inbox folder. You can choose how often you want to automatically mark archived email as read in gmail. This solution was tested on personal Gmail accounts and the Google Workspace Gmail accounts (as long you can grunt permission).

## Installation

Make sure you are logged in to your Google account.
Open [Google Scripts][google-scripts-url]{target=\_blank} and create a new project.

![Create a new project][new-project-img]

You will be prompted with a new windwos. Rename the project to `Automatically Mark Archived Email as Read`.  
Copy and repace the following code to the new project.

```javascript
function markArchivedAsRead() {
  var threads = GmailApp.search('label:unread -label:inbox', 0, 100);
  GmailApp.markThreadsRead(threads);
  var spamThreads = GmailApp.search('label:spam -label:inbox', 0, 100);
  GmailApp.markThreadsRead(spamThreads);
}
```

Your windwos should look like this:

![Script function][script-function-img]

Save the project.

![Save project][save-project-img]

After saving the project you should be able Run the script.

![Run script][run-script-img]

On the first run the script will ask you to give it the necessary permissions. Click `Review permissions` to continue.

![Review permissions][review-permissions-img]

Since the `app` is not signed you will be prompted with a warning. I's ok and safe. Click `Advanced`.

![Warning][warning-img]

Click `Go to Gmail Mark Archived as Read (unsafe)` to continue.

![Allow warning][allow-warning-img]

At this point you will be prompted to grant the script `Automatically Mark Archived Email as Read` access to your Gmail account. Click `Allow`. This will alow the script to perform the actions you need.

![Grunt permissions][grunt-permissionsimage]

If all went well you should see the log of the script as show bellow.

![Execution log][execution-log-img]

At this point we create a `Automatically Mark Archived Email as Read` script and grunt it the necessary permissions. NNow we want to automate the process. We can do this by creating a new timed trigger. Head over the `Trigger menu`

![Trigger menu][trigger-menu-img]

Click `Add Trigger`.

You will be prompted to select when and how the script will run. The following example will run the script every 5 minutes, and send a failure email report onece a week.

!!! note

    The script may fail onces in a while. This is due to the fact it depends on Gmail's API.
    Unless you receive an email with hunders of failed attempts, you can ignore the email.

![Create trigger][create-trigger-img]

!!! Note

      Update: Some people are reporting an error which says "This operation can only be applied to at most 100 threads. (line 3, file "Code")". To fix this, you have to manually do a search for "is:unread" and mark all of them as read before running the script, so that it starts with a clean slate. The script can only process 100 threads per run, so if you give it more than 100 on the first run,

After creating the trigger you screen should look like this:

![Trigger created][trigger-created-img]

Now we whant to ensure that the script runs every 5 minutes. We can do this in `Execution` menu:

![Triggered execution][triggered-execution-img]

When 5 minutes passed from the point the trigger was created, the page log should look like this:

![Execution menu][execution-menu-img]

We are done with the installation and the configuration. You should already be able to see that some of the emails are marked as read.

### Limitations

Google's API is limited to 100 threads per request - a single script's run. This means that every 5 minutes it runs it will mark 100 emails as read. Since the script is run every 5 minutes, it won't take long to mark all emails as read automatically. If you aren't able to wait you can do it mark emails as read manually.

### Trubleshooting

I've seen this script working without any issues for months, But suddenly you may receive an email with the `Automatically Mark Archived Email as Read` failling to run all the time. The reason is that the script `lost` the Gmail permissions. The solutiuon is to run the script manually and grant the script the necessary permissions as the first time.

<!-- appendices -->

[google-scripts-url]: https://script.google.com 'google scripts'
[new-project-img]: /assets/images/52b4fd94-af55-11ec-b32c-2777b3838de6.jpg 'Create a new project'
[script-function-img]: /assets/images/82fa55bc-af5a-11ec-8aeb-377e793bc479.jpg 'Script function'
[save-project-img]: /assets/images/85ff00dc-af5a-11ec-8c04-bbd02025abfa.jpg 'Save project'
[run-script-img]: /assets/images/0a0eab1c-af69-11ec-98a4-730471f7a7a3.jpg 'Run script'
[review-permissions-img]: /assets/images/5fe8f75e-af55-11ec-8868-8fc6aa65516e.jpg 'Review permissions'
[warning-img]: /assets/images/25e25254-af59-11ec-a2d8-d34524b71112.jpg 'Warning'
[allow-warning-img]: /assets/images/965ef3ea-af5c-11ec-8f5b-cff63ef5ad54.jpg 'Allow warning'
[grunt-permissionsimage]: /assets/images/2cc5a724-af59-11ec-871c-d7053f648ffc.jpg 'Grunt permissions'
[execution-log-img]: /assets/images/3015a794-af59-11ec-b015-930e45647512.jpg 'Execution log'
[trigger-menu-img]: /assets/images/4d3df9bc-af5d-11ec-a87a-2316e20585af.jpg 'Trigger menu'
[create-trigger-img]: /assets/images/793597ee-af5a-11ec-8e8f-23fffdd67629.jpg 'Create trigger'
[trigger-created-img]: /assets/images/7cd52216-af5a-11ec-8172-b73480c720dc.jpg 'Trigger created'
[execution-menu-img]: /assets/images/8019b806-af5a-11ec-bad5-9f430cbe840e.jpg 'Execution menu'
[triggered-execution-img]: /assets/images/dc44cc8a-af5d-11ec-87bc-b3119d6d09c5.jpg 'Triggered execution'

<!-- overide cutom css for centerd images -->

<!-- end appendices -->
