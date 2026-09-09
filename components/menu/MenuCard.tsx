"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store";
import { useToast } from "@/components/ui/Toast";
import Rating from "@/components/ui/Rating";
import type { MenuItem } from "@/data/menu";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const categoryName =
    categories.find((category) => category.id === item.category)?.name ??
    item.category;

  const toggleFavorite = () => setIsFavorite((current) => !current);

  const handleAddToCart = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    toast({
      title: "Added to cart",
      description: `${item.name} is ready to order.`,
      variant: "success",
    });
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link
        href={`/menu/${item.slug}`}
        aria-label={item.name}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream-light/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-charcoal backdrop-blur">
          {categoryName}
        </span>
        {item.featured ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cream-light">
            Bestseller
          </span>
        ) : null}
      </Link>

      <motion.button
        type="button"
        whileTap={{ scale: 0.82 }}
        onClick={toggleFavorite}
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? "Remove" : "Add"} ${item.name} ${isFavorite ? "from" : "to"} favorites`}
        className={cn(
          "absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-cream-light/90 text-charcoal shadow-soft transition-colors duration-300 backdrop-blur hover:text-terracotta",
          isFavorite && "text-terracotta",
        )}
      >
        <Heart
          size={17}
          className={cn(
            "transition-all duration-300",
            isFavorite ? "scale-110 fill-terracotta text-terracotta" : "fill-transparent",
          )}
        />
      </motion.button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-snug text-charcoal">
            <Link
              href={`/menu/${item.slug}`}
              className="transition-colors duration-300 group-hover:text-terracotta"
            >
              {item.name}
            </Link>
          </h3>
          <span className="shrink-0 font-serif text-lg text-terracotta">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <div className="mt-2">
          <Rating value={item.rating} showValue size={14} />
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-dark">
          {item.description}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-charcoal/15 text-sm font-medium text-charcoal transition-all duration-300 hover:border-terracotta hover:bg-terracotta hover:text-cream-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}