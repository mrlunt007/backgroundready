import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-4 text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button href="/" className="mt-8">
          Go home
        </Button>
      </Container>
    </section>
  );
}
