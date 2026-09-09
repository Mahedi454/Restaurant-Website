"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function MenuSearch({
  value,
  onChange,
  className,
}: MenuSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search dishes, ingredients…"
        aria-label="Search dishes"
        className="peer h-12 w-full appearance-none rounded-full border border-beige bg-cream-light pl-11 pr-11 text-sm text-charcoal outline-none transition-colors duration-300 placeholder:text-stone focus:border-charcoal/25 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-stone transition-colors hover:bg-charcoal/5 hover:text-charcoal"
        >
          <X size={15} />
        </button>
      ) : null}
    </div>
  );
}