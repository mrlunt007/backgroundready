import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import {
  CONTACT_EMAIL,
  NAV_LINKS,
  PRIMARY_CTA,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";
import { TRUST_COPY } from "@/lib/trust-copy";

const resourceLinks = [
  { label: "Free checklist", href: "/checklist" },
  { label: "Blog", href: "/blog" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark-section border-t border-white/5">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-primary)] text-sm font-bold text-white">
                BR
              </span>
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {SITE_DESCRIPTION}
            </p>
            <CTAWithTrust trust={TRUST_COPY.checklist} trustVariant="onDark" className="mt-4">
              <Button href={PRIMARY_CTA.href} size="sm">
                {PRIMARY_CTA.label}
              </Button>
            </CTAWithTrust>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white">Resources</p>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Company</p>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.filter(
                  (l) => l.label === "About" || l.label === "Contact",
                ).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Contact</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="transition-colors hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">{TRUST_COPY.general}</p>
        </div>
      </Container>
    </footer>
  );
}
