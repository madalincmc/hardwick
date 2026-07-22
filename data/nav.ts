export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Acasă", href: "/" },
  { label: "Portofoliu", href: "/portfolio" },
  { label: "Despre Noi", href: "/about" },
  { label: "Servicii", href: "/services" },
  { label: "Contact", href: "/contact" },
];
