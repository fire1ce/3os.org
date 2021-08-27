---
description: Linux - cPanel & WHM how to, guides, examples, and simple usage
---

# cPanel & WHM

## WHM replica

```bash
rsync -avz 192.168.1.122:/home/ /home/ --exclude="virtfs" --exclude="\.cp*" --exclude="cpeasyapache"
rsync -avz 192.168.1.122:/usr/local/apache/conf/ /usr/local/apache/conf/
rsync -avz 192.168.1.122:/var/named/ /var/named/
rsync -avz 192.168.1.122:/usr/local/cpanel/ /usr/local/cpanel/
rsync -avz 192.168.1.122:/var/cpanel/ /var/cpanel
```

```bash
chkconfig cpanel off
chkconfig exim off
chkconfig dovecot off
chkconfig pure-ftpd off
chkconfig named off
chkconfig mysql off
chkconfig csf off
chkconfig iptables off
```

```bash
hostname: /etc/sysconfig/network
```

```bash
change shared ip - You can change it in /etc/wwwacct.conf infront of ADDR parameter.
change ip - Usage: /usr/local/cpanel/bin/setsiteip [-u user | domain] ip   (/etc/trueuserowners)
rebuild httpd conf
restart apache
```

## Disable core files in CPanel account

Add this in /etc/sysctl.conf

```bash
kernel.core_uses_pid = 0
kernel.core_pattern = /dev/null
```

And then run:

```bash
sysctl -p
```

## Fix Installatron - error 500 or missing list/install

```bash
/usr/local/installatron/repair -f --release --quick
```

[Installatron FIX](https://installatron.com/docs/admin/troubleshooting#missinginstalls)

## Add HSTS support in CPANEL

```bash
cp -p /var/cpanel/templates/apache2_4/ssl_vhost.default /var/cpanel/templates/apache2_4/ssl_vhost.local
vi /var/cpanel/templates/apache2_4/ssl_vhost.local
```

Edit:

```bash
<VirtualHost[% FOREACH ipblock IN vhost.ips %] [% ipblock.ip %]:[% ipblock.port %][% END %]>
 # Enable HTTP Strict Transport Security
 Header always set Strict-Transport-Security "max-age=63072000; includeSubdomains;"
```

```bash
cp -p /var/cpanel/templates/apache2_4/main.default /var/cpanel/templates/apache2_4/main.local
vi /var/cpanel/templates/apache2_4/main.local
```

Edit:

```bash
[% IF main.sslprotocol.item.sslprotocol.length %]SSLProtocol [% main.sslprotocol.item.sslprotocol %][% END %]
SSLHonorCipherOrder on
```

Run:

```bash
/scripts/rebuildhttpdconf
service httpd restart
```

## Install mod_pagespeed on WHM

With EA3:

```bash
/usr/local/cpanel/3rdparty/bin/git clone https://github.com/pagespeed/cpanel.git /tmp/pagespeed/
cd /tmp/pagespeed/Easy
tar -zcvf Speed.pm.tar.gz pagespeed
mkdir -p /var/cpanel/easy/apache/custom_opt_mods/Cpanel/Easy
mv Speed.pm Speed.pm.tar.gz -t /var/cpanel/easy/apache/custom_opt_mods/Cpanel/Easy/
cd && rm -rf /tmp/pagespeed
```

With EA4:
Create file /etc/rpm/macros.apache2 and add the following lines of code exactly as below

```bash
%_httpd_mmn 20120211x8664
%_httpd_apxs /usr/bin/apxs
%_httpd_dir /etc/apache2
%_httpd_bindir %{_httpd_dir}/bin
%_httpd_modconfdir %{_httpd_dir}/conf.modules.d
%_httpd_confdir %{_httpd_dir}/conf.d
%_httpd_contentdir /usr/share/apache2
%_httpd_moddir /usr/lib64/apache2/modules
```

Next run the following commands in order, make sure you run each command on it’s own

```bash
rm -rf /root/rpmbuild/RPMS/x86_64/
wget https://github.com/pagespeed/cpanel/raw/master/EA4/ea-apache24-mod_pagespeed-latest-stable.src.rpm
rpmbuild --rebuild ea-apache24-mod_pagespeed-latest-stable.src.rpm
rpm -Uvh /root/rpmbuild/RPMS/x86_64/ea-apache24-mod_pagespeed*.rpm
/etc/init.d/httpd restart
```

## Fix WHM/CPanel templates

```bash
cp /usr/local/apache/conf/httpd.conf{,.cptech-`date +%Y%m%d`}
mv /var/cpanel/templates/apache2_4/vhost.local /var/cpanel/templates/apache2_4/vhost.local.bak
mv /var/cpanel/templates/apache2_4/ssl_vhost.local /var/cpanel/templates/apache2_4/ssl_vhost.local.bak
/scripts/rebuildhttpdconf
/scripts/restartsrv_httpd
```

## Login to WHM with link

```bash
whmapi1 create_user_session user=root service=whostmgrd locale=en
```

## Size of suspended accounts in WHM

```bash
for i in `whmapi1 listsuspended|grep user|cut -d: -f2`; do echo "Suspended account: $i - using" `whmapi1 listaccts search=$i searchtype=user|grep diskused|cut -d: -f2`; done
```

## Cpanel resources consumption history per user

```bash
OUT=$(/usr/local/cpanel/bin/dcpumonview | grep -v Top | sed -e 's#<[^>]*># #g' | while read i ; do NF=`echo $i | awk {'print NF'}` ; if [[ "$NF" == "5" ]] ; then USER=`echo $i | awk {'print $1'}`; OWNER=`grep -e "^OWNER=" /var/cpanel/users/$USER | cut -d= -f2` ; echo "$OWNER $i"; fi ; done) ; (echo "USER CPU" ; echo "$OUT" | sort -nrk4 | awk '{printf "%s %s%\n",$2,$4}' | head -5) | column -t ;echo;(echo -e "USER MEMORY" ; echo "$OUT" | sort -nrk5 | awk '{printf "%s %s%\n",$2,$5}' | head -5) | column -t ;echo;(echo -e "USER MYSQL" ; echo "$OUT" | sort -nrk6 | awk '{printf "%s %s%\n",$2,$6}' | head -5) | column -t ;
```

## PHP.INI upload big files

```bash
ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '10M');
ini_set('max_input_time', 300);
ini_set('max_execution_time', 300);
```

## Most accessed sites in the last minute

```bash
cat <<'SCRIPT' >>/root/sitesLoad.sh

#!/bin/bash
if [[ `netstat -ntalp | grep :80 | awk '$4 ~ /:80/ {print $0;exit}' | grep -q httpd; echo $?` -ne 0 ]]; then echo "Main web server is not Apache. Exiting..."; exit 1; fi

log=/tmp/hostPop
i=0
find /usr/local/apache/domlogs/ -type f -mmin -1 ! -group root -exec ls -l {} \+ | awk '{print $4, $9}' | column -t>$log

while read line; do
((++i))
       arr[$i]=$i
       arr[$i*1000]=$(printf "$line" | awk '{print $1}')
       arr[$i*1001]=$(printf "$line" | awk '{print $2}')
       arr[$i*1002]=$(wc -l `echo $line | awk '{print $NF}'` | cut -d' ' -f 1)
done < <(cat $log)

echo "Analyzing apache logs in realtime for 1 minute..."; sleep 60

for (( var=1 ; var<=$i ; var++ ))
do
       printf "${arr[$var*1000]} ${arr[$var*1001]} "
       echo $((`wc -l $(echo ${arr[$var*1001]}) | cut -d' ' -f 1` - ${arr[$var*1002]}));
done | sed -e 's/\/usr\/local\/apache\/domlogs\///g' | sort -nrk 3 | column -t

SCRIPT
chmod 700 /root/sitesLoad.sh && /root/sitesLoad.sh
```
