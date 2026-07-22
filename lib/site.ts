export const siteConfig = {
  name: "Hardwick",
  tagline: "Mobilier Custom Fără Compromis",
  description:
    "Hardwick proiectează, produce și instalează mobilier custom de lux pentru proprietari, designeri de interior și spații comerciale. Design. Producție. Instalare.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hardwick.example.com",
  email: "contact@hardwick.example.com",
  phone: "+40 262 411 782",
  address: {
    street: "Strada Culturii nr. 22",
    city: "Baia Mare",
    postalCode: "430311",
    county: "Maramureș",
    country: "România",
  },
  hours: [
    { day: "Luni – Vineri", time: "09:00 – 18:00" },
    { day: "Sâmbătă", time: "Cu programare" },
    { day: "Duminică", time: "Închis" },
  ],
  social: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    houzz: "https://houzz.com",
  },
};

export type SiteConfig = typeof siteConfig;
