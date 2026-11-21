import type { Metadata } from "next";
import Image from "next/image";
import { ChecklistSignupForm } from "@/components/marketing/ChecklistSignupForm";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Free checklist",
  description: `Get the free background-check readiness checklist from ${SITE_NAME} delivered to your email.`,
};

const checklistItems = [
  {
    title: "Work history timeline",
    description: "Every employer, title, location, and start/end date in one place.",
  },
  {
    title: "Gap documentation",
    description: "Brief, honest notes for any period between roles.",
  },
  {
    title: "Reference shortlist",
    description: "Names, roles, relationship, and confirmed contact details.",
  },
  {
    title: "Education & credentials",
    description: "Schools, degrees, certifications, and completion dates.",
  },
  {
    title: "Disclosure prep",
    description: "A private list of items you may need to address proactively.",
  },
  {
    title: "Interview talking points",
    description: "Consistent answers if a recruiter asks about your record.",
  },
];

const benefits = [
  "Works whether you're employed, between jobs, or changing careers",
  "Designed for U.S.-style employment screening (general guidance)",
  "Printable PDF you can work through at your own pace",
];

export default function ChecklistPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.reviewingDocuments.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-navy-950/88 via-navy-900/82 to-navy-900/70"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,179,158,0.22),transparent_55%)]"
            aria-hidden
          />
        </div>

        <Container className="relative py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="max-w-xl text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-200">
                Free resource
              </p>
              <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Ready for Your Next Background Check?
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg lg:mx-0">
                Get our free checklist to review your employment history, spot
                discrepancies, and prepare with confidence.
              </p>

              <ul className="mx-auto mt-8 hidden max-w-md space-y-3 text-left sm:block lg:mx-0 lg:max-w-none">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-slate-200"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/90 text-[11px] font-bold text-white"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="rounded-3xl border border-white/25 bg-white/85 p-6 shadow-2xl shadow-navy-950/30 backdrop-blur-xl sm:p-8">
                <ChecklistSignupForm source="checklist_page" />
                <p className="mt-5 text-center text-xs text-slate-500">
                  Questions? <ContactEmailLink className="text-xs font-medium" />.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="text-center font-serif text-xl font-semibold text-navy-900 sm:text-2xl">
            What you&apos;ll work through
          </h2>
          <ul className="mt-8 space-y-4">
            {checklistItems.map((item, index) => (
              <li key={item.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-navy-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-2 border-t border-slate-100 pt-8 sm:hidden">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm text-slate-600">
                <span className="text-brand-600" aria-hidden>
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
