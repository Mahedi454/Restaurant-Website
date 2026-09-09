"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/data/categories";

interface CategoryTabsProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
  counts?: Record<string, number>;
}

export default function CategoryTabs({
  categories,
  active,
  onChange,
  counts,
}: CategoryTabsProps) {
  const options = [{ id: "all", name: "All" }, ...categories];

  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const isActive = active === option.id;
        const count = option.id === "all"
          ? counts
            ? Object.values(counts).reduce((sum, value) => sum + value, 0)
            : undefined
          : counts?.[option.id];
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              isActive
                ? "bg-charcoal text-cream-light shadow-soft"
                : "border border-beige bg-cream-light text-charcoal/70 hover:border-charcoal/20 hover:text-charcoal",
            )}
          >
            {option.name}
            {count !== undefined ? (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  isActive ? "bg-cream-light/15 text-cream-light" : "bg-beige text-stone",
                )}
              >
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}