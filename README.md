# djs-portfolio

Next.js portfolio with Tailwind, Storybook, and Payload CMS on Railway Postgres.

Design direction adapted from [michabrandt.de](https://michabrandt.de/) (layout/type/spacing language only).

## Stack

- Next.js App Router (SPA-style soft navigation)
- Tailwind CSS v4 + Manrope
- Storybook
- Payload CMS 3 + Postgres (Railway) + S3 media bucket (Railway)

## Local development

1. Keep a Railway Postgres tunnel open:

```bash
railway connect Postgres --tunnel-only -P 5433
```

2. Ensure `.env.local` exists (see `.env.example`). `DATABASE_URL` should point at `127.0.0.1:5433` while the tunnel is open.

3. Run the app:

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

Optional seed:

```bash
npx tsx src/seed.ts
```

Storybook:

```bash
npm run storybook
```

## Project structure

```
src/
  app/
    (frontend)/     # public site
    (payload)/      # admin + API
  collections/      # Payload collections
  primitives/       # low-level UI
  components/       # composed UI
```

```ts
import { Button, Container, Text } from '@/primitives'
import { PageHero, ProjectCard } from '@/components'
```

## Railway (personal)

Account workspace: **Dominic Smyth's Projects** · project: `djs-portfolio`

- `Postgres` — database
- `media` — S3 bucket for Payload uploads
- `web` — Next.js + Payload (`https://web-production-a4437.up.railway.app`)

Local DB access (separate terminal):

```bash
eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519_railway
railway connect Postgres --tunnel-only -P 5433
```

Then `npm run seed` / `npm run dev` using `.env.local`.

Redeploy:

```bash
railway up -y --service web
```
