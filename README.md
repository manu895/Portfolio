# Portfolio – Manuel Bologna (React 18 + Vite + Tailwind, TS)

Moderno, accessibile (WCAG AA) e performante. Build statico pronto per deploy.

## Requisiti
- Node 18+
- pnpm o npm

## Setup
```bash
npm i
npm run dev
```

## Script
- `dev`, `build`, `preview`
- `lint`, `format`, `type-check`

## Palette
- primary `#FFFDFD`
- accentPurple `#8C82FE`
- accentBlue `#1B25F2`
- darkNavy `#020659`

## Struttura
Vedi cartelle `src/components`, `src/pages`, `src/data`, `src/hooks`, `src/lib`, `src/styles`.

## Dati
Modifica `src/data/projects.ts` e `src/data/testimonials.ts` per aggiungere contenuti.

## Rotte
`/`, `/projects`, `/projects/:slug`, `/about`, `/services`, `/contact`

## Deploy
- **Vercel/Netlify**: import repository, build command `npm run build`, output `dist`.
- **Plesk**: carica il contenuto di `dist/` nella root del dominio o sottodominio.

## Note
- SEO via `react-helmet-async` (`src/lib/seo.ts`).
- Carousel framer-motion con autoplay, loop e pausa on-hover.
- Tema persistente in `localStorage` (`theme`).