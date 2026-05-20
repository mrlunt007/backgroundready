export const SITE_NAME = "BackgroundReady";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://backgroundready.com";
export const SITE_DESCRIPTION =
  "Practical guides, tools, and services to help you get background-check ready.";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PRIMARY_CTA = {
  label: "Get the free checklist",
  href: "/checklist",
};

export const CONTACT_EMAIL = "hello@backgroundready.com";
