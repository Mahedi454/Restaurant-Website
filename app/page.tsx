import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <Badge variant="accent">Foundation ready</Badge>
      <h1 className="mt-6 max-w-3xl text-balance text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
        iFOODS
      </h1>
      <p className="mt-4 max-w-xl text-lg text-stone-dark">
        The design system, global animations, header, and footer are in place.
        Homepage content will arrive next.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button href="/menu">
          Explore the Menu
          <ArrowRight size={16} />
        </Button>
        <Button variant="outline" href="/reservation">
          Reserve a Table
        </Button>
      </div>
    </Container>
  );
}