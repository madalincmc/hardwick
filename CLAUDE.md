# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at localhost:3000 (Studio at /studio)
npm run build    # production build — also type-checks; the embedded Studio route
                  # imports sanity.config.ts, which reads NEXT_PUBLIC_SANITY_* env vars
                  # at module scope, so missing values fail the whole build
npm run start    # serve the production build
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

There is no test suite and no single-test invocation configured in this repo.

Content changes to portfolio projects are made in `/studio`, not in code — see `README.md`
("Adding or Editing a Portfolio Project") before touching `lib/projects.ts` or `data/`.

## Architecture

**Content model**: Portfolio projects are Sanity documents, not files in the repo. `lib/sanity/queries.ts`
holds the GROQ queries, `lib/sanity/client.ts`/`types.ts` the client and raw doc shape, and `lib/projects.ts`
is the only place that fetches and reshapes Sanity docs (`SanityProjectDoc`) into the app-facing `Project`
type (`types/project.ts`) — components never talk to Sanity directly. `data/` now holds only static,
non-CMS content (testimonials, services, nav).

**Category list is duplicated by design**: `CATEGORIES`/`CATEGORY_LABELS` in `types/project.ts` (drives
site filters/labels) and `CATEGORY_OPTIONS` in `sanity/schema/project.ts` (drives the Studio dropdown) must
be kept in sync by hand — the Studio bundles its config separately and can't resolve the `@/*` alias, so
this can't be shared directly. Adding a category means editing both files.

**Revalidation**: project pages use tag-based caching (`"project"`, `"project:<slug>"`, 1hr fallback via
`revalidate: 3600` in `lib/projects.ts`). `app/api/revalidate/route.ts` is a Sanity webhook endpoint that
calls `revalidateTag` on publish — see README for the webhook config. Project detail pages are statically
generated for known slugs at build time with `dynamicParams = true`, so newly published projects render
on-demand without a rebuild.

**Studio route (`app/studio/[[...tool]]/`) has SSR forced off through two layers**: `page.tsx` forces
`dynamic = "force-static"`, and rendering is delegated through `studio-loader.tsx` (a client component using
`next/dynamic` with `ssr: false`) down to `studio-client.tsx`. This split exists because `ssr: false` is
only valid inside a Client Component. `next.config.ts` additionally marks `sanity`/`@sanity/vision` as
`serverExternalPackages` so Next's RSC build doesn't try to bundle Sanity's client code (which calls
`createContext` at module scope) under the `react-server` condition. Don't "simplify" this by inlining the
studio import into `page.tsx` or removing the external-packages config — both break the `/studio` build.

**Portfolio filtering is server-first**: `app/(site)/portfolio/page.tsx` reads `category`/`q`/`sort` from
the URL search params server-side and does the initial fetch/filter render on the server (so filtered/search
views are shareable links); `components/portfolio/portfolio-grid.tsx` then handles client-side interaction
and updates the URL without a full navigation.

**Route groups**: `app/(site)/` shares one layout for all marketing pages (home, portfolio, project detail,
about, services, contact); `app/studio/` and `app/api/revalidate/` sit outside it.

**Path alias**: `@/*` maps to the repo root (`tsconfig.json`) — this alias is not usable from `sanity/`
schema/config files, which run under Sanity's own bundler.

**Contact form** (`components/contact/contact-form.tsx`) does not send email server-side — it opens a
pre-filled `mailto:` link using the address in `lib/site.ts`. There is no email API integration to wire
around unless one is added.
