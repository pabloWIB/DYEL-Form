# DYEL-Form

Sign-in and registration screen for DYEL, a public image portfolio you assemble and share by link.

![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-671%20KB-brightgreen)

## Description

A single page in Spanish carrying the whole account flow: a cover panel that offers both paths,
a sign-in form, and a registration form. Only one panel is mounted at a time, driven by a single
`data-panel` attribute, so the states cannot collide.

Below the fold sits a sample gallery — five crops of one poster — that shows what a finished DYEL
portfolio looks like. Any tile opens full size in a native `<dialog>`.

**This is an interface demo.** There is no server, no database and no real accounts. The forms
validate in the browser and report each error precisely, then say plainly that nothing was sent.
Wiring a backend means attaching a `submit` handler that posts the collected fields; the validation
layer is already there.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3 with custom properties | Three files: base, layout, components |
| Scripting | JavaScript (ES2020) | One entry point, three modules, one `DYEL` namespace |
| Typography | Poppins via Google Fonts | Loaded with `display=swap` and `preconnect` |
| Images | WebP and PNG | 9 assets, 1.0 MB on disk; 671 KB reaches the browser |

No npm dependencies, no bundler, no build step, no framework.

## Project structure

```
.
├── index.html                  # Hero, access panel, sample gallery, lightbox
├── 404.html                    # Not-found page with a link back home
├── robots.txt                  # Allows all crawlers, points to the sitemap
├── sitemap.xml                 # Single canonical URL
├── assets/
│   ├── css/
│   │   ├── base.css            # Custom properties, reset, typography, utilities
│   │   ├── layout.css          # Container, header, mobile drawer, sections, footer
│   │   └── components.css      # Buttons, access panel, forms, gallery, lightbox
│   ├── js/
│   │   ├── main.js             # Single entry point; initialises the modules
│   │   └── modules/
│   │       ├── nav.js          # Mobile drawer: focus, scroll lock, Escape
│   │       ├── auth.js         # Panel switching and form validation
│   │       └── gallery.js      # Lightbox built on <dialog>
│   └── img/
│       ├── logo/               # Owl mark, favicon, apple-touch icon, OG image
│       └── content/            # 5 gallery pieces
└── docs/
    ├── auditoria.md            # Audit of the pre-reorganisation state
    └── cambios.md              # Change log, grouped by phase
```

## Running it locally

Open `index.html` directly in a browser — the scripts are classic `defer` scripts rather than ES
modules precisely so that the `file://` protocol works.

For a served environment closer to production:

```bash
git clone https://github.com/pabloWIB/DYEL-Form.git
cd DYEL-Form
npx serve .
```

## Browser support

Requires `<dialog>` with `showModal()` (Chrome 37+, Safari 15.4+, Firefox 98+). Where it is missing,
`gallery.js` unwraps the tiles into plain images so no control is left doing nothing.

## Accessibility

- Single `<h1>` per page, heading levels with no gaps
- Every input has an associated `<label>`; errors are wired through `aria-describedby`
- Focus ring of 3px in `#0b6f96`, which clears 4.5:1 against white
- The mobile drawer moves focus to the first link, traps scroll, closes on Escape, on a link, and
  on the backdrop, and returns focus to the button that opened it
- Touch targets are at least 44×44 px
- Pinch zoom is not blocked

## Deployment

Static. Upload the repository root as-is: no build command, no output directory. The canonical URL,
`sitemap.xml` and the Open Graph tags all point at `https://dyelform.wib.digital/`; change those
three places if you deploy elsewhere.

## Credits

The five gallery pieces are crops of one poster by **Reuel** (@reuel.dsgn), used as sample material.
They are placeholders for the author's own imagery, not original work.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
