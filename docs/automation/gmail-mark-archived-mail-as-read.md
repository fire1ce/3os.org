---
title: Mark Archived Gmail as Read Automatically
description: A durable Google Apps Script that marks archived unread Gmail as read with the Gmail API, plus a filter for mail that never reaches the Inbox.
template: comments.html
tags: [gmail, google-apps-script, automation]
---

# Mark Archived Gmail as Read Automatically

My preferred way to manage Gmail is `Inbox Zero`. The Inbox is my to-do list. Once I archive a message, I'm done with it, but an unread archived message still leaves a counter on **All Mail** or another label.

Gmail still has no built-in "mark as read when archived" setting, so this guide uses a small personal Apps Script that runs on a schedule and clears every unread message outside the Inbox. It's built to be durable: it catches up on large backlogs, never runs twice at the same time, retries temporary Gmail API errors, and installs its own trigger.

!!! warning
    The script changes Gmail read state and requires access to your mailbox. Create it inside your own Google account, review every line, and authorize only the project you created. If the authorization screen shows an unexpected owner or code, stop.

## Use a Filter for Mail That Skips the Inbox

If some mail is archived by a Gmail filter (**Skip the Inbox**), tick **Mark as read** in the same filter. It applies the moment the message arrives, with no script involved.

The script below is for everything else: messages you archive yourself from any device or app.

## Create the Script

Open [Google Apps Script][apps-script-url]{target=\_blank} while signed in to the correct Google account, create a new standalone project, and give it a clear name such as `Mark archived Gmail as read`.

The script uses the Gmail API advanced service instead of `GmailApp`, because it can change up to 1,000 messages per call. In the editor sidebar, click **Services** → **+**, choose **Gmail API**, and click **Add**. Keep the identifier as `Gmail`.

Replace the contents of `Code.gs` with the following:

```javascript title="Code.gs"
const CONFIG = {
  // Unread mail outside the Inbox. Snoozed mail stays unread until it returns.
  query: 'is:unread -in:inbox -in:spam -in:trash -in:snoozed',
  pageSize: 500,                    // messages.list maximum
  timeBudgetMs: 4.5 * 60 * 1000,    // stay well under the 6-minute execution limit
  triggerMinutes: 15,               // 1, 5, 10, 15 or 30
};

function markArchivedAsRead() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(0)) {
    console.log('Previous run is still active, skipping.');
    return;
  }

  try {
    const started = Date.now();
    let total = 0;

    while (Date.now() - started < CONFIG.timeBudgetMs) {
      const res = withRetry_(() =>
        Gmail.Users.Messages.list('me', { q: CONFIG.query, maxResults: CONFIG.pageSize })
      );
      const ids = (res.messages || []).map((m) => m.id);
      if (ids.length === 0) break;

      withRetry_(() =>
        Gmail.Users.Messages.batchModify({ ids, removeLabelIds: ['UNREAD'] }, 'me')
      );
      total += ids.length;
    }

    console.log(`Marked ${total} archived message(s) as read.`);
  } finally {
    lock.releaseLock();
  }
}

// Retry temporary failures (rate limits, 5xx) with exponential backoff and jitter.
function withRetry_(fn, attempts = 5) {
  for (let i = 1; ; i++) {
    try {
      return fn();
    } catch (err) {
      if (i >= attempts) throw err;
      console.warn(`Attempt ${i} failed: ${err.message}`);
      Utilities.sleep(Math.min(32000, 1000 * 2 ** i) + Math.floor(Math.random() * 1000));
    }
  }
}

// Run once to (re)create exactly one time-driven trigger.
function installTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'markArchivedAsRead')
    .forEach((t) => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('markArchivedAsRead')
    .timeBased()
    .everyMinutes(CONFIG.triggerMinutes)
    .create();
}
```

That's it for the code. Here is what makes it durable:

!!! note "What Each Part Does"
    - **Full catch-up:** each run keeps marking batches of up to 500 messages until nothing matches or the time budget runs out. A big backlog clears in one or two runs instead of 100 threads at a time.
    - **Fresh query every loop:** the search runs again after each batch instead of following page tokens, because the result set shrinks as messages are marked read.
    - **No overlapping runs:** `LockService` makes a run exit immediately if the previous one is still working.
    - **Retries:** temporary API errors are retried with backoff, so a short Gmail hiccup doesn't fail the run.
    - **Reproducible trigger:** `installTrigger` deletes any old trigger for the function before creating a new one, so running it again never leaves duplicates.

## Limit the Permissions (Optional)

By default, Apps Script asks for broad Gmail access. You can restrict the project to the two scopes it needs. Open **Project Settings**, enable **Show "appsscript.json" manifest file in editor**, then add the `oauthScopes` key to `appsscript.json` next to the existing entries:

```json title="appsscript.json"
{
  "timeZone": "Etc/UTC",
  "dependencies": {
    "enabledAdvancedServices": [
      { "userSymbol": "Gmail", "serviceId": "gmail", "version": "v1" }
    ]
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/script.scriptapp"
  ],
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

Keep your own `timeZone` value. `gmail.modify` lets the script search and change labels but not permanently delete mail, and `script.scriptapp` lets `installTrigger` manage its trigger.

## Test It Before Scheduling

Run the same query directly in Gmail first:

```text
is:unread -in:inbox -in:spam -in:trash -in:snoozed
```

Review the results. If they are not the messages you intend to change, adjust `CONFIG.query` before running the script.

In Apps Script, select `markArchivedAsRead` and click **Run**. Google asks you to authorize the project on the first run. When it finishes, the execution log shows how many messages were marked, and the Gmail search above should return nothing.

## Install the Trigger

Select `installTrigger` and click **Run**. It creates one time-driven trigger that calls `markArchivedAsRead` every 15 minutes. Change `CONFIG.triggerMinutes` and run `installTrigger` again to use a different interval.

Open **Triggers** in the left sidebar to confirm there is exactly one trigger, and set its failure notifications to **Notify me immediately** if you want an email when a run fails. Past runs and their logs are on the **Executions** page.

!!! tip
    Once the backlog is cleared, each run takes a few seconds. That stays far below the daily trigger runtime quota (90 minutes per day on consumer accounts, 6 hours on Google Workspace).

If you no longer want the automation, delete the trigger first. Deleting the trigger stops future runs; deleting the project removes the script itself.

## Sources

- [Gmail advanced service in Apps Script][gmail-advanced-url]{target=\_blank}
- [Gmail API: `users.messages.list`][messages-list-url]{target=\_blank}
- [Gmail API: `users.messages.batchModify`][messages-batch-modify-url]{target=\_blank}
- [Apps Script: Lock Service][lock-service-url]{target=\_blank}
- [Apps Script: installable triggers][installable-triggers-url]{target=\_blank}
- [Apps Script quotas][quotas-url]{target=\_blank}
- [Gmail search operators][gmail-search-url]{target=\_blank}

<!-- appendices -->

<!-- urls -->

[apps-script-url]: https://script.google.com/ 'Google Apps Script'
[gmail-advanced-url]: https://developers.google.com/apps-script/advanced/gmail 'Gmail Advanced Service'
[messages-list-url]: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list 'Gmail API users.messages.list'
[messages-batch-modify-url]: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/batchModify 'Gmail API users.messages.batchModify'
[lock-service-url]: https://developers.google.com/apps-script/reference/lock/lock-service 'Apps Script Lock Service'
[installable-triggers-url]: https://developers.google.com/apps-script/guides/triggers/installable 'Apps Script Installable Triggers'
[quotas-url]: https://developers.google.com/apps-script/guides/services/quotas 'Apps Script Quotas'
[gmail-search-url]: https://support.google.com/mail/answer/7190 'Gmail Search Operators'

<!-- images -->

<!--css-->

<!-- end appendices -->
