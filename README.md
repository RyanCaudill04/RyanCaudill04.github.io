# RyanCaudill04.github.io

Portfolio website for Ryan Caudill, deployed on GitHub Pages.

## Architecture
- Static single-page site (`index.html`, `styles.css`, `script.js`)
- Curated content model in local JSON:
  - `data/profile.json`
  - `data/projects.json`
- No runtime dependency on GitHub API for primary project rendering

## Goals
- Hiring-focused information architecture
- WCAG-conscious keyboard and focus accessibility
- SEO baseline (meta tags, canonical, Open Graph, JSON-LD, robots, sitemap)
- Lightweight security baseline compatible with static hosting

## Local preview
Open `index.html` with any local static server, for example:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Content updates
- Update hero/about/experience/technical focus in `data/profile.json`
- Update project cards in `data/projects.json`
- Keep impact bullets measurable where possible

## Deployment
- Push to `main`
- GitHub Pages serves the repository root

## Validation
Run the local quality gate before committing:

```bash
./scripts_validate.sh
```

## QA checklist
- Keyboard navigation (including skip link and back-to-top)
- Visible focus states on all interactive controls
- Project filters toggle with `aria-pressed`
- Metadata and structured data remain valid after content edits
