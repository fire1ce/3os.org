---
description: Linux - Nginx how to, guides, examples, and simple usage
---

# Nginx

## Show all domains in NGINX configuration

```bash
grep -e "^\s*server_name" /etc/nginx/conf.d/*|sed -e 's/[\t ]*server_name//g;'|sed -e "s/ /\+/g"|sed -e 's/;//g'|while read line; do for i in $line; do echo -n "$i "|sed -e 's/://'  -e 's/\+/\n  |--/g'; done ;echo; done; echo
```

## Engintron generate custom_rules for all domains on the server

```bash
ip=`hostname -i` && for domain in `httpd -S |  grep www. | awk -F 'www.' '{print $2}'`;do printf "if ( \$host ~ \"%s\") {set \$PROXY_DOMAIN_OR_IP \"$ip\";}\n" $domain ;done >> /etc/nginx/custom_rules && service nginx reload
```
