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

### Lead capture (Resend)

Required Production env vars:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (`contact@backgroundready.com`)
- `RESEND_REPLY_TO` (`contact@backgroundready.com`)
- `RESEND_SEGMENT_CHECKLIST_ID`
- `RESEND_SEGMENT_NEWSLETTER_ID`
- `RESEND_TOPIC_NEWSLETTER_ID`
- `LEAD_SIGNING_SECRET`

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
