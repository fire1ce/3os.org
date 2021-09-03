---
description: Markdown CheatSheet for MkDocs and Material Theme for MkDocs. Images examples and simple usage
---

# Images

Images have a similar syntax to [links](links.md "links markdowns") but include a preceding exclamation point.  
==All images will render in original size if not specified otherwise.==

## Embedding Images With HTML Tags

Place an image with __Reference__ link at center of the page from link:

```markdown
<div style="width:50%; margin:0 auto">
   <img src="https://octodex.github.com/images/minion.png" alt="image with reference link">
</div>
```

__Result:__
<div style="width:50%; margin:0 auto">
   <img src="https://octodex.github.com/images/minion.png" alt="image with reference link">
</div>

Place an image with __Relative__ link at center of the page from link:

```markdown
<div style="width:80%; margin:0 auto">
   <img src="/assets/images/markdown-cheatsheet/welcome/example/minion500x500.png" alt="image with relative link">
</div>
```

__Result:__
<div style="width:80%; margin:0 auto">
   <img src="https://octodex.github.com/images/minion.png" alt="minion">
</div>

## Embedding Images

```markdown
![minion](https://octodex.github.com/images/minion.png)
```

__Result:__
![minion](https://octodex.github.com/images/minion.png )

Embedding  Images with width attributes:  
> :bulb: __"hight" attributes is not needed__

```markdown
<img src="https://octodex.github.com/images/minion.png" width=200>
```

__Result:__  
<img src="https://octodex.github.com/images/minion.png" width=200>

## Inline Image With Text

```markdown
Inline ![minion](/assets/images/markdown-cheatsheet/welcome/example/minion100x100.png) With Relative Link

Inline <img src="https://octodex.github.com/images/minion.png" width=50> With Reference Link
```

__Result:__  
Inline ![minion](/assets/images/markdown-cheatsheet/welcome/example/minion100x100.png) With Relative Link

Inline <img src="https://octodex.github.com/images/minion.png" width=50> With Reference Link

## Block Quotes with Image

```markdown
> :camera: __Figure Title__  
> ![minion](/assets/images/markdown-cheatsheet/welcome/example/minion500x500.png)
```

__Result:__  
> :camera: __Figure Title__  
> ![minion](/assets/imagesmarkdown-cheatsheet/welcome/example/minion500x500.png)

