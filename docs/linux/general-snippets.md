---
title: General Snippets
description: Linux general snippets for the Linux user. This is a collection of tips and tricks for the Linux user.
template: comments.html
tags: [linux, snippets]
---

# General Snippets

## Disable SSH Login Welcome Message

To disable

```shell
touch ~/.hushlogin
```

To re-enable

```shell
rm -rf ~/.hushlogin
```

## Change Sudo Password Requirement Timeout In Linux

To change sudo password timeout limit in Linux, run:

```shell
sudo visudo
```

This command will open the **/etc/sudoers** file in **nano** editor.

Find the following line:

```shell
Defaults env_reset
```

Change it like below the **30** is the number of minutes you want to set the timeout to.

```shell
Defaults env_reset, timestamp_timeout=30
```

## Redirect Output to a File and Stdout With _tee_

The command you want is named `tee`:

```shell
foo | tee output.file
```

For example, if you only care about stdout:

```shell
ls -a | tee output.file
```

If you want to include stderr, do:

```shell
program [arguments...] 2>&1 | tee outfile
```

2>&1 redirects channel 2 (stderr/standard error) into channel 1 (stdout/standard output), such that both is written as stdout. It is also directed to the given output file as of the tee command.

Furthermore, if you want to append to the log file, use tee -a as:

```shell
program [arguments...] 2>&1 | tee -a outfile
```

## Add Permanent Path to Application

First find the location of the Application/Service:

```shell
find / -name ApplicationName
```

Go to the path where the application is located

```shell
cd "../../../ApplicationName"
```

Run this command for ZSH:

```shell
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.zshrc && source ~/.zshrc
```

Run this command for "shell Profile":

```shell
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.profile && source ~/.profile
```

Run this command for "shell":

```shell
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.shellrc && source ~/.shellrc
```

## Create Symbolic Links

To create a symbolic link in Unix/Linux, at the terminal prompt, enter:

```shell
ln -s source_file target_file
```

to remove symbolic link use the `rm` command on the link

## Open Last Edited File

```shell
less `ls -dx1tr /usr/local/cpanel/logs/cpbackup/*|tail -1`
```

## Kill Process That Runs More Than X Time

Kill cgi after 30 secs:

```shell
for i in `ps -eo pid,etime,cmd|grep cgi|awk '$2 > "00:30" {print $1}'`; do kill $i; done
```
