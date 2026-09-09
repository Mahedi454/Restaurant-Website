import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

const sizeClasses = {
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
  narrow: "max-w-4xl",
} as const;

export default function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizeClasses[size], className)}>
      {children}
    </div>
  );
}