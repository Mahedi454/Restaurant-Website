import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";

export default function MissionBand() {
  return (
    <section
      className="relative overflow-hidden bg-charcoal py-20 text-cream-light sm:py-24"
      aria-labelledby="mission-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border border-terracotta/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full border border-cream-light/10"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal as="span" className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-terracotta-light" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta-light">
              Our Mission
            </span>
            <span className="h-px w-8 bg-terracotta-light" />
          </Reveal>
          <Reveal as="h2" id="mission-heading" delay={0.08} className="mt-6">
            <span className="text-balance font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              “Food, honestly made, generously shared — that&apos;s the whole
              idea.”
            </span>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6">
            <span className="leading-relaxed text-cream-light/70 sm:text-lg">
              We exist to make ordinary evenings feel like occasions — cooking
              food we&apos;re proud to name, serving it with warmth, and leaving
              every guest a little happier than we found them.
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}