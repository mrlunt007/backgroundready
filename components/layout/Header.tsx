import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, PRIMARY_CTA, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          {SITE_NAME}
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={PRIMARY_CTA.href}
            variant="primary"
            className="hidden text-sm sm:inline-flex"
          >
            {PRIMARY_CTA.label}
          </Button>

          <details className="relative md:hidden">
            <summary
              className={cn(
                "cursor-pointer list-none rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700",
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              Menu
            </summary>
            <nav
              className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-lg"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 px-4 py-3">
                <Button href={PRIMARY_CTA.href} variant="primary" className="w-full">
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
