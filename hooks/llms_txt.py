"""MkDocs hook: generate /llms.txt (llmstxt.org) from the site nav.

Runs on every build via the `hooks:` entry in mkdocs.yml — no plugin
install needed. Walks the resolved nav (awesome-pages order), reads each
page's frontmatter title/description, and writes an llms.txt index of
live page URLs to the site root.
"""

import os

SITE_URL = "https://3os.org"

HEADER = """\
# 3os

> Collection of technical documentation and guides for devops, developers,
> pentesters, systems administrators and other IT professionals: Linux, macOS,
> Windows, Proxmox, Docker, Synology, UniFi, Raspberry Pi, and more.

Maintained by Stas Yakobov. Source markdown: https://github.com/fire1ce/3os.org (docs/).
"""

OPTIONAL = """\
## Optional

- [What's New](https://3os.org/blog/): site changelog
- [Tags](https://3os.org/tags/): tag index
"""

SKIP_URLS = {"", "blog/", "tags/"}


def _walk(items, out):
    for item in items:
        if item.is_page:
            out.append(item)
        elif item.is_section:
            _walk(item.children, out)


def on_post_build(config, **kwargs):
    pages = _COLLECTED
    lines = [HEADER]
    for section, entries in pages:
        if not entries:
            continue
        lines.append(f"## {section}\n")
        for title, url, desc in entries:
            desc = f": {desc}" if desc else ""
            lines.append(f"- [{title}]({SITE_URL}/{url}){desc}")
        lines.append("")
    lines.append(OPTIONAL)
    path = os.path.join(config["site_dir"], "llms.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


_COLLECTED = []


def on_nav(nav, config, files, **kwargs):
    _COLLECTED.clear()
    for item in nav.items:
        if item.is_section:
            entries = []
            section_pages = []
            _walk(item.children, section_pages)
            for page in section_pages:
                page.read_source(config)
                meta = page.meta or {}
                title = meta.get("title") or page.title or page.file.name
                desc = (meta.get("description") or "").strip().rstrip(".")
                url = page.file.url
                if url in SKIP_URLS:
                    continue
                entries.append((title, url, desc))
            _COLLECTED.append((item.title, entries))
        elif item.is_page and item.file.url not in SKIP_URLS:
            item.read_source(config)
            meta = item.meta or {}
            title = meta.get("title") or item.title or item.file.name
            desc = (meta.get("description") or "").strip().rstrip(".")
            _COLLECTED.append((title, [(title, item.file.url, desc)]))
    return nav
