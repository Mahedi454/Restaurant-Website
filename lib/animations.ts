import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION_FAST = 0.35;
export const DURATION_BASE = 0.5;
export const DURATION_SLOW = 0.7;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_BASE, ease: EASE },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE, ease: EASE },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE, ease: EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_FAST, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_FAST, ease: EASE },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.15 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: DURATION_SLOW + 0.3, ease: EASE },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: DURATION_FAST, ease: EASE },
  },
};

export const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_FAST, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.22, ease: "easeInOut" },
  },
};