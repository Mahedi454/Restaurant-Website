"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode } from "react";
import { EASE, DURATION_BASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "span" | "li" | "p" | "h1" | "h2" | "h3" | "blockquote";
}

const motionTags = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  blockquote: motion.blockquote,
} as const;

export default function Reveal({
  children,
  className,
  id,
  delay = 0,
  once = true,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motionTags[as] as typeof motion.div;

  const sharedProps: HTMLMotionProps<"div"> = {
    id,
    className: cn(className),
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once, margin: "-80px" },
    transition: {
      duration: DURATION_BASE,
      ease: EASE,
      delay,
    },
  };

  return <Tag {...sharedProps}>{children}</Tag>;
}