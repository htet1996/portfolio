# Nikko — Portfolio

Personal portfolio of **Htet Min Paing (Nikko)** — Full Stack Developer based in Yangon, Myanmar.
Live: https://nikkoportfolio.vercel.app/

A single-page, dependency-light site (HTML + CSS + vanilla JS) with a Three.js animated
background, an interactive terminal, live GitHub activity, and a SagaNote case study.

## Project structure

```
portfolio/
├── index.html          # Main page — semantic markup only
├── resume.html         # Standalone printable resume
├── cover-letter.txt    # Plain-text cover letter
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # All behaviour (3D bg, terminal, GitHub fetch, modals, form)
└── assets/
    ├── profile.jpg     # Profile photo
    ├── favicon.svg     # Favicon
    ├── og.png          # Open Graph / social share image (1200×630)
    └── og.svg          # OG source
```

## Develop locally

No build step. Serve the folder with any static server so `fetch`/relative paths work:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open http://localhost:8000.

## Deploy

Hosted on **Vercel** as a static site — pushing to `main` triggers a deploy.
The Open Graph image is referenced by absolute URL, so keep `assets/og.png` reachable
at `https://nikkoportfolio.vercel.app/assets/og.png`.

## Tech

Vanilla HTML/CSS/JS · Three.js (CDN) · Google Fonts (Inter, JetBrains Mono, Noto Sans Myanmar)
· GitHub REST API · Vercel Web Analytics.
