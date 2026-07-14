# 3os.org Writing Guidelines

Authoring conventions for this site, distilled from the full corpus (all 137 pages) and
[`template.md`](template.md). The site is maintained both by hand and with LLM assistance —
**every new or edited page must follow these rules** so the two workflows stay indistinguishable.
`docs/utilities/markdown-cheatsheet/` is the canonical syntax reference; this file is the policy
on top of it. Where old pages conflict with this document, this document wins.

## 1. Page skeleton

Every content page follows [`template.md`](template.md):

```markdown
---
title: Short Title
description: 1–3 sentences, ~80–160 chars. Keyword-rich; often opens "Cheat sheet for X." or a one-line definition.
template: comments.html
tags: [section-tag, topic-tag]
---

# Longer Descriptive Title In Title Case

Intro paragraph (1–3 sentences, usually paraphrasing the description).

## Section

Body...

<!-- appendices -->

<!-- urls -->

[some-url]: https://example.com/ 'Title of the link'

<!-- images -->

[some-img]: /assets/images/<section>/<name>.png 'Title of the image'

<!--css-->

<!-- end appendices -->
```

Rules:

- **Frontmatter is mandatory**: `title`, `description`, `tags` on every page. Field names are
  lowercase (`title:`, never `Title:`/`tile:`).
- **`template: comments.html`** goes on every how-to, guide, tool, and cheat-sheet page.
  It is deliberately **omitted** on pure-reference pages (`docs/utilities/markdown-cheatsheet/`)
  and legal/info pages (`docs/information/`). `docs/index.md` uses `home.html`.
- `title` is short (nav/tab label); the `# H1` is longer and more descriptive. Exactly
  **one H1 per page** — never open a page with an H2 or a bold line as a fake title.
- **Title Case** for H1–H3 headings.
- The **appendices block is mandatory on content pages and kept even when empty** — it is
  template scaffolding. Use the `<!-- urls -->` / `<!-- images -->` / `<!--css-->` sub-labels.
  Page-specific `<style>…</style>` overrides go inside it (and close every brace).
- Never leave unused/dead ref definitions behind (clone-over residue).

## 2. Links

- **Reference-style only** in body text — never inline `[text](url)` on content pages.
  Definitions live in the appendices block.
- Ref IDs are descriptive kebab-case, suffixed **`-url`** (links) / **`-img`** (images):
  `[watchtower-docs-url]`, `[pm2-list-img]`.
- Every definition carries a single-quoted title:
  `[github-url]: https://github.com/fire1ce 'Title of the link'`
- **External links open in a new tab**: append `{target=\_blank}` — canonical form is the
  escaped underscore, unquoted. Not `{target="\_blank"}`, not `{target=_blank}`, and never
  with stray braces `{target=\_blank}{}`.
- Internal links use relative `.md` paths (`tables-lists-quotes.md#lists`), no `{target=\_blank}`.
- **Exception — link-collection pages** (browser extensions, useful-links, kali links):
  tables of links use inline `[Name](url){target=\_blank} - description` in cells. This is the
  one sanctioned inline-link context, and `{target=\_blank}` still applies to every row.

## 3. Code blocks

- One short imperative sentence immediately before each fence: *"Run the following command:"*,
  *"Save and close the file."* Habitual step-closers are part of the voice: *"That's it!"*
- Language tag: **`shell`** for anything typed into a terminal — do not use `bash`
  (`shell` is the house standard; the corpus mix is legacy). Others by real lexer name,
  lowercase: `python`, `yaml`, `powershell`, `markdown`, `html`, `xml`, `css`, `json`,
  `mermaid`, `text` for plain output. Never invented tags (`script`, `cmd`, `path`, `config`)
  or typos (`exmpale`, `poweshell`, `Powershell`).
- Bare commands — **no `$` prompts**. Expected output goes in prose after the fence
  (*"The output will be something like this:"*) or in its own `text` fence.
- `title="..."` when the fence represents a file or named example:
  ```` ```shell title="docker-compose.yml" ````.
- Line highlighting with `hl_lines="2 3"` when walking through a config. No `linenums`
  on content pages (cheatsheet demos only).
- Wrap fences containing literal `{{ }}` in `{% raw %}…{% endraw %}`.
- Platform/version variants use **content tabs**: `=== "For Intel CPU"` / `=== "For AMD CPU"`,
  body indented 4 spaces. Nest the tab group inside an admonition when the reader must
  pick exactly one configuration.

## 4. Admonitions

- Syntax: `!!! type` (exactly three bangs) — or `??? type` collapsible / `???+ type` expanded —
  with the body indented **4 spaces** (an unindented body renders as broken literal text).
- **Lowercase type qualifiers**: `note`, `tip`, `info`, `warning`, `danger`, `example`,
  `success`, `failure`, `question`, `bug`, `quote`. (Historic `!!! Note`/`!!! Warning` is drift.)
- Custom titles in double quotes, Title Case: `!!! note "What Each Flag Does"`.
  An empty title `!!! warning ""` renders a bare colored box — a sanctioned device for
  short inline emphasis.
- Semantics: `danger` = destructive/irreversible ("DO NOT START THE VM"), `warning` = caveats
  and scope limits, `note`/`tip` = asides and shortcuts, `example` = part lists / worked
  examples, `failure` = limitations, `??? example "..."` = collapsible optional detail.

## 5. Images

- Files go under `docs/assets/images/<section>/<page-or-topic>/`, lowercase names.
- Embed reference-style: `![Alt In Title Case][thing-img]{: style="width:600px"}` — size with
  the `{: style="width:NNNpx"}` attr (or `width:90%`). Never raw `<img>`/`<div>` HTML.
- Definition in appendices with a title: `[thing-img]: /assets/images/... 'Title of the image'`.
- Caption = the plain sentence immediately before the image (*"Your config should look like this:"*).
- Images are auto-compressed in CI (tinify) — commit reasonable sizes anyway.

## 6. Page archetypes

Pick the one that fits; keep its section order.

1. **Cheat sheet** — H1 → definition paragraph → repeated `## <Action In Title Case>` sections,
   each a sentence + fence; or command tables (`| Command | Description |` or
   `| Switch | Description | Example |`). `---` rules may separate major groups.
2. **Snippets page** — H1 → flat stack of `## <Imperative Task Name>` each with 1–3 fences,
   minimal prose, empty-but-present appendices.
3. **Step-by-step guide** — H1 → intro (*"This guide will show you how to…"*) →
   `## Introduction`/`## About X` → `## Prerequisites` → phase sections → optional
   `## Troubleshooting`/`## Debug` → `## Credit` (if adapted) → appendices.
   Steps are prose sentences + fences, not numbered lists.
4. **External-README wrapper** (own repos) — H1 → 1–2 line intro →
   `Github Repository: [Name][name-url]{target=\_blank}` →
   `{{ external_markdown('https://raw.githubusercontent.com/.../README.md', '') }}` → appendices.
5. **Sectional external embed** (3rd-party content) — `## <Section>` headings mirroring the
   source, each followed by `{{ external_markdown('<raw url>', '## <Section>') }}` (2nd arg =
   exact source heading), interleaved with own prose. **Always credit**: `## Credit` at the end
   (`Thanks to [@author][author-url]{target=\_blank} for ...`) or `## Credit and Thanks` at the
   top for full third-party guides.
6. **Interactive tool page** — intro blurb (privacy note if client-side) → `<iframe>` embed →
   `## Description` → `## Credit & Sources`.
7. **Link collection** — H1 → intro → link tables (see §2 exception).

## 7. Tone & voice

- Conversational and direct; contractions fine; light humor fine. Cheat sheets are telegraphic
  and impersonal; guides are narrated.
- **"we"** walks through steps (*"Now we can update the package list"*), **"you"** addresses
  the reader's system/choices, **"I"** only for personal opinion or setup (*"my preferred way
  is to use Homebrew"*).
- Short paragraphs; one idea per paragraph; an explanatory sentence directly before every fence;
  a closer when a phase completes (*"That's it!"*).
- `description` and the intro paragraph may overlap — intended (SEO + summary).
- Spell-check before committing. The corpus's historic typos are drift, not style.

## 8. Files, nav & tags

- Filenames and directories: **kebab-case, lowercase** (`external-power-button.md`).
  No camelCase, no capitals (existing `linux/Network/`, `Install-oh-my-zsh.md` are drift).
- New section dirs get a `.pages` file when ordering matters: pin the opening page first,
  then `- ...` for the auto-sorted rest; `title:` overrides a directory's nav name
  (`title: UDM - UniFi Dream Machine`).
- Top-level nav lives in `docs/.pages` — new top sections must be added there deliberately.
- Tags: lowercase kebab-case, reuse the existing taxonomy before inventing
  (`cheat-sheet`, `tools`, `mkdocs`, `linux`, `docker`, `proxmox`, `penetration-testing`,
  `ubiquiti`, `synology`, `raspberry-pi`, `windows`, `macos`, `android`, `automation`, …).
  Canonical forms: `penetration-testing` (not `pt`), `macos` (not `macOS`).

## 9. Maintenance workflow (human & LLM)

- Build locally before proposing changes: `.venv/bin/mkdocs build` must pass with no **new**
  warnings; spot-check with `.venv/bin/mkdocs serve`.
- Adding a page = markdown file **+** tags **+** images in the right assets dir **+** `.pages`
  entry if the section orders nav manually. Verify it appears in nav and search.
- Never commit generated output (`site/`), virtualenvs, or editor/AI-tool artifacts —
  `.gitignore` enforces this; don't fight it.
- Pushing to `main` deploys the live site. **Work is committed locally and pushed only after
  explicit owner approval.**

## 10. Known anti-patterns (present in old pages — do not copy)

- Inline `[text](url)` links on content pages; bare-URL links; missing appendices block;
  inline-defined refs mid-body; dead/duplicated ref definitions.
- `!!! Note` / `!!! Warning` capitalized qualifiers; `!! info` (two bangs); unindented
  admonition bodies; backtick lines as fake callouts.
- `bash`/`Powershell`/`poweshell`/`script`/`exmpale` fence tags; `py` instead of `python`.
- Raw `<img>`/`<div>` HTML for images; unclosed `<style>` blocks; emoji spam.
- Multiple H1s; H2-as-page-title; bold lines as pseudo-headings.
- Frontmatter typos (`tile:`, `Title:`); descriptions copy-pasted from another page;
  truncated descriptions ("roxmark3…", "irtual host…").
- Tag near-duplicates (`pt`, `macOS`); capitalized file/dir names.
