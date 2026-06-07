<p align="center">
  <img src="./public/android-chrome-144x144.png" alt="" width="160" height="160">
  <h3 align="center">Gupta's Pristine Group — Website</h3>

  <p align="center">
    A fancy, fully-static marketing site for one of Delhi-NCR's foundational real estate developers ✨
    <br/>
    <a href="https://www.grouppristine.com/">View Live</a>
  </p>
</p>

---

## ✨ Overview

A complete revamp of the Pristine Group website into a modern, **luxury-editorial** experience —
elegant serif display type, generous whitespace, refined scroll motion, and the signature
blue → red accents pulled straight from the logo.

Built as a **statically-exported Next.js app**: no server required, hosts anywhere
(GitHub Pages, S3, Netlify, any static host).

## 🧱 Tech Stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | [Next.js 15](https://nextjs.org) (App Router)      |
| Output         | `output: "export"` → fully static `out/`           |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com)         |
| Motion         | [Framer Motion](https://www.framer.com/motion/)    |
| Icons          | [lucide-react](https://lucide.dev)                 |
| Fonts          | Cormorant Garamond (display) + Inter (body)        |
| Language       | JavaScript / JSX                                   |

## 🎨 Brand

Colours are sampled directly from `public/img/logo.png` and defined once in
`app/globals.css` (`@theme`):

- **Blue** `#0497f3` · **Red** `#cc040c` · **Charcoal** `#262422` · **Cream** `#f7f4ee`
- Signature blue → red gradient on accents, the `text-gradient` utility, and hairline rules.

## 🚀 Getting Started

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000  (redirects / → /en)
npm run build    # static export to ./out
npm run serve    # preview the exported ./out locally
```

## 📁 Structure

```text
app/
  layout.js                 # root <html>, fonts, global metadata
  page.js                   # "/" → redirects to the default locale
  not-found.js              # 404 (exported as 404.html)
  [lang]/
    layout.js               # navbar + footer, generateStaticParams() for locales
    page.js                 # home
    about/ · news/ · careers/ · contact/
    projects/               # index + [category] detail (data-driven template)
components/                 # Navbar, Footer, HeroCarousel, Gallery, forms, Reveal, …
lib/
  i18n-config.js            # locales + default locale
  dictionaries.js           # lazy getDictionary(locale)
  projects.js               # per-segment imagery/galleries (language-independent)
  site.js                   # contact details, form endpoints, brand facts
  links.js                  # locale-prefixed href helper
dictionaries/
  en.json                   # ALL copy for English
public/                     # images, covers, brochures, favicons
```

## 🌍 Adding a Language

The i18n is **export-safe** — every locale is pre-rendered at build time via
`generateStaticParams`, so no middleware/server is needed. To add, say, Hindi:

1. `lib/i18n-config.js` → add `"hi"` to `locales` and a `localeNames.hi` entry.
2. `dictionaries/hi.json` → copy `en.json` and translate the values.
3. `lib/dictionaries.js` → register `hi: () => import("@/dictionaries/hi.json")…`.

That's it — `/hi`, `/hi/about`, `/hi/projects/retail`, … are generated automatically,
and the language switcher appears in the navbar once a second locale exists.

## ☁️ Deployment

`npm run build` writes a fully static site to `out/`. Deploy that folder anywhere.

For **GitHub Pages** (the existing workflow):

```bash
npm run deploy   # builds, then publishes ./out to the gh-pages branch
```

A `public/.nojekyll` file is included so GitHub Pages serves the `_next/` assets correctly.

<!-- CONTACT -->

## Contact

Avi Garg - [https://avisionx.net/](https://avisionx.net/) - hello@avisionx.net
