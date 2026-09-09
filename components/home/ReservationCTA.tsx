import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";

export default function ReservationCTA() {
  return (
    <section
      aria-labelledby="reservation-cta-heading"
      className="relative overflow-hidden bg-charcoal"
    >
      <Image
        src="/images/reservation-1.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70 transition-colors" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />

      <Container className="relative py-28 sm:py-36">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 rounded-full border border-cream-light/25 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-terracotta-light" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-cream-light/80">
                Reserve Online
              </span>
            </span>
          </Reveal>
          <Reveal as="h2" id="reservation-cta-heading" delay={0.1} className="mt-6">
            <span className="text-balance font-serif text-4xl leading-tight text-cream-light sm:text-5xl lg:text-6xl">
              Your Table Is <span className="text-terracotta-light">Waiting</span>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.18} className="mt-5">
            <span className="text-base text-cream-light/70 sm:text-lg">
              Reserve in under a minute — we&apos;ll keep the light warm and the
              bread ready.
            </span>
          </Reveal>
          <Reveal delay={0.26} className="mt-9">
            <Button size="lg" href="/reservation">
              Reserve a Table
              <ArrowRight size={17} />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}