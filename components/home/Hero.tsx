"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, CalendarCheck, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { EASE } from "@/lib/animations";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const lineOne = "Good Food.";
const lineTwo = "Great Moments.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const base = (delay: number, extra?: object) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
    ...extra,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream"
      aria-label="Welcome to iFOODS"
    >
      {/* Ambient background */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-terracotta/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-48 size-[32rem] rounded-full bg-beige/60 blur-3xl"
      />

      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Copy */}
          <div className="order-2 max-w-xl lg:order-1">
            <motion.span
              {...base(0.12)}
              className="inline-flex items-center gap-3 rounded-full border border-terracotta/25 bg-terracotta/5 px-4 py-1.5"
            >
              <span className="size-1.5 rounded-full bg-terracotta" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
                Welcome to iFOODS · Modern Dining
              </span>
            </motion.span>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
              <motion.span
                className="block"
                {...base(0.2)}
              >
                {lineOne}
              </motion.span>
              <motion.span
                className="block text-terracotta"
                {...base(0.28)}
              >
                {lineTwo}
              </motion.span>
            </h1>

            <motion.p
              {...base(0.36)}
              className="mt-6 max-w-md text-base leading-relaxed text-stone-dark sm:text-lg"
            >
              Fresh ingredients, bold flavors, and unforgettable dining
              experiences.
            </motion.p>

            <motion.div
              {...base(0.46, {
                initial: reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 },
                animate: reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 },
              })}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button size="lg" href="/menu">
                Explore Menu
                <ArrowRight size={17} />
              </Button>
              <Button size="lg" variant="outline" href="/reservation">
                Reserve a Table
              </Button>
            </motion.div>

            <motion.div
              {...base(0.56)}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-terracotta text-terracotta"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-charcoal">4.9</span>
              </div>
              <span className="h-4 w-px bg-beige" aria-hidden="true" />
              <p className="text-sm text-stone-dark">
                Loved by <span className="font-semibold text-charcoal">2,400+</span>{" "}
                guests
              </p>
            </motion.div>
          </div>

          {/* Imagery */}
          <motion.div
            style={{ y: reduceMotion ? undefined : imageY }}
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? undefined : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-1 lg:order-2"
          >
            {/* Decorative ring */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.06 }}
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 -z-10 size-40 rounded-full border border-terracotta/30"
            />
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.06 }}
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 bottom-8 -z-10 size-28 rounded-full border border-terracotta/20"
            />

            <div className="relative overflow-hidden rounded-[2rem] shadow-lifted">
              <Image
                src="/images/hero-1.svg"
                alt="Signature dish prepared at iFOODS"
                width={1200}
                height={1200}
                priority
                className="size-full object-cover"
              />
            </div>

            {/* Floating rating badge */}
            <motion.div
              style={{ y: reduceMotion ? undefined : badgeY }}
              {...base(0.5, {
                initial: reduceMotion ? false : { opacity: 0, y: 20 },
                animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
              })}
              className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl bg-cream-light/95 p-4 shadow-card backdrop-blur sm:-left-8"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-terracotta/10">
                <CalendarCheck size={20} className="text-terracotta" />
              </span>
              <div>
                <p className="font-serif text-lg leading-none text-charcoal">
                  Book a table
                </p>
                <p className="mt-1 text-xs text-stone-dark">
                  Open every day · 11:00 AM
                </p>
              </div>
            </motion.div>

            {/* Est chip */}
            <motion.span
              {...base(0.58)}
              className="absolute -top-3 right-6 rounded-full bg-charcoal px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cream-light shadow-card"
            >
              Est. 2008
            </motion.span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}