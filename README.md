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

Copy `.env.example` to `.env.local` and fill in values as needed:

```env
NEXT_PUBLIC_SITE_URL=https://backgroundready.com
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id
```

### Contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io).
2. Click **New Form**, name it (e.g. Contact), and set the recipient to `contact@backgroundready.com` (Cloudflare will forward into Proton) or your Proton address.
3. Copy the form ID from the endpoint (`https://formspree.io/f/xxxxxxxx` → `xxxxxxxx`).
4. Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` in `.env.local` and in Vercel → Project → Settings → Environment Variables.
5. Submit a test from `/contact`; confirm the email arrives in Proton.

## Project structure

- `app/` — routes and layouts
- `components/` — UI, layout, and marketing components
- `content/` — reserved for MDX content (Phase 2+)
- `lib/constants.ts` — site name, nav, URLs
- `tina/` — reserved for TinaCMS (later)

## Deploy

Deploy to [Vercel](https://vercel.com); set `NEXT_PUBLIC_SITE_URL` to your production domain.
