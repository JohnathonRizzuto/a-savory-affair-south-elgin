# How this site is built

The seven pages in the repo root are **generated**. Don't hand-edit them —
every one carries the whole stylesheet and the visual editor inlined, so a
manual change gets overwritten the next time anyone builds.

Edit the files in here, then run:

    python3 src/build.py

That rewrites index.html, events.html, about.html, sponsorship.html,
memberships.html, coaches-corner.html and contact.html in the repo root.

## What's what

| File | What it holds |
|---|---|
| `build.py` | Page list, titles, meta descriptions, the nav, and `BASE_URL` |
| `shell.css` | Every style on the site, one stylesheet |
| `pages/*.html` | The body of each page — this is where content lives |
| `head.tpl.html` | `<head>`: SEO, Open Graph, JSON-LD |
| `header.tpl.html` / `footer.tpl.html` | Shared header, footer, and the contact popup |
| `base.js.html` | Scroll header, mobile menu, reveal animations, contact popup |
| `editor-fragment.html` | The `?edit=jb2026` visual editor |

## Things worth knowing

- `BASE_URL` in `build.py` sets every canonical URL, the sitemap and the
  Open Graph tags. Change it there, rebuild, then update `sitemap.xml` and
  `robots.txt` to match.
- Sponsor logos live in `img/sponsors/`. Each is a 480x360 white tile so the
  wall stays even. `docs/sponsorship-flyer.pdf` is the club's own flyer.
- The visual editor writes back to GitHub, and its branch is hardcoded in
  `editor-fragment.html`. If the working branch changes, change it there too.
