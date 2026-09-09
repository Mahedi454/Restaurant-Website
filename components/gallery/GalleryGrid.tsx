"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/animations";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { images } from "@/data/images";

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  fill: string;
}

const galleryItems: GalleryItem[] = [
  { src: images.restaurantInterior, alt: "The warm, softly lit dining room at iFOODS", category: "Restaurant", fill: "aspect-[3/4]" },
  { src: images.dining, alt: "Set tables under soft evening light", category: "Dining", fill: "aspect-[4/3]" },
  { src: images.foodSpread, alt: "The seasonal spread, laid out for the whole table", category: "Food", fill: "aspect-[4/3]" },
  { src: images.pizza, alt: "Wood-fired margherita pizza with basil", category: "Pizza", fill: "aspect-[4/3]" },
  { src: images.burger, alt: "Classic cheeseburger on a toasted bun", category: "Burgers", fill: "aspect-[4/3]" },
  { src: images.pasta, alt: "Truffle mushroom tagliatelle", category: "Pasta", fill: "aspect-[3/4]" },
  { src: images.steak, alt: "Dry-aged ribeye with herb butter", category: "Steak", fill: "aspect-[4/3]" },
  { src: images.salmon, alt: "Grilled salmon fillet with herbs", category: "Seafood", fill: "aspect-[3/4]" },
  { src: images.dessert, alt: "Decadent chocolate dessert", category: "Desserts", fill: "aspect-[3/4]" },
  { src: images.coffee, alt: "A cappuccino with latte art", category: "Drinks", fill: "aspect-[4/3]" },
  { src: images.chef, alt: "Executive Chef Marco Reyes in the kitchen", category: "Chef", fill: "aspect-[4/4]" },
  { src: images.atmosphere, alt: "The restaurant interior at dusk", category: "Interior", fill: "aspect-[3/4]" },
];

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useFocusTrap(dialogRef, activeIndex !== null);

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + direction + galleryItems.length) % galleryItems.length;
      });
    },
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, step]);

  const activeItem =
    activeIndex === null ? null : galleryItems[activeIndex];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image: ${item.alt}`}
            initial={false}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group relative w-full overflow-hidden rounded-2xl bg-beige text-start shadow-soft transition-shadow duration-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <div className={`relative w-full ${item.fill}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-light">
                    {item.category}
                  </p>
                  <p className="mt-1 text-sm text-cream-light">{item.alt}</p>
                </div>
                <span className="flex size-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-cream-light text-charcoal transition-transform duration-500 group-hover:translate-y-0">
                  <Expand size={16} />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeItem && activeIndex !== null ? (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.alt}
            tabIndex={-1}
            className="fixed inset-0 z-[120] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <motion.button
              type="button"
              aria-label="Close image viewer"
              onClick={close}
              className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-cream-light/15 text-cream-light backdrop-blur transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-light"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-2 z-10 flex size-11 items-center justify-center rounded-full bg-cream-light/15 text-cream-light backdrop-blur transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-light sm:left-5"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-2 z-10 flex size-11 items-center justify-center rounded-full bg-cream-light/15 text-cream-light backdrop-blur transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-light sm:right-5"
            >
              <ChevronRight size={22} />
            </button>

            <div className="relative z-[5] flex w-full max-w-4xl flex-col gap-4 px-4 sm:px-16">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={activeIndex}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden rounded-2xl shadow-lifted"
                >
                  <div className="relative aspect-[16/11] w-full bg-charcoal-light sm:aspect-[16/9]">
                    <Image
                      src={activeItem.src}
                      alt={activeItem.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 56rem, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 bg-charcoal px-5 py-3 text-cream-light">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{activeItem.alt}</p>
                      <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-terracotta-light">
                        {activeItem.category}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm tabular-nums text-cream-light/60">
                      {activeIndex + 1} / {galleryItems.length}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}