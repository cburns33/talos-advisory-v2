# Talos Advisory Landing Page V2 Wireframe

## Goal
Generate consulting leads via frictionless native form submissions while preserving a portfolio-grade presentation.

## Section Order (Desktop + Mobile)
1. Hero + CTA Form
2. Outcome Snapshot Strip
3. How I Work
4. The Problem
5. Capabilities (2x2 desktop, accordion mobile)
6. Company Logos (grid desktop, horizontal scroll mobile)
7. Final CTA + Form

## Layout Rules
- One content container system across all sections
- No section re-ordering by breakpoint
- Mobile-first spacing and typography with `clamp()`
- No jumpy layout animations

## Conversion Pattern
- Hero form (name, email, message)
- Final CTA form (name, email, message)
- Shared backend-ready adapter interface
- Current adapter: mailto fallback to `chase@talos-advisory.com`
- Future adapter: HTTP endpoint adapter

## Kept Design Areas
- The Problem section visual treatment
- Capabilities section concept and core content
- Company logos section concept and visual style
