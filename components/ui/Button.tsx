"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    children: ReactNode;
  };

type ButtonButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    children: ReactNode;
  };

type ButtonProps = ButtonLinkProps | ButtonButtonProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-terracotta text-cream-light hover:bg-terracotta-dark shadow-glow focus-visible:ring-terracotta",
  secondary:
    "bg-charcoal text-cream-light hover:bg-charcoal-soft focus-visible:ring-charcoal",
  outline:
    "border border-charcoal/20 bg-transparent text-charcoal hover:border-terracotta hover:text-terracotta focus-visible:ring-terracotta",
  ghost:
    "bg-transparent text-charcoal hover:bg-charcoal/5 focus-visible:ring-charcoal",
  white:
    "bg-cream-light text-charcoal hover:bg-cream focus-visible:ring-cream-light",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props as ButtonLinkProps;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as Omit<ButtonButtonProps, "href">;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}