import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

export function FAQSection() {
  return (
    <Section id="faq" variant="muted">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions"
        description="Straight answers about what we offer and how to use it."
        align="center"
        className="mx-auto"
      />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {FAQ_ITEMS.map((item, index) => (
          <details
            key={item.question}
            className="group px-6 py-5"
            {...(index === 0 ? { open: true } : {})}
          >
            <summary
              className={cn(
                "cursor-pointer list-none text-base font-semibold text-navy-900",
                "flex items-center justify-between gap-4",
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              {item.question}
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-open:bg-brand-50 group-open:text-brand-700"
                aria-hidden
              >
                <svg
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
