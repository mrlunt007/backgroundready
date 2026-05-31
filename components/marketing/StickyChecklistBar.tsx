"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 600;

export function StickyChecklistBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      role="complementary"
      aria-label="Checklist reminder"
    >
      <div className="border-t border-slate-200/80 bg-white/95 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <Container className="py-3 sm:py-3.5">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-center text-sm font-medium text-navy-900 sm:text-left">
              Ready to prepare? Get the free background check checklist.
            </p>
            <Button href={PRIMARY_CTA.href} size="sm" className="w-full shrink-0 sm:w-auto">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
