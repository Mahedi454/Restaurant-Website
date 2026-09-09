"use client";

import { ArrowDownUp, ChevronDown, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { menuItems, type MenuItem } from "@/data/menu";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuGrid from "@/components/menu/MenuGrid";
import MenuSearch from "@/components/menu/MenuSearch";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating" | "name";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name (A–Z)" },
];

const categoryCounts = menuItems.reduce<Record<string, number>>(
  (counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
    return counts;
  },
  {},
);

function sortItems(items: MenuItem[], sort: SortKey): MenuItem[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "popular":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || b.rating - a.rating,
      );
  }
}

export default function MenuFilter({ initialCategory = "all" }: { initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    initialCategory && menuItems.some((item) => item.category === initialCategory)
      ? initialCategory
      : "all",
  );
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matched = menuItems.filter((item) => {
      const inCategory = category === "all" || item.category === category;
      if (!inCategory) return false;
      if (!normalized) return true;
      const categoryName =
        categories.find((entry) => entry.id === item.category)?.name ?? "";
      return (
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        categoryName.toLowerCase().includes(normalized)
      );
    });
    return sortItems(matched, sort);
  }, [query, category, sort]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  const hasActiveFilters = query.trim().length > 0 || category !== "all";

  return (
    <div className="flex flex-col">
      <div className="sticky top-20 z-30 -mx-5 bg-cream/90 px-5 pb-2 pt-4 backdrop-blur-xl sm:top-[4.75rem] lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <MenuSearch value={query} onChange={setQuery} className="w-full sm:max-w-md" />
          <div className="relative w-full sm:w-56">
            <label
              htmlFor="sort-select"
              className="sr-only"
            >
              Sort dishes
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-12 w-full cursor-pointer appearance-none rounded-full border border-beige bg-cream-light pl-4 pr-11 text-sm text-charcoal outline-none transition-colors duration-300 hover:border-charcoal/25 focus:border-charcoal/25 focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone"
            />
          </div>
        </div>

        <div className="mt-3">
          <CategoryTabs
            categories={categories}
            active={category}
            onChange={setCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pb-4 pt-4">
        <p className="text-sm text-stone-dark" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-charcoal">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "dish" : "dishes"}
          {query.trim() ? (
            <>
              {" "}
              matching <span className="font-medium text-charcoal">“{query.trim()}”</span>
            </>
          ) : null}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="hidden items-center gap-1.5 text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-full"
          >
            <ArrowDownUp size={14} />
            Reset
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <MenuGrid items={filtered} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-beige bg-cream-light/50 px-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-beige/60">
            <SearchX size={26} className="text-stone" />
          </div>
          <h2 className="mt-5 font-serif text-2xl text-charcoal">
            No dishes found
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-dark">
            {query.trim()
              ? "Try a different dish name, ingredient, or category."
              : "No dishes in this category right now. Try another category."}
          </p>
          <Button
            variant="outline"
            size="md"
            className={cn("mt-6", !hasActiveFilters && "hidden")}
            onClick={clearFilters}
          >
            Clear search & filters
          </Button>
        </div>
      )}
    </div>
  );
}