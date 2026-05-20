import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Page not found"
        description="The page you're looking for doesn't exist or may have moved."
      />
      <Section containerClassName="text-center">
        <Button href="/" size="lg">
          Back to home
        </Button>
      </Section>
    </>
  );
}
