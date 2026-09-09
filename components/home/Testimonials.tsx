"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Rating from "@/components/ui/Rating";

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -60 }),
};

export default function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const testimonial = testimonials[index];
  const count = testimonials.length;

  const paginate = useCallback(
    (nextDirection: number) => {
      setState(([current]) => [
        (current + nextDirection + count) % count,
        nextDirection,
      ]);
    },
    [count],
  );

  return (
    <section className="bg-cream-light py-20 sm:py-24" aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Kind Words"
          title="What Our Guests Say"
          description="A few of the notes left behind by people who stayed a little longer."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-7xl text-terracotta/20"
          >
            “
          </div>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={testimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
              className="mx-4 flex flex-col items-center text-center sm:mx-14"
            >
              <Image
                src={testimonial.image}
                alt={`Portrait of ${testimonial.name}`}
                width={200}
                height={200}
                className="size-16 rounded-full border-2 border-terracotta/30 object-cover"
              />
              <div className="mt-4">
                <Rating value={testimonial.rating} showValue size={15} label={`${testimonial.name} rated ${testimonial.rating} out of 5`} />
              </div>
              <blockquote className="mt-6 font-serif text-xl leading-relaxed text-charcoal sm:text-2xl">
                “{testimonial.review}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-medium text-charcoal">{testimonial.name}</p>
                <p className="mt-0.5 text-sm text-stone-dark">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Controls */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-beige bg-cream text-charcoal shadow-soft transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-beige bg-cream text-charcoal shadow-soft transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index
                  ? "w-8 bg-terracotta"
                  : "w-2 bg-charcoal/15 hover:bg-charcoal/30",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}