---
title: Proxmox Let's Encrypt Certificate with Cloudflare DNS
description: Configure a trusted Proxmox VE certificate with Let's Encrypt, the ACME DNS challenge, and a scoped Cloudflare API token.
template: comments.html
tags: [proxmox, cloudflare, letsencrypt, acme, tls]
---

# Proxmox Let's Encrypt Certificate with Cloudflare DNS

This guide uses Proxmox VE's built-in ACME client and the Cloudflare DNS API. The DNS challenge works without exposing port 80 on the Proxmox node.

## Requirements

- A domain managed by Cloudflare DNS
- A DNS name for the Proxmox node
- A Cloudflare API token scoped to the required zone
- Access to the Proxmox VE web interface

Create the token from Cloudflare's **Edit Zone DNS** template and limit its resources to the exact zone. Treat the token like a password. Do not use the Global API Key.

## Register the ACME Account

1. In Proxmox, open **Datacenter** > **ACME**.
2. Under **Accounts**, select **Add**.
3. Enter an account name and email address.
4. Accept the terms and register the account.

Use the Let's Encrypt staging directory while testing to avoid production rate limits. Switch to production only after the DNS challenge works.

![Proxmox ACME account][proxmox-acme-account-img]

## Add the Cloudflare DNS Plugin

1. In **Datacenter** > **ACME**, select **Add** under **Challenge Plugins**.
2. Enter a clear plugin ID.
3. Select **DNS** as the challenge type.
4. Select **Cloudflare Managed DNS** as the DNS API.
5. Enter the credentials:

```text
CF_Token=your-scoped-api-token
CF_Zone_ID=your-zone-id
```

Do not add spaces around `=`. The Cloudflare plugin supports `CF_Token`; providing `CF_Zone_ID` lets the plugin address the exact zone without discovering it.

![Proxmox Cloudflare ACME plugin][proxmox-api-cloudflare-plugin-img]

## Add the Node Domain

1. Select the Proxmox node.
2. Open **System** > **Certificates**.
3. Under **ACME**, select **Accounts** or **Edit** and choose the account.
4. Select **Add**.
5. Choose the DNS challenge and the Cloudflare plugin.
6. Enter the complete DNS name for this node.

The requested name must belong to the Cloudflare zone available to the token.

![Proxmox node certificate settings][proxmox-system-certificate-img]

## Order and Verify the Certificate

Select **Order Certificate Now**. Proxmox creates the required DNS TXT record, completes the ACME challenge and installs the certificate when validation succeeds.

![Proxmox certificate order][proxmox-order-certificate-img]

Open the Proxmox URL by its configured DNS name and inspect the browser certificate. Confirm that the name matches and the chain is trusted.

Proxmox automatically attempts renewal through `pve-daily-update.service` when the certificate is expired or expires within the next 30 days.

## Troubleshooting

- Confirm the API token is active and limited to the correct zone.
- Confirm `CF_Zone_ID` matches that zone.
- Increase the plugin's validation delay if Cloudflare DNS changes are not visible before validation starts.
- Use staging while repeating tests.
- Review the Proxmox task output; do not paste the API token into logs or support posts.

## Sources

- [Proxmox VE Administration Guide: ACME certificates](https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf)
- [Cloudflare API token templates](https://developers.cloudflare.com/fundamentals/api/reference/template/)
- [acme.sh Cloudflare DNS plugin](https://github.com/acmesh-official/acme.sh/blob/master/dnsapi/dns_cf.sh)

<!-- appendices -->

[proxmox-acme-account-img]: ../../assets/images/70c8abf0-c251-11ec-be47-07c6c26d75fe.jpg 'Proxmox ACME Account'
[proxmox-api-cloudflare-plugin-img]: ../../assets/images/8a9bbbac-c252-11ec-9871-5bcb63df5ade.jpg 'Proxmox API Cloudflare Plugin'
[proxmox-system-certificate-img]: ../../assets/images/35d878a6-c254-11ec-82e1-e7b3b5d34983.jpg 'Proxmox System Certificate'
[proxmox-order-certificate-img]: ../../assets/images/a782d34c-c255-11ec-8f01-43f638c0c2de.jpg 'Proxmox Order Certificate'

<!-- end appendices -->
