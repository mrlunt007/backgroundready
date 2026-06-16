export const SITE_NAME = "BackgroundReady";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://backgroundready.com";
export const SITE_DESCRIPTION =
  "Pass employment verification with confidence—organize real work history, explain gaps honestly, and align references before screening starts.";

export const SITE_TAGLINE =
  "Background check readiness for job seekers";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Verification", href: "/verification" },
  { label: "Approach", href: "/approach" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const PRIMARY_CTA = {
  label: "Get the free checklist",
  href: "/checklist",
};

export const SECONDARY_CTA = {
  label: "Contact us",
  href: "/contact",
};

export const CONTACT_EMAIL = "contact@backgroundready.com";

export const CONTACT_MAILTO_SUBJECT = "Question for BackgroundReady";

export const CONTACT_MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_MAILTO_SUBJECT)}`;

export const CONTACT_MAILTO_CHECKLIST_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Checklist request")}`;

export function contactMailtoForProduct(productTitle: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Product inquiry: ${productTitle}`)}`;
}
