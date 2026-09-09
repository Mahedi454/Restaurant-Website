"use client";

import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantityControlProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: "sm" | "md";
  className?: string;
  label?: string;
}

export default function QuantityControl({
  value,
  onDecrease,
  onIncrease,
  size = "md",
  className,
  label,
}: QuantityControlProps) {
  const buttonClasses =
    "flex items-center justify-center rounded-full text-charcoal transition-colors duration-200 hover:bg-terracotta hover:text-cream-light active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta disabled:pointer-events-none disabled:opacity-40";
  const containerClasses = cn(
    "inline-flex items-center gap-1 rounded-full border border-beige bg-cream-light p-1",
    size === "sm" ? "h-9" : "h-11",
    className,
  );
  const buttonSize = size === "sm" ? "size-7" : "size-9";
  const textSize = size === "sm" ? "text-sm" : "text-base";
  const reduceMotion = useReducedMotion();
  const tapAnimation = reduceMotion ? undefined : { scale: 0.85 };

  return (
    <div
      role="group"
      aria-label={label ?? "Quantity"}
      className={containerClasses}
    >
      <motion.button
        type="button"
        whileTap={tapAnimation}
        onClick={onDecrease}
        aria-label="Decrease quantity"
        disabled={value <= 1}
        className={cn(buttonClasses, buttonSize)}
      >
        <Minus size={size === "sm" ? 13 : 15} />
      </motion.button>
      <span className={cn("min-w-7 text-center font-medium tabular-nums text-charcoal", textSize)}>
        {value}
      </span>
      <motion.button
        type="button"
        whileTap={tapAnimation}
        onClick={onIncrease}
        aria-label="Increase quantity"
        className={cn(buttonClasses, buttonSize)}
      >
        <Plus size={size === "sm" ? 13 : 15} />
      </motion.button>
    </div>
  );
}