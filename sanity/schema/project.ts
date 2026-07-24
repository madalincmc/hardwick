import { defineField, defineType } from "sanity";

// Kept in sync by hand with CATEGORIES in types/project.ts — Sanity Studio bundles this
// config with its own Vite pipeline, which doesn't resolve the app's "@/*" path alias,
// so the list can't be imported directly from the Next.js codebase.
const CATEGORY_OPTIONS = [
  "Kitchens",
  "Wardrobes",
  "Living Rooms",
  "Bedrooms",
  "Bathrooms",
  "Offices",
  "Commercial",
];

const imageAltFields = [defineField({ name: "alt", title: "Alt text", type: "string" })];

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORY_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: imageAltFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          name: "galleryImage",
          title: "Gallery image",
          options: { hotspot: true },
          fields: imageAltFields,
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "clientRequirements",
      title: "Client requirements",
      type: "text",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
