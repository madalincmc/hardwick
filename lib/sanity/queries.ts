const PROJECT_PROJECTION = /* groq */ `{
  title,
  "slug": slug.current,
  category,
  location,
  year,
  description,
  materials,
  featured,
  clientRequirements,
  highlights,
  coverImage,
  gallery,
  _updatedAt
}`;

export const PROJECTS_QUERY = /* groq */ `
  *[_type == "project"] | order(year desc) ${PROJECT_PROJECTION}
`;

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "project" && slug.current == $slug][0] ${PROJECT_PROJECTION}
`;
