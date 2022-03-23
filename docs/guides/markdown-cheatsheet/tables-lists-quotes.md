---
description: This Markdown cheat sheet provide a quick overview of all the Markdown syntax elements for  Tables and Markddown Lists, Markdown Quotes.
tags: [markdown-cheatsheet, mkdocs, tables, lists, quotes]
---

# Tables, Lists and Quotes

## Tables

A table in Markdown consists of two parts: the header and the rows of data in the table. As per the Markdown spec:

- pipe (|) character separates the individual columns in a table.
- (-) hyphens act as a delimiter row to separate the header row from the body.
- (:) colon to align cell contents.

```markdown title='Table Example'
| **Option** | **Description**                            |
| ---------- | ------------------------------------------ |
| data       | path to data files to supply the data.     |
| engine     | engine to be used for processing templates |
| ext        | extension to be used for dest files.       |
```

_Result:_

| **Option** | **Description**                            |
| ---------- | ------------------------------------------ |
| data       | path to data files to supply the data.     |
| engine     | engine to be used for processing templates |
| ext        | extension to be used for dest files.       |

---

### Column Alignment

If you want to align a specific column to the `left`, `center` or `right`, you
can use the [regular Markdown syntax] placing `:` characters at the beginning
and/or end of the divider.

=== "Left"

    ``` markdown hl_lines="2" title="Data table, columns aligned to left"
    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    <div class="result" markdown>

    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

    </div>

=== "Center"

    ``` markdown hl_lines="2" title="Data table, columns centered"
    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    <div class="result" markdown>

    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

    </div>

=== "Right"

    ``` markdown hl_lines="2" title="Data table, columns aligned to right"
    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    <div class="result" markdown>

    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

    </div>

---

## Lists

### Unordered List

Bullet point lists can be created by starting each line with an asterisk followed by a space before the content of the bullet point. Note that the space is important and should not be forgotten.

Example:

```markdown title='Unordered List Example'
- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa
- Facilisis in pretium nisl aliquet
```

_Result:_

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa
- Facilisis in pretium nisl aliquet

---

### Ordered List

Similarly, numbered lists can be created by starting each line with a number followed by a space and then the relevant text.

```markdown title='Ordered List Example'
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
4. Faucibus porta lacus fringilla vel
5. Aenean sit amet erat nunc
6. Eget porttitor lorem
```

_Result:_

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
4. Faucibus porta lacus fringilla vel
5. Aenean sit amet erat nunc
6. Eget porttitor lorem

---

### Blocks List

```markdown title='Blocks List Example'
> - list under lists
> - under lists
```

_Result:_

> - list under lists
> - under lists

---

### Tasklists

A task list is a set of tasks that each render on a separate line with a clickable checkbox. You can select or deselect the checkboxes to mark the tasks as complete or incomplete.

You can use Markdown to create a task list in any comment on GitHub. If you reference an issue, pull request, or discussion in a task list, the reference will unfurl to show the title and state.

_Example:_

```markdown title='Task List Example'
- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
  - [x] In hac habitasse platea dictumst
  - [x] In scelerisque nibh non dolor mollis congue sed et metus
  - [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
```

_Result:_

- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
  - [x] In hac habitasse platea dictumst
  - [x] In scelerisque nibh non dolor mollis congue sed et metus
  - [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque

---

## Block Quotes

For quoting blocks of content from another source within your document.

Add `>` before any text you want to quote.

```markdown title='Quoting Blocks Example'
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
> Donec massa lacus, ultricies a ullamcorper in, fermentum sed augue.
```

_Result:_

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
> Donec massa lacus, ultricies a ullamcorper in, fermentum sed augue.

---

### Nested Block Quotes

```markdown title='Quoting Blocks Nested Example'
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
> Donec massa lacus, ultricies a ullamcorper in, fermentum sed augue.
>
> > Sed adipiscing elit vitae augue consectetur a gravida nunc vehicula. Donec auctorodio
> > non est accumsan facilisis. Aliquam id turpis in dolor tincidunt mollis ac eu diam.
```

_Result:_

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
> Donec massa lacus, ultricies a ullamcorper in, fermentum sed augue.
>
> > Sed adipiscing elit vitae augue consectetur a gravida nunc vehicula. Donec auctorodio
> > non est accumsan facilisis. Aliquam id turpis in dolor tincidunt mollis ac eu diam.
