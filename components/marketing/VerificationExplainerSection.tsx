import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const verificationFacts = [
  {
    title: "Staffing & contract roles",
    description:
      "Many Fortune 500 teams hire through agencies. Verifiers often contact the agency—not the client company—for dates, title, and eligibility to rehire.",
  },
  {
    title: "What HR may not have",
    description:
      "Client-side HR may lack pay records or exact start/end dates for contractors. That does not mean your work did not happen—it means records live in different systems.",
  },
  {
    title: "Who actually gets called",
    description:
      "Checks usually reach HR, payroll, or your staffing firm. Former managers may be contacted only if you listed them. IT and security teams rarely participate in routine employment checks.",
  },
];

export function VerificationExplainerSection() {
  return (
    <Section id="verification" variant="offWhite">
      <SectionHeading
        eyebrow="How verification works"
        title="Where employment checks actually go"
        description="Understanding the process helps you prepare the right documents, references, and answers—before a delay costs you an offer."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {verificationFacts.map((fact) => (
          <article
            key={fact.title}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5"
          >
            <h3 className="text-lg font-semibold text-navy-900">{fact.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {fact.description}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/50 p-6 sm:p-8">
        <p className="text-base leading-relaxed text-slate-700">
          <strong className="font-semibold text-navy-900">The takeaway:</strong>{" "}
          screening is rarely one phone call to one HR desk. Contract work, acquired
          companies, and title changes create confusion—even when your history is
          accurate. Our job is to help you document what is true and present it
          consistently across every form and reference call.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="/blog/what-employers-verify" variant="outline">
            Read: what employers verify
          </Button>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)]"
          >
            More free guides →
          </Link>
        </div>
      </div>
    </Section>
  );
}
