# Hardwick

Premium custom furniture portfolio website — a marketing site built to showcase Hardwick's design, manufacturing,
and installation work, with a portfolio architecture designed to scale to hundreds of projects with zero duplicated
effort.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + [React 19](https://react.dev), TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) for animation, [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com) for the fullscreen project gallery
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) for the contact form

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable to your production domain (used for canonical URLs, sitemap,
   and Open Graph tags — see `lib/site.ts`). Without it, the site falls back to a placeholder URL.
4. Deploy. Every push to your main branch redeploys automatically.

## Adding a Portfolio Project

The entire portfolio — the homepage's featured section, `/portfolio`, every `/portfolio/[slug]` page, and the
sitemap — is generated from a single file: [`data/projects.ts`](data/projects.ts). To add a new project, append one
object to the `projects` array:

```ts
{
  title: "The Example Residence",
  slug: "the-example-residence",       // used for the URL: /portfolio/the-example-residence
  category: "Kitchens",                // one of: Kitchens, Wardrobes, Living Rooms, Bedrooms, Bathrooms, Offices, Commercial
  location: "Notting Hill, London",
  year: 2025,
  description: "A short paragraph describing the project.",
  materials: ["European Oak", "Brushed Brass"],
  coverImage: "https://images.example.com/cover.jpg",
  gallery: ["https://images.example.com/1.jpg", "https://images.example.com/2.jpg"],
  featured: true,                      // show on the homepage's Featured Projects section
  clientRequirements: "Optional — what the client asked for.",
  highlights: ["Optional bullet points", "shown on the project page"],
}
```

That's it — no other file needs to change. The project's detail page, its card in the portfolio grid and filters,
its entry in `sitemap.xml`, and its JSON-LD structured data are all derived automatically from this entry.

**Images:** any image host works as long as its domain is added to `images.remotePatterns` in
[`next.config.ts`](next.config.ts) (the project ships with `images.unsplash.com` allowed, since the seed content
uses Unsplash photos as placeholders). For production, replace the seed image URLs with your own project photography.

## Project Structure

```
app/                    Routes (App Router): home, portfolio, project detail, about, services, contact
components/
  layout/               Navbar, footer, theme toggle, scroll progress/scroll-to-top
  home/                 Homepage sections (hero, featured projects, process, testimonials, CTA)
  portfolio/             Portfolio grid, filters, search, project card
  project/                Project detail page: hero, info panel, gallery/lightbox, CTA
  contact/                Contact form
  shared/                 Reusable primitives (animated section, section heading, breadcrumbs, empty state)
  ui/                     shadcn/ui primitives
data/                   Content: projects.ts, testimonials.ts, services.ts, nav.ts
lib/                    Business logic: project queries, metadata/JSON-LD builders, site config, utils
types/                  Shared TypeScript types (Project, Category, Testimonial)
hooks/                  useInfiniteScroll, etc.
```

## Notes

- The portfolio listing (`/portfolio`) reads filters from the URL query string server-side and renders the filtered
  grid on the server, so filtered/search views are fully server-rendered and shareable — filtering interactions
  update the URL client-side after that.
- Every project detail page is statically generated at build time (`generateStaticParams`), so adding a project
  requires a rebuild/redeploy to appear as a static page.
- The contact form does not send email itself — it opens a pre-filled `mailto:` link to `lib/site.ts`'s configured
  email address. Wire it up to an email API (e.g. Resend) in `components/contact/contact-form.tsx` if server-side
  delivery is needed later.
