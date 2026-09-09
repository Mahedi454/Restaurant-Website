"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { featuredDishes } from "@/data/dishes";
import { useCart } from "@/store";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Rating from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export default function FeaturedMenu() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddToCart = (id: string, name: string, price: number) => {
    addItem({ id, name, price });
    toast({
      title: "Added to cart",
      description: `${name} is ready to order.`,
      variant: "success",
    });
  };

  return (
    <section
      className="bg-cream-light py-20 sm:py-24"
      aria-labelledby="featured-heading"
    >
      <Container>
        <SectionHeading
          id="featured-heading"
          eyebrow="Chef's Selection"
          title="Featured Dishes"
          description="Eight guest favorites, crafted daily from the freshest seasonal ingredients."
        />

        <StaggerContainer
          staggerChildren={0.07}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredDishes.map((dish) => {
            const isFavorite = favorites.has(dish.id);
            return (
              <StaggerItem key={dish.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-soft transition-shadow duration-300 hover:shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-cream-light/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-charcoal backdrop-blur">
                      {dish.category}
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleFavorite(dish.id)}
                      aria-pressed={isFavorite}
                      aria-label={`${isFavorite ? "Remove" : "Add"} ${dish.name} ${isFavorite ? "from" : "to"} favorites`}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-cream-light/90 text-charcoal transition-colors backdrop-blur hover:text-terracotta"
                    >
                      <Heart
                        size={17}
                        className={
                          isFavorite
                            ? "fill-terracotta text-terracotta"
                            : "fill-transparent"
                        }
                      />
                    </motion.button>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg leading-snug text-charcoal transition-colors duration-300 group-hover:text-terracotta">
                        {dish.name}
                      </h3>
                      <span className="shrink-0 font-serif text-lg text-terracotta">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Rating value={dish.rating} showValue size={14} />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-dark">
                      {dish.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(dish.id, dish.name, dish.price)
                      }
                      className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-charcoal/15 text-sm font-medium text-charcoal transition-all duration-300 hover:border-terracotta hover:bg-terracotta hover:text-cream-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" href="/menu">
            View Full Menu
          </Button>
        </div>
      </Container>
    </section>
  );
}