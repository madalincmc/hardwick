export const siteConfig = {
  name: "Hardwick",
  tagline: "Mobilier Custom Fără Compromis",
  description:
    "Hardwick proiectează, produce și instalează mobilier custom de lux pentru proprietari, designeri de interior și spații comerciale. Design. Producție. Instalare.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hardwick.example.com",
  email: "raresbarbur@gmail.com",
  phone: "0749 687 074",
  address: {
    street: "Aleea Mocirei nr. 12",
    city: "Baia Mare",
    postalCode: "432100",
    county: "Maramureș",
    country: "România",
    lat: 47.638557,
    lng: 23.5193866,
  },
  hours: [
    { day: "Luni – Vineri", time: "09:00 – 18:00" },
    { day: "Sâmbătă", time: "Cu programare" },
    { day: "Duminică", time: "Închis" },
  ],
  social: {
    facebook: "https://www.facebook.com/hardwick.srl",
    instagram: "https://www.instagram.com/hardwicksrl",
    tiktok: "https://www.tiktok.com/@hardwick.srl",
  },
};

export type SiteConfig = typeof siteConfig;
