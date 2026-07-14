---
title: Mark Archived Gmail as Read Automatically
description: Use a personal Google Apps Script and time-driven trigger to mark unread Gmail threads outside the Inbox as read.
template: comments.html
tags: [gmail, google-apps-script, automation]
---

# Mark Archived Gmail as Read Automatically

My preferred way to manage Gmail is `Inbox Zero`. The Inbox is my to-do list. Once I archive a message, I am done with it, but an unread archived message can still leave a counter on **All Mail** or another label.

This small personal Apps Script checks unread threads that are no longer in the Inbox and marks one batch as read.

!!! warning
    The script changes Gmail read state and requires access to your mailbox. Create it inside your own Google account, review every line, and authorize only the project you created. If the authorization screen shows an unexpected owner or code, stop.

## Create the script

1. Open [Google Apps Script][apps-script]{target=\_blank} while signed in to the correct Google account.
2. Create a new standalone project.
3. Name it something clear, such as `Mark archived Gmail as read`.
4. Replace the editor contents with:

```javascript
function markArchivedAsRead() {
  const query = 'is:unread -in:inbox -in:spam -in:trash';
  const threads = GmailApp.search(query, 0, 100);

  if (threads.length > 0) {
    GmailApp.markThreadsRead(threads);
  }
}
```

The exclusions keep Inbox, Spam, and Trash out of the action. The paged `search(query, start, max)` call processes at most 100 matching threads per run instead of asking Apps Script to load an unknown mailbox-sized result.

## Test it before scheduling

Use the same query directly in Gmail first:

```text
is:unread -in:inbox -in:spam -in:trash
```

Review the results. If they are not the messages you intend to change, adjust the query before running the script.

In Apps Script, select `markArchivedAsRead` and click **Run**. Google will ask you to authorize the script because `GmailApp` requires Gmail access. After it finishes, check Gmail and the Apps Script **Executions** page.

## Add the time-driven trigger

1. Open **Triggers** in the left sidebar.
2. Click **Add Trigger**.
3. Choose `markArchivedAsRead`.
4. Select **Time-driven** as the event source.
5. Choose the interval you want, then save.

Time-driven triggers run as the account that created them, and the exact time inside the selected interval can be slightly randomized by Google.

If you no longer want the automation, delete the trigger first. Deleting the trigger stops future runs; deleting the project removes the script itself.

## Sources

- [Google Apps Script: `GmailApp` search and mark methods][gmail-app]
- [Google Apps Script: installable and time-driven triggers][triggers]
- [Gmail search operators][gmail-search]

<!-- appendices -->

[apps-script]: https://script.google.com/
[gmail-app]: https://developers.google.com/apps-script/reference/gmail/gmail-app
[triggers]: https://developers.google.com/apps-script/guides/triggers/installable
[gmail-search]: https://support.google.com/mail/answer/7190

<!-- end appendices -->
