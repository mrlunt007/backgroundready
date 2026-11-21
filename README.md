# BackgroundReady

Marketing site for [BackgroundReady.com](https://backgroundready.com), built with Next.js App Router and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description           |
| --------------- | --------------------- |
| `npm run dev`   | Start dev server      |
| `npm run build` | Production build      |
| `npm run start` | Run production server |
| `npm run lint`  | ESLint                |

## Environment

Copy `.env.example` to `.env.local` and fill in values as needed.

### Contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io) for `contact@backgroundready.com`.
2. Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` in `.env.local` and Vercel.

### Lead capture: Kit → Resend (feature flagged)

Default provider is **Kit** so Production stays stable.

Required Resend env vars (see `.env.example`):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (`contact@backgroundready.com`)
- `RESEND_REPLY_TO` (`contact@backgroundready.com`)
- `RESEND_SEGMENT_CHECKLIST_ID`
- `RESEND_SEGMENT_NEWSLETTER_ID`
- `RESEND_TOPIC_NEWSLETTER_ID`
- `LEAD_SIGNING_SECRET`
- `NEXT_PUBLIC_LEAD_PROVIDER` (`kit` live, `resend` for testing)

No Upstash/Redis is required right now. Duplicate checklist emails are limited via Resend contact properties (`checklist_sent_at`). Persistent IP rate limiting can be added later.

Checklist PDF: `public/downloads/background-ready-free-checklist.pdf`  
Public URL: `/downloads/background-ready-free-checklist.pdf`

## Project structure

- `app/` — routes, API lead endpoints, layouts
- `components/` — UI, layout, and marketing components
- `emails/` — React Email templates (Resend)
- `lib/email/` — Resend client, contacts, delivery helpers
- `content/` — MDX blog/products/services

## Deploy

Deploy to [Vercel](https://vercel.com); set `NEXT_PUBLIC_SITE_URL` to your production domain.
