---
description: This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements for MkDocs and Material Theme for MkDocs. Includes Markddown Headings and Markddown Text Highlighting, Horizontal Line.
tags:
  [markdown-cheatsheet, mkdocs, headings, text-highlighting, horizontal-line]
---

# Basic Formatting

## Text Styling

Markdown makes it easy to format messages. Type a message as you normally would, then use these the following formatting syntax to render the message a specific way

| **Markdown Syntax**                       | **Result**                          |
| ----------------------------------------- | ----------------------------------- |
| `**bold**`                                | **bold**                            |
| `_italic_`                                | _italic_                            |
| `==highlight==`                           | ==highlight==                       |
| `~~strike through~~`                      | ~~strike through~~                  |
| `^^underline^^`                           | ^^underline^^                       |
| `` `Inline Code` ``                       | `Inline Code`                       |
| `` ==_you_ **can** ^^combine^^ `too`== `` | ==_you_ **can** ^^combine^^ `too`== |

---

## Horizontal Line

```markdown
Horizontal line

---

Three consecutive dashes
```

_Result:_

Horizontal line

---

Three consecutive dashes

## Heading

To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level. For example, to create a heading level three (h3), use three number signs (e.g., ### My Header).

Headings from `h1` through `h6` are constructed with a `#` for each level:

### Regular Headings

```markdown
### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

_Result:_

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

### Headings <small>with secondary text</small>

```markdown
### Heading 3 <small>with secondary text</small>

#### Heading 4 <small>with secondary text</small>

##### Heading 5 <small>with secondary text</small>

###### Heading 5 <small>with secondary text</small>
```

_Result:_

### Heading 3 <small>with secondary text</small>

#### Heading 4 <small>with secondary text</small>

##### Heading 5 <small>with secondary text</small>

###### Heading 6 <small>with secondary text</small>
