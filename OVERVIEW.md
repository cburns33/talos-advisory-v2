# Talos Advisory Landing Page V2 Overview

## Purpose
`landing-page-v2` is a React + Vite marketing landing page focused on lead generation.

Primary conversion pattern:
- `Hero CTA Button` reveals `Hero Lead Form`
- `Final CTA Button` reveals `Final Lead Form`
- Current submit adapter: Google Apps Script Web App via `createGoogleAppsScriptAdapter`
- Form submissions now:
  - Submit directly without launching the visitor's email client
  - Send email notifications to `chase@talos-advisory.com`
  - Can be logged to Google Sheets via Apps Script

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

## Additional Pages
- `public/case-study-nexus-black.html` — Standalone case study page for the IFS Nexus Black campaign. This is a static HTML file that uses the same design tokens (colors, fonts, neo-brutalist styling) as the main landing page. It is not part of the React app and is served directly from the `public/` folder.

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
- Headline connector paths are re-calculated during Hero form expand/collapse transitions to prevent visible detachment gaps.

## Recent UX Updates
- Header brand text replaced with SVG logo (`src/assets/logo.svg`) with responsive sizing.
- Hero and Final CTA builds are aligned (`Get an ad account audit` label + same reveal behavior).
- CTA hover treatment uses circular wipe animation (WhatsApp-inspired) across both CTA button variants.
- Form submit state updates:
  - `Sending...` remains fully opaque
  - Success state uses sage green (`#659157`) and `We'll speak soon!`
  - Success CTA is disabled/non-clickable and does not run the wipe overlay
- `Dark Funnel` trigger text styling updated to black background with white text (tooltip unchanged).
- `How I Work` heading moved above cards with a desktop heading box treatment.
- Heading capitalization standardization:
  - `THE PROBLEM`
  - `CORE SERVICES`
  - `BRANDS I'VE HELPED BUILD`

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
- `src/forms/adapters/googleAppsScriptAdapter.js` — frontend form adapter for Apps Script endpoint
- `google-apps-script/Code.gs` — Apps Script backend handler (email + sheet logging)
- `google-apps-script/SETUP.md` — deployment/config instructions for Apps Script web app
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
