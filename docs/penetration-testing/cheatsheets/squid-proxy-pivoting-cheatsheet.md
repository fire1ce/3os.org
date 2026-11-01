---
title: Squid Proxy Pivoting CheatSheet
description: Cheat sheet for pentesting a Squid proxy on port 3128. Check for an open proxy, pivot with proxychains and scan internal ports using the CONNECT method.
template: comments.html
tags: [penetration-testing, tools, cheatsheet]
---

# Squid Proxy Pivoting CheatSheet

Squid is a caching and forwarding HTTP proxy, usually listening on port 3128. When it is misconfigured, it can be used as a pivot to reach services that are only visible from the proxy itself, like loopback-only services or internal subnets. This cheat sheet collects the commands to check, abuse and scan through a Squid proxy during an authorized penetration test.

## Detect an Open Proxy

Check the service version and test if the proxy relays requests with the Nmap `http-open-proxy` script:

```shell
nmap -Pn -sV -p 3128 --script http-open-proxy 10.10.10.10
```

Confirm that the proxy forwards traffic and see the public IP address used by the proxy:

```shell
curl -x http://10.10.10.10:3128 https://ifconfig.me
```

If the proxy requires authentication, curl returns `407 Proxy Authentication Required`. Supply the credentials like this:

```shell
curl -x http://username:password@10.10.10.10:3128 http://example.com -v
```

## Reach Internal Services

Request a loopback-only web service through the proxy:

```shell
curl -x http://10.10.10.10:3128 http://127.0.0.1:8080/ -v
```

Open a TLS connection to an internal service using the `CONNECT` method:

```shell
openssl s_client -proxy 10.10.10.10:3128 -connect 127.0.0.1:443 -quiet
```

!!! note "403 Does Not Mean Closed"

    A `403` answer from Squid means that the proxy ACLs deny the destination, it doesn't mean that the port is closed on the target.

## Proxychains Over HTTP

Add the proxy at the end of the proxychains configuration file:

```ini title="/etc/proxychains.conf"
[ProxyList]
http 10.10.10.10 3128
# http 10.10.10.10 3128 username password
```

Run a TCP connect scan against the proxy loopback, through the proxy:

```shell
proxychains nmap -sT -Pn -n -p- 127.0.0.1
```

!!! warning ""

    Proxychains only intercepts TCP `connect()` calls. SYN and UDP scans will not work through it.

## Scan Internal Ports With mysquidscanner

[mysquidscanner][mysquidscanner-url]{target=\_blank} is an asyncio port scanner that uses the `CONNECT` method through the Squid proxy. It only needs the Python standard library, and it grabs a banner from every open port.

Scan specific ports on the proxy loopback:

```shell
python3 mysquid.py --proxy 10.10.10.10:3128 --target 127.0.0.1 --ports 22,80,443
```

Scan all the TCP ports of an internal host:

```shell
python3 mysquid.py --proxy 10.10.10.10:3128 --target 192.168.1.50 --allports
```

Use a proxy that requires Basic authentication and show the ports denied by the Squid policy:

```shell
python3 mysquid.py --proxy username:password@10.10.10.10:3128 --target 127.0.0.1 --show-blocked
```

Every port is classified with one of the following statuses:

| Status    | Description                                   |
| --------- | --------------------------------------------- |
| `OPEN`    | The connection works, the banner is displayed |
| `BLOCKED` | Denied by the Squid ACL (403)                 |
| `CLOSED`  | The port is closed on the target              |
| `AUTH`    | The proxy requires authentication (407)       |
| `TIMEOUT` | No answer before the timeout                  |
| `ERROR`   | Other connection errors                       |

The open ports are also saved in the `Squid_Port.txt` file.

Alternatively, [SPOSE][spose-url]{target=\_blank} (Squid Pivoting Open Port Scanner) does the same job:

```shell
python3 spose.py --proxy http://10.10.10.10:3128 --target 10.10.10.10
```

## Check the Cache Manager

Misconfigured Squid proxies sometimes expose the Cache Manager, which can leak the version, counters and configuration details. On modern Squid versions it is available below `/squid-internal-mgr/`:

```shell
curl http://10.10.10.10:3128/squid-internal-mgr/menu
```

Get the general information about the running proxy:

```shell
curl http://10.10.10.10:3128/squid-internal-mgr/info
```

More details about the Cache Manager are available in the [Squid documentation][squid-cache-manager-url]{target=\_blank}.

## Learn More

A full write-up about Squid pentesting, open proxy abuse, pivoting and hardening is available in [Squid Proxy Port 3128: Pentest, Pivoting and Secure Configuration][hackita-squid-url]{target=\_blank}.

## Credit

Thanks to [@aancw][aancw-url]{target=\_blank} for SPOSE.

<!-- appendices -->

<!-- urls -->

[mysquidscanner-url]: https://github.com/hack-ita/mysquidscanner 'mysquidscanner GitHub repository'
[spose-url]: https://github.com/aancw/spose 'SPOSE - Squid Pivoting Open Port Scanner'
[squid-cache-manager-url]: https://wiki.squid-cache.org/Features/CacheManager/Index 'The Cache Manager - Squid Web Cache wiki'
[hackita-squid-url]: https://en.hackita.it/articoli/porta-3128-squid-proxy/ 'Squid Proxy Port 3128 - Pentest, Pivoting and Secure Configuration'
[aancw-url]: https://github.com/aancw 'aancw on GitHub'

<!-- images -->

<!--css-->

<!-- end appendices -->
