---
title: Metadata
description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Meta Data examples and simple usage
---

The [Metadata][1] extension makes it possible to add metadata to a document
which gives more control over the theme in a page-specific context.

## Installation

Add the following lines to your `mkdocs.yml`:

```yaml
markdown_extensions:
  - meta
```

## Usage

Metadata is written as a series of key-value pairs at the beginning of the
Markdown document, delimited by a blank line which ends the metadata context.
Naturally, the metadata is stripped from the document before rendering the
actual page content and made available to the theme.

Example:

```markdown
---
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
path: path/to/file
---

# Headline

...
```

See the next section which covers the metadata that is supported by Material.

## Meta Title

The page title can be overridden on a per-document level:

```markdown
title: Lorem ipsum dolor sit amet
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. It will also override the default behavior of Material
for MkDocs which appends the site title using a dash as a separator to the page
title.

## Meta description

The page description can also be overridden on a per-document level:

```yaml
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.
