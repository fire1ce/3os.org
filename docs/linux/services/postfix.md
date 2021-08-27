---
description: Postfix - Debian/Ubuntu/CentOS Postfix Install With GMAIL SMTP Relay
---

# Postfix

## Debian/Ubuntu Postfix Install With GMAIL SMTP Relay

```bash
apt-get update && apt-get install -y postfix mailutils
```

create/edit file:
```bash
/etc/postfix/sasl_passwd
```

with:

```bash
[smtp.gmail.com]:587 example.gmail.com:yourpassortoekn
```

save&exit

```bash
chmod 600 /etc/postfix/sasl_passwd
rm -rf /etc/postfix/main.cf
```

create and edit new /etc/postfix/main.cf

```bash
relayhost = [smtp.gmail.com]:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_security_options =
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
inet_interfaces = loopback-only
```

Run:

```bash
postmap /etc/postfix/sasl_passwd
systemctl restart postfix && systemctl enable postfix
```

Now test outgoing email:

```bash
echo "Testing my new postfix setup" | mail -s "Test email from `hostname`" your@email_address
```

## CentOS Postfix Install With GMAIL SMTP Relay

```bash
dnf update && dnf install -y postfix mailx cyrus-sasl cyrus-sasl-plain
```

create/edit file:
```bash
/etc/postfix/sasl_passwd
```

with:

```bash
[smtp.gmail.com]:587 example.gmail.com:yourpassortoekn
```

save&exit

```bash
chmod 600 /etc/postfix/sasl_passwd
rm -rf /etc/postfix/main.cf
```

create and edit new /etc/postfix/main.cf

```bash
relayhost = [smtp.gmail.com]:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_security_options =
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_CAfile = /etc/ssl/certs/ca-bundle.crt
inet_interfaces = loopback-only
```

Run:

```bash
postmap /etc/postfix/sasl_passwd
systemctl restart postfix && systemctl enable postfix
```

Now test outgoing email:

```bash
echo "Testing my new postfix setup" | mail -s "Test email from `hostname`" your@email_address
```
