# Hardwick

Premium custom furniture portfolio website — a marketing site built to showcase Hardwick's design, manufacturing,
and installation work, with a portfolio architecture designed to scale to hundreds of projects with zero duplicated
effort.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + [React 19](https://react.dev), TypeScript
- [Sanity](https://www.sanity.io) as the portfolio CMS, embedded at `/studio`
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) for animation, [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com) for the fullscreen project gallery
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) for the contact form

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the Sanity values, see "Sanity Studio & Content" below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Studio is at [http://localhost:3000/studio](http://localhost:3000/studio).

### Production build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new) — no extra configuration is required, the build runs with
   `npm run build` out of the box.
3. Set these environment variables in the Vercel project (Production, Preview, and Development), matching your
   `.env.local` (see `.env.example`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` — **required at
     build time**: the embedded Studio route imports `sanity.config.ts`, which reads these at module scope, so a
     missing value fails the entire build, not just `/studio`.
   - `SANITY_REVALIDATE_SECRET` — the shared secret configured on the Sanity webhook (see below).
   - `NEXT_PUBLIC_SITE_URL` — your production domain (used for canonical URLs, sitemap, and Open Graph tags — see
     `lib/site.ts`). Without it, the site falls back to a placeholder URL.
   - Do **not** add `SANITY_MIGRATION_TOKEN` to Vercel — it's a write-permission token used only for the local,
     one-time migration script.
4. In `manage.sanity.io`, add your Vercel domain(s) (and `http://localhost:3000` for local dev) to **API → CORS
   Origins**, with credentials allowed — otherwise the embedded Studio loads but every API call fails.
5. Deploy. Every push to your main branch redeploys automatically.

## Sanity Studio & Content

Portfolio content is managed in Sanity, edited through the Studio embedded at `/studio`, and rendered via
[`lib/projects.ts`](lib/projects.ts).

### Adding or Editing a Portfolio Project

1. Go to `/studio` (locally or on your deployed domain) and log in with your Sanity account.
2. Create (or open) a **Project** document and fill in its fields — title, category, location, year, description,
   materials, cover image, gallery images, and the optional client requirements/highlights.
3. Click **Publish**.

That's it — no code changes, no redeploy. If the [revalidation webhook](#content-updates-without-a-redeploy) is
configured, the change appears on the live site within moments; otherwise it appears within the hour via the
built-in time-based cache fallback.

### One-time setup

1. Run `npx sanity@latest init` to create a Sanity project (choose dataset visibility **Public** — portfolio content
   is public marketing copy, so the site never needs a read token). Copy the resulting project ID and dataset name
   into `.env.local` / Vercel as `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.
2. Add CORS origins (see step 4 above) in `manage.sanity.io`.
3. The **category list** is defined in two places that must be kept in sync by hand: `CATEGORIES` in
   [`types/project.ts`](types/project.ts) (drives the site's filters/labels) and `CATEGORY_OPTIONS` in
   [`sanity/schema/project.ts`](sanity/schema/project.ts) (drives the Studio dropdown). Sanity Studio bundles its
   config with its own bundler and can't resolve the app's `@/*` import alias, so this list can't be shared directly
   — update both if you ever add a category.

### Content updates without a redeploy

Project pages use tag-based revalidation (`"project"` / `"project:<slug>"`) with an hourly time-based fallback. To
get near-instant updates on publish, configure a webhook in `manage.sanity.io` → **API → Webhooks**:

- Trigger on the `project` document type, on create/update/delete.
- URL: `https://<your-domain>/api/revalidate`
- Projection: `{"_type": _type, "slug": slug.current}`
- Secret: the same value as `SANITY_REVALIDATE_SECRET`

### Migrating existing content

[`scripts/migrate-to-sanity.ts`](scripts/migrate-to-sanity.ts) is a one-time script that recreates the original seed
projects (previously hardcoded in `data/projects.ts`) as Sanity documents, uploading their placeholder images as
real Sanity assets. See the comment at the top of the script for the exact command. It's idempotent for document
data (safe to re-run) but re-uploads images each run, so it's meant to run once against a freshly created dataset.

**Images:** all portfolio images are served from Sanity's CDN (`cdn.sanity.io`, already allowed in
`images.remotePatterns` in [`next.config.ts`](next.config.ts)) and optimized further by `next/image`.

## Project Structure

```
app/
  (site)/               Marketing routes sharing one layout: home, portfolio, project detail, about, services, contact
  studio/[[...tool]]/    Embedded Sanity Studio (/studio)
  api/revalidate/         Webhook endpoint that invalidates cached project data on publish
components/
  layout/               Navbar, footer, theme toggle, scroll progress/scroll-to-top
  home/                 Homepage sections (hero, featured projects, process, testimonials, CTA)
  portfolio/             Portfolio grid, filters, search, project card
  project/                Project detail page: hero, info panel, gallery/lightbox, CTA
  contact/                Contact form
  shared/                 Reusable primitives (animated section, section heading, breadcrumbs, empty state)
  ui/                     shadcn/ui primitives
data/                   Content: testimonials.ts, services.ts, nav.ts (portfolio projects now live in Sanity)
lib/
  sanity/               Sanity client, image URL builder, GROQ queries, raw document types
  projects.ts           Project queries used by the app (fetches from Sanity, shaped for the components below)
  metadata.ts, site.ts, utils.ts
sanity/schema/          Sanity Studio content schema (Project document type)
types/                  Shared TypeScript types (Project, Category, Testimonial)
hooks/                  useInfiniteScroll, etc.
scripts/                One-time content migration script
```

## Notes

- The portfolio listing (`/portfolio`) reads filters from the URL query string server-side and renders the filtered
  grid on the server, so filtered/search views are fully server-rendered and shareable — filtering interactions
  update the URL client-side after that.
- Project detail pages are statically generated for known slugs at build time and rendered on-demand for anything
  published afterward (`dynamicParams = true`), so a newly published project appears without a rebuild/redeploy.
- The contact form does not send email itself — it opens a pre-filled `mailto:` link to `lib/site.ts`'s configured
  email address. Wire it up to an email API (e.g. Resend) in `components/contact/contact-form.tsx` if server-side
  delivery is needed later.
