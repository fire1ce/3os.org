---
description: This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements for MkDocs and Material Theme for MkDocs. Includes Code Blocks, Code Blocks with Syntax Highlighting, Code Blocks with titles, Code Blocks with numbers.
tags: [markdown-cheatsheet, mkdocs, code-blocks]
---

# Code Blocks

Code blocks and examples are an essential part of technical project
documentation. Material for MkDocs provides different ways to set up syntax
highlighting for code blocks, either during build time using [Pygments] or
during runtime using a JavaScript syntax highlighter.

## Adding a Title

In order to provide additional context, a custom title can be added to a code
block by using the `title="<custom title>"` option directly after the shortcode,
e.g. to display the name of a file:

_Example:_

````markdown title="Code block with title"
```py title="bubble_sort.py"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result:_

```py title="bubble_sort.py"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

---

## Adding Line Numbers To Code Block

_Example:_

Line numbers can be added to a code block by using the `linenums="<start>"`
option directly after the shortcode, whereas `<start>` represents the starting
line number. A code block can start from a line number other than `1`, which
allows to split large code blocks for readability:

````markdown title="Code block with line numbers"
```py linenums="1"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result:_

```py linenums="1"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

---

## Highlighting Specific Lines

Specific lines can be highlighted by passing the line numbers to the `hl_lines`
argument placed right after the language shortcode. Note that line counts start
at `1`, regardless of the starting line number specified as part of
[`linenums`][adding line numbers]:

````markdown title="Code block with highlighted lines"
```py hl_lines="2 3"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result:_

```py linenums="1" hl_lines="2 3"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

---

## Highlighting Inline Code Blocks

When [InlineHilite] is enabled, syntax highlighting can be applied to inline
code blocks by prefixing them with a shebang, i.e. `#!`, directly followed by
the corresponding [language shortcode][list of available lexers].

_Example:_

```markdown title="Inline code block"
The `#!python range()` function is used to generate a sequence of numbers.
```

_Result:_

The `#!python range()` function is used to generate a sequence of numbers.
