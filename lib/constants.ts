export const SITE_NAME = "BackgroundReady";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://backgroundready.com";
export const SITE_DESCRIPTION =
  "Prepare for background checks with confidence—organize your history, explain gaps, and walk into interviews ready.";

export const SITE_TAGLINE =
  "Background check readiness for job seekers";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
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

export const SECONDARY_CTA = {
  label: "Explore services",
  href: "/services",
};

export const CONTACT_EMAIL = "hello@backgroundready.com";
