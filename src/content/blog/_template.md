---
title: "Post title"
description: "One- or two-sentence summary used for the post list, OG tags, and SEO."
pubDate: 2026-01-01
# updatedDate: 2026-02-01      # optional
tags: ["cryptography"]
draft: true                     # set false to publish
# ogImage: "/og/my-post.png"   # optional; falls back to the site default
---

## First section

A paragraph with **bold**, *italic*, and a [link](https://example.com). Inline
math renders with KaTeX: $a^2 + b^2 = c^2$.

Display math sits on its own line:

$$
e = \sum_{n=0}^{\infty} \frac{1}{n!}
$$

### A subsection

Fenced code blocks are highlighted with Shiki:

```python
def verify(signature, message, public_key) -> bool:
    R, s = signature
    e = hash_challenge(R, public_key, message)
    return group.g ** s == R * (public_key ** e)
```

> A blockquote for asides and important caveats.

- A list item
- Another item
