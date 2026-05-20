import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  CONTACT_EMAIL,
  NAV_LINKS,
  PRIMARY_CTA,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-slate-900">{SITE_NAME}</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Explore</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Get started</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href={PRIMARY_CTA.href}
                  className="hover:text-slate-900"
                >
                  {PRIMARY_CTA.label}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-slate-900"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
