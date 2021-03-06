---
description: Linux General how to, guides, examples, and simple usage
---

# General Snippets

## Disable SSH Login Welcome Message

To disable

```bash
touch ~/.hushlogin
```

To re-enable

```bash
rm -rf ~/.hushlogin
```

## Redirect Output to a File and Stdout With _tee_

The command you want is named `tee`:

```bash
foo | tee output.file
```

For example, if you only care about stdout:

```bash
ls -a | tee output.file
```

If you want to include stderr, do:

```bash
program [arguments...] 2>&1 | tee outfile
```

2>&1 redirects channel 2 (stderr/standard error) into channel 1 (stdout/standard output), such that both is written as stdout. It is also directed to the given output file as of the tee command.

Furthermore, if you want to append to the log file, use tee -a as:

```bash
program [arguments...] 2>&1 | tee -a outfile
```

## Add Permanent Path to Application

First find the location of the Application/Service:

```bash
find / -name ApplicationName
```

Go to the path where the application is located

```bash
cd "../../../ApplicationName"
```

Run this command for ZSH:

```bash
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.zshrc && source ~/.zshrc
```

Run this command for "Bash Profile":

```bash
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.profile && source ~/.profile
```

Run this command for "Bash":

```bash
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bashrc && source ~/.bashrc
```

## Create Symbolic Links

To create a symbolic link in Unix/Linux, at the terminal prompt, enter:

```bash
ln -s source_file target_file
```

to remove symbolic link use the `rm` command on the link

## Open Last Edited File

```bash
less `ls -dx1tr /usr/local/cpanel/logs/cpbackup/*|tail -1`
```

## Kill Process That Runs More Than X Time

Kill cgi after 30 secs:

```bash
for i in `ps -eo pid,etime,cmd|grep cgi|awk '$2 > "00:30" {print $1}'`; do kill $i; done
```
