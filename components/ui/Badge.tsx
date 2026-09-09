import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "light" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-charcoal text-cream-light",
  accent: "bg-terracotta text-cream-light",
  light: "bg-cream text-charcoal",
  outline: "border border-charcoal/20 text-charcoal bg-transparent",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}