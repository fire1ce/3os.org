---
description: Linux - WordPress how to, guides, examples, and simple usage
---

# WordPress

## WordPress login attack check

```bash
Crontab :
0 */6 * * *  sh /root/wplogin.sh

Script :
#!/bin/bash

###start editing
thold="100"
btime="359m"
###stop editing

egrep 'wp-login.php' /usr/local/apache/domlogs/* | grep -v ftp_log | awk -F : '{print $2}' | awk '{print $1}' | sort | uniq -c | sort -n | awk -v limit="$thold" '$1 > limit{print $2}' > $$_ip_$$

while IFS= read -r line
        do
                /usr/sbin/csf -td "$line"  "$btime" "banned for wordpress attack"
        done < $$_ip_$$
rm -f $$_ip_$$
```

## WordPress Pingback

Nginx:

```bash
# WordPress Pingback Request Denial
if ($http_user_agent ~* "WordPress") {
  return 403;
}
```

Apache:

```bash
BrowserMatchNoCase WordPress wordpress_ping
BrowserMatchNoCase Wordpress wordpress_ping
Order Deny,Allow
Deny from env=wordpress_ping
```

## One-time login to WordPress

Install wp cli:

```bash
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp
```

Run from the WordPress installed location:

```bash
useradmin=`wp user list --role=administrator --format=csv --allow-root | cut -d',' -f2 | head -2 | tail -1` &&  wp plugin install one-time-login --activate --allow-root && wp user one-time-login $useradmin --allow-root && user=$(stat -c "%U" `pwd`) && chown $user.$user wp-content/ -R
```
