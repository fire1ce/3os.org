---
description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Images examples and simple usage
---

# Images

Images have a similar syntax to [links](links.md 'links markdowns') but include a preceding exclamation point.  
==All images will render in original size if not specified otherwise.==

## Embedding Images With HTML Tags

Place an image with **Reference** link at center of the page from link:

```markdown
<div style="width:50%; margin:0 auto">
   <img src="https://octodex.github.com/images/minion.png" alt="image with reference link">
</div>
```

**Result:**

<div style="width:50%; margin:0 auto">
   <img src="https://octodex.github.com/images/minion.png" alt="image with reference link">
</div>

Place an image with **Relative** link at center of the page from link:

```markdown
<div style="width:80%; margin:0 auto">
   <img src="/assets/images/markdown-cheatsheet/example/minion500x500.png" alt="image with relative link">
</div>
```

**Result:**

<div style="width:80%; margin:0 auto">
   <img src="https://octodex.github.com/images/minion.png" alt="minion">
</div>

## Embedding Images

```markdown
![minion](https://octodex.github.com/images/minion.png)
```

**Result:**
![minion](https://octodex.github.com/images/minion.png)

Embedding Images with width attributes:

> :bulb: **"hight" attributes is not needed**

```markdown
<img src="/assets/images/markdown-cheatsheet/example/minion.png" width=200>
```

**Result:**  
<img src="/assets/images/markdown-cheatsheet/example/minion.png" width=200>

## Inline Image With Text

```markdown
Inline ![minion](/assets/images/markdown-cheatsheet/example/minion100x100.png) With Relative Link

Inline <img src="/assets/images/markdown-cheatsheet/example/minion.png" width=50> With Reference Link
```

**Result:**  
Inline ![minion](/assets/images/markdown-cheatsheet/example/minion100x100.png) With Relative Link

Inline <img src="/assets/images/markdown-cheatsheet/example/minion.png" width=50> With Reference Link

## Block Quotes with Image

```markdown
> :camera: **Figure Title**  
> ![minion](/assets/images/markdown-cheatsheet/example/minion500x500.png)
```

**Result:**

> :camera: **Figure Title**  
> ![minion](/assets/images/markdown-cheatsheet/example//minion500x500.png)
