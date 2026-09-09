import type { ReactNode } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[62vh] items-center overflow-hidden bg-charcoal text-center text-cream-light">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/40" />
      <Container className="relative py-20 sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal
            as="span"
            className="inline-flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-terracotta-light" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta-light">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-terracotta-light" />
          </Reveal>
          <Reveal
            as="h1"
            delay={0.08}
            className="mt-5 text-balance font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </Reveal>
          {description ? (
            <Reveal as="p" delay={0.16} className="mt-5">
              <span className="mx-auto block max-w-2xl text-base leading-relaxed text-cream-light/75 sm:text-lg">
                {description}
              </span>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}