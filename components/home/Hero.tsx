"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { EASE } from "@/lib/animations";
import { images } from "@/data/images";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const lineOne = "Good Food.";
const lineTwo = "Great Moments.";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const base = (delay: number, extra?: object) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
    ...extra,
  });

  return (
    <section
      className="relative overflow-hidden bg-charcoal"
      aria-label="Welcome to iFOODS"
    >
      {/* Background image */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1.14 }}
        transition={{ duration: 24, ease: "linear" }}
        className="absolute inset-0"
      >
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlays for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/45 to-charcoal/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-charcoal/25"
      />

      {/* Centered content */}
      <Container className="relative flex min-h-[92vh] items-center py-24 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            {...base(0.12)}
            className="inline-flex items-center gap-3 rounded-full border border-cream-light/25 bg-charcoal/40 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-terracotta-light" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-cream-light/90">
              Welcome to iFOODS · Modern Dining
            </span>
          </motion.span>

          <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-cream-light sm:text-6xl lg:text-7xl">
            <motion.span className="block" {...base(0.2)}>
              {lineOne}
            </motion.span>
            <motion.span className="block text-terracotta-light" {...base(0.28)}>
              {lineTwo}
            </motion.span>
          </h1>

          <motion.p
            {...base(0.36)}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-cream-light/80 sm:text-lg"
          >
            Fresh ingredients, bold flavors, and unforgettable dining
            experiences.
          </motion.p>

          <motion.div
            {...base(0.46, {
              initial: reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 },
              animate: reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 },
            })}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Button size="lg" href="/menu">
              Explore Menu
              <ArrowRight size={17} />
            </Button>
            <Button size="lg" variant="outline" href="/reservation" className="border-cream-light/40 text-cream-light hover:border-cream-light hover:text-cream-light hover:bg-cream-light/10">
              Reserve a Table
            </Button>
          </motion.div>

          <motion.div
            {...base(0.56)}
            className="mt-10 flex items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-terracotta-light text-terracotta-light"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-cream-light">4.9</span>
            </div>
            <span className="h-4 w-px bg-cream-light/25" aria-hidden="true" />
            <p className="text-sm text-cream-light/80">
              Loved by{" "}
              <span className="font-semibold text-cream-light">2,400+</span>{" "}
              guests
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}