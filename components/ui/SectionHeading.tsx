import { cn } from "@/lib/utils";
import Reveal from "@/components/animations/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal as="span" className="inline-flex items-center gap-3">
          <span
            className={cn(
              "h-px w-8",
              light ? "bg-terracotta-light" : "bg-terracotta",
            )}
          />
          <span
            className={cn(
              "text-xs font-medium uppercase tracking-[0.22em]",
              light ? "text-terracotta-light" : "text-terracotta",
            )}
          >
            {eyebrow}
          </span>
          <span
            className={cn(
              "h-px w-8",
              light ? "bg-terracotta-light" : "bg-terracotta",
              align === "left" && "hidden",
            )}
          />
        </Reveal>
      ) : null}
      <Reveal as="h2" delay={0.06} className="text-balance">
        <span
          className={cn(
            "text-3xl leading-tight sm:text-4xl lg:text-5xl",
            light ? "text-cream-light" : "text-charcoal",
          )}
        >
          {title}
        </span>
      </Reveal>
      {description ? (
        <Reveal as="p" delay={0.12} className="max-w-2xl">
          <span
            className={cn(
              "text-base leading-relaxed sm:text-lg",
              light ? "text-cream-light/70" : "text-stone-dark",
            )}
          >
            {description}
          </span>
        </Reveal>
      ) : null}
    </div>
  );
}