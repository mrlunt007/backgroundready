import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, PRIMARY_CTA, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md">
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white shadow-sm shadow-brand-600/30"
            aria-hidden
          >
            BR
          </span>
          <span className="text-lg font-bold tracking-tight text-navy-900 group-hover:text-brand-700 transition-colors">
            {SITE_NAME}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href={PRIMARY_CTA.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {PRIMARY_CTA.label}
          </Button>

          <details className="relative lg:hidden">
            <summary
              className={cn(
                "flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm",
                "[&::-webkit-details-marker]:hidden",
              )}
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <nav
              className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-900/10"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 p-3">
                <Button href={PRIMARY_CTA.href} className="w-full" size="sm">
                  {PRIMARY_CTA.label}
                </Button>
              </div>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
