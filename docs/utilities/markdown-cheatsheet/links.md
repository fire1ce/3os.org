---
title: Links
description: This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements for MkDocs and Material Theme for MkDocs. Includes links.
tags: [markdown-cheatsheet, mkdocs, links]
---

# Markdown Links

## Link With Title

```markdown title='Link with Title Example'
[My Github Page][github-url]

[github-url]: https://github.com/fire1ce 'Title of the link'
```

_Result:_

[My Github Page][github-url]

[github-url]: https://github.com/fire1ce 'Title of the link'

---

## Open In New Tab

Append `(target=\_blank)` to the end of the link.

```markdown title='Open In New Tab Link Example'
[My Github Page][github-url]{target=\_blank}

[github-url]: https://github.com/fire1ce 'Title of the link'
```

_Result:_

[My Github Page][github-url]{target=\_blank}

[github-url]: https://github.com/fire1ce 'Title of the link'

---

_Result:_

## Internal Anchor Links

```markdown title='Internal Anchor Links Example'
[Jumps to section in page][internal-anchor-link]

[internal-anchor-link]: /utilities/markdown-cheatsheet/tables-lists-quotes/#lists 'Internal Anchor Links'
```

_Result:_

[Jumps to section in page][internal-anchor-link]

[internal-anchor-link]: /utilities/markdown-cheatsheet/tables-lists-quotes/#lists 'Internal Anchor Links'

---

## Image With Links

```markdown title='Image With Links Example'
[![This is Image with link][image-link]][url-link]{target=\_blank}

[image-link]: /assets/images/markdown-cheatsheet/minion200x200.png 'Minion'
[url-link]: https://github.com/fire1ce 'Go to Github'
```

_Result:_

[![This is Image with link][image-link]][url-link]{target=\_blank}

[image-link]: /assets/images/markdown-cheatsheet/minion200x200.png 'Minion'
[url-link]: https://github.com/fire1ce 'Go to Github'

---

## `Mailto` Link

```markdown title='Mailto Link Example'
[Send Email][mail-to-link]

[mail-to-link]: mailto:example@example.com 'Send Email'
```

_Result:_

[Send Email][mail-to-link]{:rel=nofollow}

[mail-to-link]: mailto:example@example.com 'Send Email'

<!-- appendices -->

<!-- end appendices -->
