---
description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Links examples and simple usage
---

# Links

## Basic link

```markdown
[Assemble](https://assemble.io)
```

Renders to (hover over the link, there is no tooltip):

[Assemble](https://assemble.io)

## Link With Title

```markdown
[Upstage](https://github.com/upstage/ 'Visit Upstage!')
```

Renders to (hover over the link, there should be a tooltip):

[Upstage](https://github.com/upstage/ 'Visit Upstage!')

## Relative Link

```markdown
[Relative Link](../index.md 'Relative Link')
```

_Result:_

[Relative Link](../index.md 'Relative Link')

## Link With "Open In New Tab"

Use {target=\_blank} to a link

```markdown
[Example](https://example.com){target=\_blank}
```

```markdown
[Relative Link With New Tab](../index.md 'Opens new tab for relative home page'){target=\_blank}  
[Reference Link With New Tab](https://github.com/fire1ce/3os.org/ 'Opens new tab for reference link'){target=\_blank}
```

_Result:_

[Relative Link With New Tab](../index.md 'Opens new tab for relative home page'){target=\_blank}  
[Reference Link With New Tab](https://github.com/fire1ce/3os.org/ 'Opens new tab for reference link'){target=\_blank}

## Anchor Links

Named anchors enable you to jump to the specified anchor point on the same page. For example, each of these chapters:

```markdown
- [Jumps to Links](#links)
```

will jump to these sections:

- [Jumps to Links](#links)

**NOTE** that specific placement of the anchor tag seems to be arbitrary. They are placed inline here since it seems to be unobtrusive, and it works.

## Mail To Link With Icon

```markdown
mail link with emoji [📧](mailto:example@example.com)
```

_Result:_

mail link with emoji [📧](mailto:example@example.com)
