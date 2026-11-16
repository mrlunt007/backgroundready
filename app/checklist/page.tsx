import type { Metadata } from "next";
import { ChecklistSignupForm } from "@/components/marketing/ChecklistSignupForm";
import { Card } from "@/components/ui/Card";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free checklist",
  description: `Download the free background-check readiness checklist from ${SITE_NAME}.`,
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
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/70 via-white to-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Free resource
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              Get the free background-check checklist
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              Enter your email, confirm the message we send, and download the
              PDF—so you&apos;re organized before HR starts screening.
            </p>

            <Card className="mx-auto mt-8 w-full max-w-md border-brand-200/70 bg-white p-6 text-left shadow-md shadow-brand-500/10 sm:p-8">
              <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-700">
                Email signup
              </p>
              <p className="mt-2 text-center text-sm text-slate-600">
                We&apos;ll send a confirmation link with your PDF download.
              </p>
              <div className="mt-5">
                <ChecklistSignupForm compact />
              </div>
              <p className="mt-4 text-center text-xs text-slate-500">
                Questions? <ContactEmailLink className="text-xs font-medium" />.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="text-center text-xl font-semibold text-navy-900 sm:text-2xl">
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

          <ul className="mt-8 space-y-2 border-t border-slate-100 pt-8">
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
