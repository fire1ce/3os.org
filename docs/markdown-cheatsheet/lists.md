---
description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Lists examples and simple usage
---

# Lists

## Unordered List

Example:

``` markdown
* Lorem ipsum dolor sit amet
* Consectetur adipiscing elit
* Integer molestie lorem at massa
* Facilisis in pretium nisl aliquet
    * Phasellus iaculis neque
    * Consectetur adipiscing elit
* Nulla volutpat aliquam velit
* Phasellus iaculis neque
```

__Result:__

* Lorem ipsum dolor sit amet
* Consectetur adipiscing elit
* Integer molestie lorem at massa
* Facilisis in pretium nisl aliquet
    * Phasellus iaculis neque
    * Consectetur adipiscing elit
* Nulla volutpat aliquam velit
* Phasellus iaculis neque

## Ordered List

__TIP__: If you just use `1.` for each number, GitHub will automatically number each item. For example:

``` markdown
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit
1. Integer molestie lorem at massa
1. Faucibus porta lacus fringilla vel
    1. Facilisis in pretium nisl aliquet
    1. Nulla volutpat aliquam velit
1. Aenean sit amet erat nunc
1. Eget porttitor lorem
```

__Result:__

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit
1. Integer molestie lorem at massa
1. Facilisis in pretium nisl aliquet
    1. Nulla volutpat aliquam velit
    1. Faucibus porta lacus fringilla vel
1. Aenean sit amet erat nunc
1. Eget porttitor lorem

## Blocks List

```markdown
> :memo:
>
> * list under lists
> * under lists
```

__Result:__
> :memo:
>
> * list under lists
> * under lists

## Tasklists¶

_Example_:

```markdown
* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
```

__Result:__

* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
