---
title: Awesome Nav for MkDocs
description: Install and configure Awesome Nav for MkDocs with current .nav.yml navigation, title, sorting, and glob examples.
template: comments.html
tags: [mkdocs, markdown, navigation]
---

# Awesome Nav for MkDocs

Awesome Nav lets each documentation directory control its own MkDocs navigation without maintaining one large `nav` tree in `mkdocs.yml`.

!!! info "Plugin renamed"
    Version 3 was rewritten and renamed from `mkdocs-awesome-pages-plugin` to `mkdocs-awesome-nav`. The old `.pages` file is now `.nav.yml` by default, and several option names changed.

## Install and enable it

```shell
python -m pip install mkdocs-awesome-nav
```

Add the plugin to `mkdocs.yml`. Keep `search` if the site uses MkDocs search:

```yaml
plugins:
  - search
  - awesome-nav
```

Do not configure a second, competing navigation system until you have tested how it interacts with the existing site.

## Reorder a directory

Create `.nav.yml` inside the relevant documentation directory:

```yaml
nav:
  - index.md
  - getting-started.md
  - guides/
  - reference.md
```

Paths are relative to that `.nav.yml` file.

## Keep the rest automatically

Use a quoted glob to place the pages you named first and then include everything else:

```yaml
nav:
  - index.md
  - "*"
```

The quotes matter because YAML treats an unquoted leading `*` as an alias.

Use a deep glob when you deliberately want matching nested pages flattened into the same level:

```yaml
nav:
  - "**/*.md"
```

## Rename a section

```yaml
title: Practical Guides
```

The title applies to the directory containing the `.nav.yml` file.

## Sort matched entries

```yaml
nav:
  - glob: "*"
    sort:
      by: filename
      direction: asc
      type: natural
```

Start with the smallest rule that solves the navigation problem. A short local file is easier to maintain than a site-wide list with every page repeated.

## Migrating an old `.pages` file

Before upgrading a live site:

1. Install `mkdocs-awesome-nav` in a branch or local environment.
2. Rename `.pages` to `.nav.yml`.
3. Replace old `...` rest entries with quoted glob patterns such as `"*"`.
4. Review renamed and removed options in the official migration guide.
5. Run `mkdocs build --strict` and inspect the rendered navigation.

## Sources

- [Awesome Nav documentation][awesome-nav]
- [Custom navigation and glob patterns][awesome-nav-nav]
- [Version 2 to 3 migration guide][awesome-nav-migration]

<!-- appendices -->

[awesome-nav]: https://lukasgeiter.github.io/mkdocs-awesome-nav/
[awesome-nav-nav]: https://lukasgeiter.github.io/mkdocs-awesome-nav/features/nav/
[awesome-nav-migration]: https://lukasgeiter.github.io/mkdocs-awesome-nav/migration-v3/

<!-- end appendices -->
