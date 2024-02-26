---
title: Let's Encrypt with Cloudflare
description: Install valid SSL certificate with Let's Encrypt and Cloudflare DNS for Proxmox VE.
template: comments.html
tags: [proxmox, cloudflare, letsencrypt]
---

# Proxmox Valid SSL With Let's Encrypt and Cloudflare DNS

This is a guide to how to setup a valid SSL certificate with [Let's Encrypt][letsencrypt-url]{target=\_blank} and `Cloudflare DNS` for `Proxmox VE`.
[Let's Encrypt][letsencrypt-url]{target=\_blank} will allow you to obtain a valid SSL certificate for your Proxmox VE Server for free for 90 days. In the following steps, we will setup a valid SSL certificate for your Proxmox VE Server using Let's Encrypt and Cloudflare DNS Challenge.
The process of renewing the certificate is done automatically by Proxmox VE Server and you do not need to do anything manually to renew the certificate.

## Prerequarements

- Exisiting DNS record for the domain name you want to use for Proxmox VE.
- Cloudflare DNS Zone API Access Token.
- Cloudflare DNS Zone ID.

I won't be covcovering the process of creating the Zone API Tokens at this guide. You can find more information about this process [here][cloudflare-zone-api-tokens-url]{target=\_blank}.

## Instalaion and Configuration

The process will be done fully in Proxmox web interface.  
Login to the Proxmox web interface select `Datacenter`, find `ACME` and click on it.

![Proxmox Datacenter ACME][proxmox-datacenter-acme-img]

At `Account` section, click Add. Fill the `Account Name` and `E-Mail`. Accept the Terms and Conditions (TOC). Click `Register`.  
This will register an account for Let's Encrypt service in order to obtain a certificate.

![Proxmox ACME Account][proxmox-acme-account-img]

The output should be something like this:

![Proxmox ACME Account Output][proxmox-acme-account-output-img]

At `Challenge Plugin` ection, click Add. Fill the `Plugin ID` (name), at `DNS API` choose `Cloudflare Managed DNS`.  
`CF_Token=` and `CF_Zone_ID=` are the API Tokens and Zone ID for Cloudflare DNS - leave the rest empty.

![Proxmox API Cloudflare Plugin][proxmox-api-cloudflare-plugin-img]

The final screen should look like this:

!['Proxmox ACME Page][proxmox-acme-page-img]

Select the `Pve Server` in my case its name `proxmox`, under `System` select `Certificates`.

![Proxmox System Certificate][proxmox-system-certificate-img]

At `ACME` section, click `Edit` and select the `Account` we created earlier.

![Proxmox ACME Edit][proxmox-acme-edit-img]

Click `Add`, select `Challenge Type` `DNS` and `Challenge Plugin` the plugin we created earlier. `Domain` is the domain name we want to use for the certificate. Click `Create`.

![Proxmox Add Create Domain][proxmox-add-create-domain-img]

Now its time to issue the certificate. Click `Order Certificate Now`.

![Proxmox Order Certificate][proxmox-order-certificate-img]

At this point Proxmox will try to issue the certificate from Let's Encrypt and validate it with Cloudflare DNS Challenge.

If all goes well, you will see the following:

![Proxmox Certificate Order Output][proxmox-certificate-order-output-img]

Now the certificate is installed and ready to use. The renewal process is done automatically by Proxmox VE Server.

<!-- appendices -->

<!-- urls -->

[3os-url]: https://3os.org/ '3os Homepage'

[letsencrypt-url]: https://letsencrypt.org/ 'Let's Encrypt Homepage'
[cloudflare-zone-api-tokens-url]: https://developers.cloudflare.com/api/tokens/create/ 'Cloudflare Zone API Tokens'

<!-- images -->

[proxmox-datacenter-acme-img]: ../../assets/images/cf47b38c-c24d-11ec-a4fa-27a0a5d86a74.jpg 'Proxmox Datacenter ACME'
[proxmox-acme-account-img]: ../../assets/images/70c8abf0-c251-11ec-be47-07c6c26d75fe.jpg 'Proxmox ACME Account'
[proxmox-acme-account-output-img]: ../../assets/images/031314a0-c252-11ec-92e3-cb7e2b4fcc57.jpg 'Proxmox ACME Account Output'
[proxmox-api-cloudflare-plugin-img]: ../../assets/images/8a9bbbac-c252-11ec-9871-5bcb63df5ade.jpg 'Proxmox API Cloudflare Plugin'
[proxmox-acme-page-img]: ../../assets/images/7f3f35a8-c253-11ec-b95c-1b2519157bc5.jpg 'Proxmox ACME Page'
[proxmox-system-certificate-img]: ../../assets/images/35d878a6-c254-11ec-82e1-e7b3b5d34983.jpg 'Proxmox System Certificate'
[proxmox-acme-edit-img]: ../../assets/images/a7cb4ef2-c254-11ec-8d83-7b18dfbf3c3f.jpg 'Proxmox ACME Edit'
[proxmox-add-create-domain-img]: ../../assets/images/04c8614e-c255-11ec-979b-f3e490973775.jpg 'Proxmox Add Create Domain'
[proxmox-order-certificate-img]: ../../assets/images/a782d34c-c255-11ec-8f01-43f638c0c2de.jpg 'Proxmox Order Certificate'
[proxmox-certificate-order-output-img]: ../../assets/images/17e6d3ea-c256-11ec-a060-037aafbf469f.jpg 'Proxmox Certificate Order Output'

<!--css-->

<!-- end appendices -->
