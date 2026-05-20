# BackgroundReady

Marketing site for [BackgroundReady.com](https://backgroundready.com), built with Next.js App Router and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description          |
| ------------- | -------------------- |
| `npm run dev` | Start dev server     |
| `npm run build` | Production build   |
| `npm run start` | Run production server |
| `npm run lint` | ESLint              |

## Environment

Optional:

```env
NEXT_PUBLIC_SITE_URL=https://backgroundready.com
```

## Project structure

- `app/` — routes and layouts
- `components/` — UI, layout, and marketing components
- `content/` — reserved for MDX content (Phase 2+)
- `lib/constants.ts` — site name, nav, URLs
- `tina/` — reserved for TinaCMS (later)

## Deploy

Deploy to [Vercel](https://vercel.com); set `NEXT_PUBLIC_SITE_URL` to your production domain.
