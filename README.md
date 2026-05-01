![Portfolio preview](public/amiresponsive.webp)

# Personal Portfolio

Personal portfolio and research hub. Built to present professional experience, academic publications, and featured products in a performant, multilingual, accessible site.

---

## Features

- **Bilingual (EN / PL)** — full content and UI localization via Astro's i18n routing; English served at `/`, Polish at `/pl/*`
- **Experience timeline** — animated, intersection-observer-driven work and academic history
- **Publications deck** — carousel of research papers with status badges, abstracts, and DOI links
- **Products showcase** — parallax image cards for featured projects with NDA support
- **Contact form** — Netlify Forms submission with honeypot spam guard, validation, and animated state transitions
- **Theme system** — dark/light toggle with anti-FOUC script, persisted to `localStorage`
- **Terminal widget** — typewriter hero animation with a mock CLI profile panel
- **Retro mode** — Windows 95 / Netscape Navigator–themed alternate portfolio view at `/retro` (bilingual), with a dial-up loader, hit counter backed by Netlify Blobs, and the full experience / publications / products data rendered in pixel-art CSS
- **Guestbook** — retro-styled sign-in page at `/guestbook` (bilingual); submissions stored via Netlify Forms and read back through a serverless function; supports name, location, and message fields
- **Footer** — site-wide footer with profile avatar, copyright, and a link to retro mode
- **Profile avatar** — animated avatar component used in both the hero section and the footer

---

## Tech Stack

| Layer | Choices |
|---|---|
| Framework | [Astro](https://astro.build) v5 (static, file-based routing) |
| UI | React v19 (client islands via `client:load`) |
| Styling | Tailwind CSS v3, CSS custom properties, Framer Motion |
| Fonts | Inter, JetBrains Mono, VT323 |
| Carousel | Embla Carousel |
| Mobile nav | `@hanzo/react-drawer` |
| Forms | Netlify Forms + serverless functions (guestbook read/write) |
| Storage | Netlify Blobs (hit counter) |
| Tooling | TypeScript (strict), Prettier + Astro plugin |

**Architectural notes:**
- React is used only where interactivity is needed; all other components are Astro (zero-JS by default).
- All data (experience, publications, products, UI strings) lives in per-locale JSON files under `src/i18n/` — no CMS dependency.
- Colors are defined as RGB channels in CSS custom properties, enabling Tailwind opacity modifiers without extra config.
- The contact form is stateful via React Context with a custom hook; submission state machine covers idle → loading → success / error.

---

## Project Structure

```
src/
├── pages/          # Astro routing — index, retro, guestbook (+ /pl/* variants)
├── views/          # Top-level page compositions (IndexPage.astro)
├── sections/       # Full-page sections: Hero, Header, Experience, Publications, Products, Contact, Footer
├── components/     # Scoped React + Astro components
│   ├── contact/    # Form, validation, submission logic
│   ├── timeline/   # Animated experience timeline
│   ├── publications/ # Publication cards and carousel
│   ├── products/   # Product cards with parallax
│   └── retro/      # Retro-mode page and guestbook components
├── scripts/retro/  # Vanilla TS: hit-counter, guestbook, form state machine
├── i18n/
│   ├── en/         # English content + translations (JSON)
│   └── pl/         # Polish content + translations (JSON)
├── data/           # TypeScript types and schemas
├── hooks/          # useIsMobile, useTypewriter
├── layouts/        # Layout.astro — <head>, theme script, global structure
└── styles/         # Global CSS, theme variables, animations
public/
├── retro.css       # Standalone stylesheet for retro mode
└── ...             # Static assets (images, icons, favicon)
netlify/functions/  # Serverless functions: hit-counter, guestbook-read
netlify.toml        # Redirect rules mapping /api/* → /.netlify/functions/*
```

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** (or pnpm / yarn)

The contact form and guestbook integrate with Netlify Forms and only work when deployed to Netlify.

The guestbook read function requires two environment variables set in the Netlify dashboard:

| Variable | Purpose |
|---|---|
| `NETLIFY_TOKEN` | Personal access token for the Netlify API |
| `NETLIFY_FORM_ID` | ID of the Netlify Form that receives guestbook submissions |

These are not needed for local development — the `/api/guestbook` endpoint returns an empty array when they are absent.

---

## Setup

```bash
# Clone
git clone https://github.com/miloszmisiek/website.git
cd website

# Install dependencies
npm install
```

---

## Local Development

```bash
npm run dev
```

Starts the Astro dev server with hot module replacement. The site is available at `http://localhost:4321` by default.

---

## Build & Preview

```bash
# Production build → /dist
npm run build

# Preview the built output locally
npm run preview
```

---

## Deployment

The site is designed for **Netlify**. Push to your connected branch — Netlify handles the build (`astro build`) and serves `/dist`.

- **Contact form** — provided by Netlify Forms automatically via `data-netlify` attributes.
- **Guestbook** — submissions go to Netlify Forms; the `/api/guestbook` serverless function reads them back via the Netlify API (set `NETLIFY_TOKEN` and `NETLIFY_FORM_ID` in the Netlify dashboard).
- **Hit counter** — incremented on each `/retro` page load via the `/api/hits` serverless function, persisted in Netlify Blobs.
- **API routing** — `netlify.toml` maps `/api/hits` and `/api/guestbook` to the corresponding functions.

---

> built with care (and vim, btw)
