---
title: Windows Local Intranet Zone Mapping
description: Safely manage Windows Site to Zone Assignment List policy and understand the legacy Local Intranet zone behavior.
template: comments.html
tags: [windows, group-policy, intranet, legacy]
---

# Windows Local Intranet Zone Mapping

Windows security zones came from Internet Explorer. Internet Explorer is retired, but some Windows components and Microsoft Edge IE mode still use zone mappings.

!!! warning "Legacy workflow retired"
    The old version of this page added entire private subnets through Internet Properties, included all UNC paths, and disabled the HTTPS requirement. I removed those steps. The Local Intranet zone uses a lower security template, so broad wildcard mappings can silently reduce protection for more systems than intended.

For managed Windows systems, use the **Site to Zone Assignment List** policy and add only exact, controlled destinations that genuinely require Intranet-zone behavior.

## Zone numbers

Microsoft documents these values:

| Value | Zone |
| ---: | --- |
| `1` | Local Intranet |
| `2` | Trusted Sites |
| `3` | Internet |
| `4` | Restricted Sites |

This page is about value `1`. Do not confuse it with Trusted Sites.

## Configure with Group Policy

1. Open the relevant local or domain Group Policy editor.
2. Go to **Administrative Templates > Windows Components > Internet Explorer > Internet Control Panel > Security Page**.
3. Open **Site to Zone Assignment List**.
4. Enable the policy and click **Show**.
5. Add the exact host or fully qualified domain name as the value name and `1` as the value.

Use an explicit `https://host.example.internal` entry when only HTTPS should receive the mapping. Microsoft notes that a bare host applies the assignment across protocols. Do not add URL paths or trailing slashes.

Prefer an exact hostname over a subnet or wildcard. If an IP range is unavoidable, document the owner and scope and review it regularly.

Apply and inspect the policy:

```powershell
gpupdate /force
gpresult /h "$env:TEMP\zone-policy.html"
Start-Process "$env:TEMP\zone-policy.html"
```

## When not to use this

- Do not add a public website just to suppress a prompt.
- Do not map an entire VPN, Wi-Fi, or RFC1918 range because it is “inside.”
- Do not disable HTTPS verification to make an HTTP application look trusted.
- Do not use zone mapping as a replacement for TLS, authentication, or application fixes.

If an old application requires IE mode, manage both the IE mode site list and security-zone policy through the organization's normal browser and endpoint management process.

## Sources

- [Microsoft: Internet Explorer Policy CSP and Site to Zone Assignment List][ms-zone-policy]
- [Microsoft: intranet site identified as an Internet site][ms-zone-troubleshooting]
- [Microsoft Edge: configure IE mode][ms-ie-mode]

<!-- appendices -->

[ms-zone-policy]: https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-internetexplorer#allowsitetozoneassignmentlist
[ms-zone-troubleshooting]: https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/intranet-site-identified-as-an-internet-site
[ms-ie-mode]: https://learn.microsoft.com/en-us/deployedge/edge-ie-mode

<!-- end appendices -->
