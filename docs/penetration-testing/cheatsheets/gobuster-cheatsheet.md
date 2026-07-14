---
title: Gobuster CheatSheet
description: Gobuster CheatSheet - practical example commands and a full flag reference for directory, DNS, vhost, S3, GCS, TFTP, and fuzzing modes in Gobuster 3.8.
template: comments.html
tags: [penetration-testing, tools, cheatsheet]
---

# Gobuster CheatSheet

[Gobuster][gobuster-url]{target=\_blank} is a fast brute-forcing tool for URIs (directories and files), DNS subdomains, virtual hosts, and cloud storage buckets. This cheat sheet covers the most common commands and the full flag reference as of Gobuster 3.8.

!!! note "Short flags changed"

    Modern Gobuster uses **multi-character short flags** (e.g. `-do` for `--domain`, `-np` for `--no-progress`). The single-letter forms from older versions no longer all apply.

## Available Modes

| Mode  | Description                                             |
| ----- | ------------------------------------------------------ |
| dir   | Directory and file brute-forcing (the classic mode)    |
| dns   | DNS subdomain brute-forcing                            |
| vhost | Virtual host brute-forcing (not the same as DNS)       |
| fuzz  | Custom fuzzing with the `FUZZ` keyword                 |
| s3    | Enumerate open Amazon S3 buckets                       |
| gcs   | Enumerate open Google Cloud Storage buckets            |
| tftp  | Enumerate files on TFTP servers                        |

## Common Commands

### dir Mode

Basic directory scan:

```shell
gobuster dir -u https://example.com -w ~/wordlists/shortlist.txt
```

Search for specific file extensions:

```shell
gobuster dir -u https://example.com -w wordlist.txt -x php,html,js,txt
```

Show the response length, and filter by positive status codes:

```shell
gobuster dir -u https://example.com -w wordlist.txt -l -s 200,301,302
```

!!! note "Status-code filtering changed"

    Gobuster now filters by a **blacklist** by default: `--status-codes-blacklist` (`-b`) defaults to `404`, and `--status-codes` (`-s`) is empty. Set `-s` to switch to a positive whitelist (it overrides the blacklist), or clear the blacklist with `-b ""`.

### dns Mode

Basic subdomain scan (note `-do`/`--domain`):

```shell
gobuster dns -do example.com -w ~/wordlists/subdomains.txt
```

Use a custom resolver and more threads:

```shell
gobuster dns -do example.com -w ~/wordlists/subdomains.txt -r 8.8.8.8:53 -t 50
```

### vhost Mode

Virtual-host scan. Pass `--append-domain` to append the base domain to each wordlist entry (this is no longer the default):

```shell
gobuster vhost -u https://example.com --append-domain -w ~/wordlists/vhosts.txt
```

### fuzz Mode

Fuzz any part of the request with the `FUZZ` keyword:

```shell
gobuster fuzz -u "https://example.com?param=FUZZ" -w wordlist.txt
```

### s3 / gcs / tftp Modes

```shell
gobuster s3 -w bucket-names.txt
gobuster gcs -w bucket-names.txt
gobuster tftp -s 10.0.0.1 -w wordlist.txt
```

## Global Flags

These apply to every mode.

| Short | Long              | Description                                          |
| ----- | ----------------- | --------------------------------------------------- |
| -w    | --wordlist        | Path to the wordlist (set to `-` to read STDIN)     |
| -t    | --threads         | Number of concurrent threads (default 10)           |
| -d    | --delay           | Time each thread waits between requests (e.g. 1500ms) |
| -o    | --output          | Output file to write results to (defaults to stdout) |
| -q    | --quiet           | Don't print the banner and other noise              |
| -np   | --no-progress     | Don't display progress                              |
| -ne   | --no-error        | Don't display errors                                |
| -nc   | --no-color        | Disable color output                                |
| -p    | --pattern         | File containing replacement patterns                |
| -wo   | --wordlist-offset | Resume from a given position in the wordlist        |
| -v    | --verbose         | Verbose output                                      |
|       | --debug           | Enable debug output                                 |

## HTTP Options

Shared by the HTTP-based modes (dir, vhost, fuzz).

| Short | Long                | Description                                             |
| ----- | ------------------- | ------------------------------------------------------ |
| -u    | --url               | The target URL                                         |
| -c    | --cookies           | Cookies to use for the requests                        |
| -H    | --headers           | Specify HTTP headers, `-H 'Header1: val1' -H 'Header2: val2'` |
| -r    | --follow-redirect   | Follow redirects                                       |
| -k    | --no-tls-validation | Skip TLS certificate verification                      |
| -a    | --useragent         | Set the User-Agent string                              |
| -rua  | --random-agent      | Use a random User-Agent string                         |
| -to   | --timeout           | HTTP timeout (default 10s)                             |
| -ra   | --retry-attempts    | Times to retry on request timeout                      |
| -U    | --username          | Username for Basic Auth                                |
| -P    | --password          | Password for Basic Auth                                |
| -m    | --method            | HTTP method to use                                     |
|       | --proxy             | Proxy to use for requests `[http(s)://host:port]`      |

## dir Mode Options

| Short | Long                     | Description                                             |
| ----- | ------------------------ | ------------------------------------------------------ |
| -x    | --extensions             | File extension(s) to search for                        |
|       | --extensions-file        | Read file extensions from a file                       |
| -s    | --status-codes           | Positive status codes (overrides the blacklist if set) |
| -b    | --status-codes-blacklist | Negative status codes (default `404`; overrides `-s`)  |
| -l    | --include-length         | Include the length of the body in the output           |
|       | --hide-length            | Hide the length of the body from the output            |
|       | --exclude-length         | Exclude responses of a given content length            |
| -f    | --add-slash              | Append `/` to each request                             |
| -e    | --expanded               | Expanded mode, print full URLs                         |
| -n    | --no-status              | Don't print status codes                               |
| -d    | --discover-backup        | Upon finding a file, also search for backup files      |

## dns Mode Options

| Short | Long          | Description                                                  |
| ----- | ------------- | ----------------------------------------------------------- |
| -do   | --domain      | The target domain                                           |
| -r    | --resolver    | Use a custom DNS server (`server.com` or `server.com:port`) |
| -c    | --check-cname | Also check CNAME records                                    |
| -to   | --timeout     | DNS resolver timeout (default 1s)                           |
| -wc   | --wildcard    | Force continued operation when a wildcard is found          |
| -nf   | --no-fqdn     | Don't automatically add a trailing dot to the domain        |

## vhost Mode Options

| Short | Long                      | Description                                              |
| ----- | ------------------------- | ------------------------------------------------------- |
|       | --append-domain           | Append the base domain to each wordlist entry           |
|       | --exclude-length          | Exclude responses of a given content length             |
|       | --exclude-hostname-length | Adjust `--exclude-length` dynamically by hostname length |
|       | --exclude-status          | Negative status codes to hide                           |

## Credit

Gobuster is created and maintained by [OJ Reeves (@TheColonial)][gobuster-url]{target=\_blank}.

<!-- appendices -->

<!-- urls -->

[gobuster-url]: https://github.com/OJ/gobuster 'Gobuster Github Repository'

<!-- images -->

<!--css-->

<!-- end appendices -->
