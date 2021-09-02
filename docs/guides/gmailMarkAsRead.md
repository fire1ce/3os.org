---
description: Gmail Mark Archived Mail as Read guide
---

# Gmail Mark Archived Mail as Read

1. Head to script.google.com to start a script.
2. Choose to create a script for Gmail in the little popup.
3. Delete all the sample code it gives you.
4. Replace it with this (written using the API reference):

```js
function markArchivedAsRead() {
 var threads = GmailApp.search('label:unread -label:inbox', 0, 100);
 GmailApp.markThreadsRead(threads);
 var spamThreads = GmailApp.search('label:spam -label:inbox', 0, 100);
 GmailApp.markThreadsRead(spamThreads);
};
```

* Save the project with File > Save.
* Add a new version using File > Manage Versions and enter "initial version" then submit that.
* Do a test run using Run > markArchivedAsRead and be sure and authorize the app when it asks you to.
* Add a new trigger using Resource > Current Project's Triggers and choose to run the above function every minute (or hour or day or whatever if you want to be nice to Google's servers).
* Save the script again and exit. Don't worry, it will keep running.

And you're done. It will continue to run every minute until you stop it.

!!! warning
    Update: Some people are reporting an error which says "This operation can only be applied to at most 100 threads. (line 3, file "Code")". To fix this, you have to manually do a search for "is:unread" and mark all of them as read before running the script, so that it starts with a clean slate. The script can only process 100 threads per run, so if you give it more than 100 on the first run, that'll obviously bust it.
