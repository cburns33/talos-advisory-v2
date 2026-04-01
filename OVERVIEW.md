# Talos Advisory Landing Page V2 Overview

## Purpose
`landing-page-v2` is a React + Vite marketing landing page focused on lead generation.

Primary conversion pattern:
- `Hero CTA Button` reveals `Hero Lead Form`
- `Final CTA Button` reveals `Final Lead Form`
- Current submit adapter: `mailto` fallback via `createMailtoAdapter`

## Tech Stack
- React 19
- Vite 7
- Plain CSS (`src/App.css`)
- GSAP (loaded dynamically from CDN for animation sequences)

## Current Section Flow (Top → Bottom)
1. `Hero Section`
2. `Snapshot Strip`
3. `Problem Section`
4. `How I Work Section`
5. `Capabilities Section`
6. `Logos Section`
7. `Final CTA Section`

## Core Animation System
Main orchestration is in `src/pages/HomePage.jsx`.

High-level sequence:
1. `LoadingScreen` completes
2. Headline accent letters + period dots typewriter-color in
3. Desktop: headline connector paths draw to `Snapshot Cards`
4. `Snapshot Cards` border reveal animates sequentially
5. Vertical connector lines animate downward
6. `How I Work Section` process card borders reveal sequentially

Notes:
- Mobile skips desktop path drawing and goes directly to card border reveals.
- Connector/color mapping is centralized in `connectorMap`.

## Key Files
- `src/pages/HomePage.jsx` — page composition + animation orchestration
- `src/content/siteContent.js` — all section copy/content
- `src/sections/HeroSection.jsx` — headline + top CTA/form
- `src/sections/OutcomeStrip.jsx` — `Snapshot Cards`
- `src/sections/ProblemSection.jsx` — problem narrative + `Dark Funnel` tooltip
- `src/sections/HowIWorkSection.jsx` — process cards
- `src/sections/CapabilitiesSection.jsx` — capability flip cards
- `src/sections/LogosSection.jsx` — logos area
- `src/sections/FinalCtaSection.jsx` — bottom CTA/form
- `src/App.css` — layout and visual styling
- `GLOSSARY.md` — canonical naming conventions for discussions/edits
- `WIREFRAME.md` — design intent and layout rules

## Naming Conventions
When discussing updates, prefer the canonical names in `GLOSSARY.md`:
- `Snapshot Cards`
- `Hero CTA Button` / `Hero Lead Form`
- `Final CTA Button` / `Final Lead Form`
- `Capabilities Flip Cards`
- `Logos Section`

## Quick Start
From `landing-page-v2`:
- `npx vite --host`

Or use the workspace helper script:
- `start-server-v2.bat`
