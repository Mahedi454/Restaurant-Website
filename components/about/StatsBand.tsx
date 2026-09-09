"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";

interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Menu Items" },
  { value: 10, suffix: "K+", label: "Happy Customers" },
  { value: 4.9, decimals: 1, label: "Average Rating" },
];

function Counter({ value, decimals = 0, suffix = "" }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => {
    const formatted = latest.toFixed(decimals);
    return `${formatted}${suffix}`;
  });

  const formatted = `${value.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, reduceMotion, count, value]);

  return (
    <span ref={ref}>
      {reduceMotion ? formatted : <motion.span>{display}</motion.span>}
    </span>
  );
}

export default function StatsBand() {
  return (
    <section className="bg-charcoal py-16 text-cream-light sm:py-20" aria-labelledby="stats-heading">
      <Container>
        <h2 id="stats-heading" className="sr-only">
          iFOODS by the numbers
        </h2>
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="font-serif text-5xl text-terracotta-light tabular-nums sm:text-6xl">
                <Counter {...stat} />
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-cream-light/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}