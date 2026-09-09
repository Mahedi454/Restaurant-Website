import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  className?: string;
  size?: number;
  showValue?: boolean;
  label?: string;
}

export default function Rating({
  value,
  max = 5,
  className,
  size = 16,
  showValue = false,
  label,
}: RatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-label={label ?? `Rated ${value} out of ${max}`}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled
                  ? "fill-terracotta text-terracotta"
                  : "fill-transparent text-stone/40",
              )}
            />
          );
        })}
      </div>
      {showValue ? (
        <span className="text-sm font-medium text-charcoal">
          {value.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}