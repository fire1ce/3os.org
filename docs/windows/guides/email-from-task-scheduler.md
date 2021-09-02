---
description: How to send emails from the windows task scheduler
---


# Send Emails From The Windows Task Scheduler

First, [download SendEmail](https://github.com/fire1ce/sendEmail-windwos-v1.56/archive/master.zip "SendEmail"), a free (and open source) tool for sending emails from the command line. Extract the downloaded archive into a folder on your computer.

![SendEmails](../assets/images/windows/sendMail/sendMail1.png)

Next, launch the Windows Task Scheduler and create a new task – consult our guide to creating scheduled tasks for more information. You can create a task that automatically sends an email at a specific time or a task that sends an email in response to a specific event.

When you reach the Action window, select Start a program instead of Send an e-mail.

![SendEmails](../assets/images/windows/sendMail/sendMail2.png)

In the Program/script box, use the Browse button and navigate to the SendEmail.exe file on your computer.

![SendEmails](../assets/images/windows/sendMail/sendMail3.png)

Finally, you’ll have to add the arguments required to authenticate with your SMTP server and construct your email. Here’s a list of the options you can use with SendEmail:

### Server Options

> * -f EMAIL – The email address you’re sending from.  
> * -s SERVER:PORT – The SMTP server and port it requires.  
> * -xu USERNAME – The username you need to authenticate with the SMTP server.  
> * -xp PASSWORD – The password you need to authenticate with the SMTP server.  
> * -o tls=yes – Enables TLS encryption. May be necessary for some SMTP servers.  

__If you’re using Gmail’s SMTP servers, these are the server options you’ll need:__

> * -s smtp.gmail.com:587 -xu you@gmail.com -xp password -o tls=yes

Of course, you’ll have to enter your own email address and password here.

### Destination Options

> * -t EMAIL – The destination email address. You can send an email to multiple addresses by including a space between each address after the -t option.  
> * -cc EMAIL – Any addresses you’d like to CC on the email. You can specify multiple addresses by placing a space between each email address, just as with the -t command above.  
> * -bcc EMAIL – The BCC version of the CC option above.  

### Email Options

> * -u SUBJECT – The subject of your email  
> * -m BODY – The message body text of your email.  
> * -a ATTACHMENT – The path of a file you’d like to attach. This is optional.  

For example, let’s say your email address is you@gmail.com and you’d like to send an email to person@example.com. You’d use the following options:

```cmd
-f you@gmail.com -t person@example.com -u Subject -m This is the body text! -s smtp.gmail.com:587 -xu you@gmail.com -xp password -o tls=yes
```

Once you’ve put together your options, copy and paste them into the Add arguments box.

![SendEmails](../assets/images/windows/sendMail/sendMail4.png)

Save your task and you’re done. Your task will automatically send email on the schedule (or in response to the event) you specified.
