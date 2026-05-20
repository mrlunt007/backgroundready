import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} and our mission to help people prepare for background checks.`,
};

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          title={`About ${SITE_NAME}`}
          description="We help people understand and prepare for employment background checks—with practical content, not legal jargon."
        />

        <div className="prose prose-slate mt-10 max-w-none space-y-6 text-slate-600">
          <p>
            Background checks can feel opaque. {SITE_NAME} exists to make the
            process clearer: what employers typically review, how to organize
            your records, and when to seek extra help.
          </p>
          <p>
            This site is being built in phases. You&apos;ll soon find articles,
            digital products, and services—all focused on readiness, not fear.
          </p>
          <p>
            <strong className="text-slate-900">Note:</strong> Content on this
            site is for general educational purposes and is not legal advice.
            Consult a qualified professional for your specific situation.
          </p>
        </div>
      </Container>
    </section>
  );
}
