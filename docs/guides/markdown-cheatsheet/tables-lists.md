---
description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Tables, Lists examples and simple usage
---

# Tables & Lists

## Tables

```markdown
| **Option** | **Description**                            |
| ---------- | ------------------------------------------ |
| data       | path to data files to supply the data.     |
| engine     | engine to be used for processing templates |
| ext        | extension to be used for dest files.       |
```

**Result:**

| **Option** | **Description**                            |
| ---------- | ------------------------------------------ |
| data       | path to data files to supply the data.     |
| engine     | engine to be used for processing templates |
| ext        | extension to be used for dest files.       |

---

## description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Lists examples and simple usage

## Lists

### Unordered List

Example:

```markdown
- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa
- Facilisis in pretium nisl aliquet
  - Phasellus iaculis neque
  - Consectetur adipiscing elit
- Nulla volutpat aliquam velit
- Phasellus iaculis neque
```

**Result:**

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa
- Facilisis in pretium nisl aliquet
  - Phasellus iaculis neque
  - Consectetur adipiscing elit
- Nulla volutpat aliquam velit
- Phasellus iaculis neque

### Ordered List

**TIP**: If you just use `1.` for each number, GitHub will automatically number each item. For example:

```markdown
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
4. Faucibus porta lacus fringilla vel
   1. Facilisis in pretium nisl aliquet
   2. Nulla volutpat aliquam velit
5. Aenean sit amet erat nunc
6. Eget porttitor lorem
```

**Result:**

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
4. Faucibus porta lacus fringilla vel
   1. Facilisis in pretium nisl aliquet
   2. Nulla volutpat aliquam velit
5. Aenean sit amet erat nunc
6. Eget porttitor lorem

### Blocks List

```markdown
> :memo:
>
> - list under lists
> - under lists
```

**Result:**

> :memo:
>
> - list under lists
> - under lists

### Tasklists¶

_Example_:

```markdown
- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
  - [x] In hac habitasse platea dictumst
  - [x] In scelerisque nibh non dolor mollis congue sed et metus
  - [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
```

**Result:**

- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
  - [x] In hac habitasse platea dictumst
  - [x] In scelerisque nibh non dolor mollis congue sed et metus
  - [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
