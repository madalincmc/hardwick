# Product Requirements Document (PRD)

# Hardwick – Premium Custom Furniture Portfolio Website

**Version:** 1.0
**Project Type:** Marketing Website & Portfolio
**Primary Platform:** Web
**Hosting:** Vercel
**Framework:** Next.js 15 (App Router)

---

# 1. Project Overview

Build a premium, modern, responsive website for **Hardwick**, a company specializing in custom-made furniture.

Hardwick provides complete end-to-end services:

* Custom furniture design
* Furniture manufacturing
* Professional installation

The website's primary purpose is **not** to generate direct online sales. Instead, it will function as a premium digital portfolio that the owner can send to prospective clients.

The website should immediately communicate craftsmanship, attention to detail, quality, trust, and premium service.

The portfolio must become the centerpiece of the entire website.

---

# 2. Primary Goals

The website should allow visitors to:

* Discover the company.
* Browse completed projects.
* Experience the quality of Hardwick's work.
* Gain confidence in the company.
* Contact Hardwick for a quotation.

For the business owner, the website must:

* Showcase an ever-growing portfolio.
* Make adding new projects extremely easy.
* Be scalable for hundreds of future projects.
* Require minimal maintenance.
* Be fast and optimized.

---

# 3. Target Audience

Primary customers include:

* Homeowners
* Apartment owners
* Interior designers
* Architects
* Businesses
* Commercial property owners

Potential clients are looking for premium custom furniture rather than mass-produced products.

---

# 4. Brand Personality

The website should communicate:

* Luxury
* Sophistication
* Minimalism
* Precision
* Craftsmanship
* Premium quality
* Elegance
* Trust
* Modern design
* Professionalism

The overall experience should resemble premium architecture and interior design studios rather than traditional furniture stores.

---

# 5. Design Direction

## Overall Style

Modern.

Elegant.

Minimal.

Premium.

Large photography.

Generous whitespace.

Subtle animations.

Smooth scrolling.

Refined micro-interactions.

Avoid clutter.

Avoid flashy colors.

Avoid unnecessary visual noise.

---

## Color Palette

Primary

* White
* Soft White
* Charcoal
* Matte Black

Secondary

* Warm Gray
* Stone
* Light Beige
* Natural Wood tones

Accent

* Brushed Gold
* Bronze

Accent colors should be subtle.

---

## Typography

Preferred fonts:

* Inter
* Manrope
* Plus Jakarta Sans

Typography should feel premium with generous spacing.

---

## Visual Inspiration

The design should resemble premium brands in:

* Architecture
* Interior Design
* Luxury Furniture
* Premium Home Design

---

# 6. Responsive Design

The website must be fully responsive.

Support:

* Desktop
* Laptop
* Tablet
* Mobile

Mobile-first implementation.

No horizontal scrolling.

Touch-friendly interactions.

---

# 7. Website Structure

## Home

### Hero Section

Large cinematic image.

Headline:

> Custom Furniture Without Compromise

Subheadline:

> Design. Manufacturing. Installation.

Primary CTA

* View Portfolio

Secondary CTA

* Request a Quote

---

### Why Hardwick

Cards presenting:

* Custom Design
* Premium Materials
* In-house Manufacturing
* Professional Installation

---

### Featured Projects

Display latest six projects.

Each card includes:

* Cover image
* Title
* Category

Button:

View All Projects

---

### Work Process

Visual timeline:

1. Consultation
2. Design
3. Manufacturing
4. Installation

---

### Testimonials

Elegant testimonial cards.

---

### Contact CTA

Large premium call-to-action encouraging visitors to request a quotation.

---

## Portfolio Page

This is the most important page of the website.

It must be designed to eventually contain hundreds of projects.

### Features

Filters

* Kitchens
* Wardrobes
* Living Rooms
* Bedrooms
* Bathrooms
* Offices
* Commercial
* All

Search functionality.

Sorting.

Responsive grid.

Each project card includes:

* Cover image
* Title
* Category
* Location
* Short description

---

## Project Details Page

Every project receives its own dedicated page.

Layout:

Large hero image.

Project title.

Location.

Category.

Description.

Year.

Materials used.

Optional client requirements.

Optional project highlights.

---

## Image Gallery

The gallery is the most important feature.

Requirements:

* Masonry layout or premium responsive grid
* Fullscreen Lightbox
* Next / Previous navigation
* Keyboard navigation
* Swipe support
* Zoom
* Lazy loading
* Blur placeholders
* Preload adjacent images
* Responsive images
* Smooth animations

Photography should be the main focus.

---

### Project CTA

After every project:

Interested in a similar project?

Request a Quote

---

## About Page

Company story.

Mission.

Values.

Craftsmanship.

Attention to detail.

Process.

---

## Services

Present services using premium cards.

Services include:

* Furniture Design
* Manufacturing
* Installation

---

## Contact

Include:

Contact form

Fields:

* Name
* Email
* Phone
* Message

Company information.

Map.

Business hours.

---

# 8. Portfolio Management

Adding a new project should require editing only one file or creating one new content entry.

Preferred content model:

```
title
slug
category
location
year
description
materials
coverImage
gallery[]
featured
```

Project pages should be generated automatically.

Portfolio pages should update automatically.

No duplicated manual work.

The architecture must support hundreds of future projects.

---

# 9. Technical Stack

Framework

* Next.js 15
* React 19

Language

* TypeScript

Styling

* Tailwind CSS v4

UI Components

* shadcn/ui

Icons

* Lucide React

Animations

* Framer Motion

Image Optimization

* next/image

Fonts

* next/font

Do NOT use:

* Bootstrap
* jQuery

---

# 10. Architecture

Follow modern Next.js best practices.

Suggested structure:

```
app/

components/

components/ui/

lib/

hooks/

types/

data/

public/

styles/

content/

```

Components must be reusable.

Business logic separated from UI.

Strong typing.

Scalable architecture.

---

# 11. Performance

Target Lighthouse:

Performance: 95+

Accessibility: 100

SEO: 100

Best Practices: 100

Requirements:

* Image optimization
* Lazy loading
* Code splitting
* Route optimization
* Metadata optimization
* Font optimization
* Static rendering where possible
* Server Components by default
* Client Components only when required

---

# 12. SEO

Every page must have:

* Title
* Description
* Canonical URL

Portfolio pages should automatically generate:

* OpenGraph
* Twitter Cards
* Structured Data
* JSON-LD

Generate:

* robots.txt
* sitemap.xml

---

# 13. Accessibility

WCAG compliant.

Requirements:

* Keyboard navigation
* Proper contrast
* Alt text
* Focus states
* Semantic HTML
* Screen reader friendly

---

# 14. Premium Features

Include:

* Sticky navigation
* Animated navbar
* Scroll progress indicator
* Scroll-to-top button
* Breadcrumbs
* Skeleton loading
* Blur image placeholders
* Elegant page transitions
* Premium hover animations
* Responsive masonry gallery
* Smooth scrolling
* Infinite scroll or pagination
* Instant filtering
* Search
* Dark Mode
* Loading animations
* Empty states
* Error pages (404, etc.)

Animations should be subtle and elegant.

---

# 15. Hosting & Deployment

The website will be hosted on **Vercel**.

Requirements:

* Fully optimized for Vercel.
* Compatible with Next.js App Router.
* Deploy directly from GitHub.
* Production-ready build.
* Environment variables support.
* Optimized for Vercel Image Optimization.
* Optimized Server Components.
* Build must succeed without additional configuration.

Include:

* `.gitignore`
* `README.md`

README should explain:

* Installation
* Development
* Production build
* Deployment to Vercel
* How to add new portfolio projects

---

# 16. Code Quality

The generated code must be:

* Clean
* Modular
* Maintainable
* Scalable
* Well documented
* Production ready

Use:

* Reusable components
* Consistent naming
* Type safety
* Modern React patterns
* Clean folder organization

Avoid duplicated logic.

---

# 17. Future-Proofing

The architecture should allow future additions such as:

* Admin dashboard
* CMS integration
* Blog
* Client testimonials
* Multi-language support
* Image optimization services
* Analytics
* Lead tracking
* Contact CRM integration
* Appointment booking
* AI-powered search

These should be easy to integrate without major architectural changes.

---

# 18. Success Criteria

The project will be considered successful if:

* The website immediately conveys a premium brand image.
* Photography is the primary visual focus.
* Navigation feels effortless.
* Portfolio browsing is enjoyable.
* Adding new projects is simple.
* The website achieves excellent Lighthouse scores.
* The experience is smooth across all devices.
* Deployment to Vercel is straightforward.
* The codebase is clean, scalable, and maintainable.

---

# Final Vision

Hardwick should feel like a premium design studio rather than a typical furniture manufacturer.

Visitors should finish browsing with the impression that Hardwick delivers bespoke, high-end craftsmanship. Every aspect of the website—from typography and spacing to animations and imagery—should reinforce quality, attention to detail, and trust.

The portfolio is the heart of the experience and must be designed to showcase projects in the most elegant and immersive way possible, while remaining fast, scalable, and effortless to maintain.
