---
description: "Use when adding or changing UI in the React app (components, App.tsx, index.css) to keep the Dark Mode Noir design system consistent — color tokens, fonts, animation utilities, and the no-emoji rule."
applyTo: "src/components/**,src/index.css,src/App.tsx"
---

# Dark Mode Noir Design Guide

This app uses a cinematic film-noir dark theme. Keep new UI consistent with the established system below instead of introducing new palettes, fonts, or ad-hoc effects. Treat these as hard rules — deviate only with an explicit request from the user, and prefer extending a token/utility over hardcoding a one-off value.

This guide covers the React app only (`src/`). The `docs/` folder is a separate, light-themed workshop marketing site (`styles.css`, `light-theme.css`) and is not part of the noir design system.

## Colors — single gold accent

Use only the tokens defined in the `@theme` block in [src/index.css](../../src/index.css):

- `noir-black` — page background
- `noir-charcoal` / `noir-charcoal-light` — cards, panels, borders, grid seams
- `noir-paper` — primary text
- `noir-smoke` — muted/secondary text
- `noir-gold-dim` / `noir-gold` / `noir-gold-bright` — the only accent (borders, marks, glow, CTAs)

Don't introduce a second accent hue (red, blue, etc.). If a new shade is genuinely needed, add it as a token in `src/index.css` — don't hardcode hex values in component classes.

## Fonts

- `font-display` (Oswald) — headers, buttons, UI labels, board square text.
- `font-typewriter` (Special Elite) — taglines, small accent labels, modal subtext only. Don't use it for large blocks of body text; it hurts legibility at size.

## No emoji

Replace emoji with typographic/CSS elements in the noir voice (e.g. `★`, ink-stamp badges, double-rule "telegram" bars). See `BingoSquare.tsx` and `BingoModal.tsx` for existing patterns to copy.

## Animation

Reuse the shared utility classes from `src/index.css` instead of ad-hoc `animate-[...]` arbitrary values:

- `noir-animate-flicker` — one-time neon power-on (e.g. page-load titles)
- `noir-animate-fade-up` — staggered entrance; stagger siblings with `[animation-delay:Xs]`
- `noir-animate-stamp` — ink-stamp entrance (marks, modals)
- `noir-animate-glow` — pulsing glow (winning/active states)

All four already respect `prefers-reduced-motion` globally in `src/index.css` — don't add a per-component reduced-motion override.

## Tailwind v4

Tokens are CSS-first via `@theme` in `src/index.css` — there is no `tailwind.config.js`. See [tailwind-4.instructions.md](tailwind-4.instructions.md) for v4 syntax rules.
