"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import { images } from "@/data/images";

export default function PromoBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="promo-heading"
      className="relative overflow-hidden bg-charcoal"
    >
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 1.08 }}
        whileInView={reduceMotion ? undefined : { scale: 1.18 }}
        viewport={{ once: true }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <Image
          src={images.foodSpread}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/85" />

      <Container className="relative py-24 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 rounded-full border border-terracotta-light/40 bg-terracotta/15 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-terracotta-light" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta-light">
                Weekend Special
              </span>
            </span>
          </Reveal>
          <Reveal as="h2" id="promo-heading" delay={0.1} className="mt-6">
            <span className="text-balance font-serif text-3xl leading-tight text-cream-light sm:text-4xl lg:text-5xl">
              Enjoy {""}
              <span className="text-terracotta-light">20% off</span> selected
              dishes every Friday and Saturday
            </span>
          </Reveal>
          <Reveal as="p" delay={0.18} className="mt-4">
            <span className="text-base text-cream-light/70">
              A little celebration to end every week well — at the table, not
              the screen.
            </span>
          </Reveal>
          <Reveal delay={0.26} className="mt-8">
            <Button size="lg" variant="white" href="/offers">
              Explore Offers
              <ArrowRight size={17} />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}