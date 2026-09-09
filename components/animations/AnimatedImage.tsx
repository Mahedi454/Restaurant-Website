"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  rounded?: string;
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  rounded = "rounded-xl",
}: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-beige", rounded, className)}
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 1.15 }}
        animate={
          reduceMotion
            ? undefined
            : isInView
              ? { scale: 1 }
              : { scale: 1.15 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="size-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="size-full object-cover"
        />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : { y: "100%" }}
        animate={reduceMotion ? undefined : isInView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-10 bg-terracotta/10"
      />
    </div>
  );
}