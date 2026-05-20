import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free checklist",
  description: `Download the free background-check readiness checklist from ${SITE_NAME}.`,
};

const checklistItems = [
  "Gather identification and employment history",
  "Review addresses and dates for accuracy",
  "List professional references and contact info",
  "Note any records you may need to disclose",
  "Prepare questions for your recruiter or HR contact",
];

export default function ChecklistPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <SectionHeading
          title="Free background-check readiness checklist"
          description="A simple prep list to work through before your screening begins."
        />

        <Card className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            What&apos;s inside
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
            {checklistItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="mt-6">
          <p className="text-sm font-medium text-slate-900">Coming soon</p>
          <p className="mt-2 text-sm text-slate-600">
            Email capture and PDF download will be wired up in a later phase.
            For now, this page is a placeholder for the lead magnet funnel.
          </p>
          <div
            className="mt-6 space-y-4"
            role="group"
            aria-label="Checklist signup (placeholder)"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                disabled
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500"
              />
            </div>
            <Button disabled className="w-full sm:w-auto">
              Get the checklist (soon)
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
