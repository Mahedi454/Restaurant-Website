"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Clock, Heart, Leaf, ShoppingBag, Soup } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Rating from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import QuantityControl from "@/components/cart/QuantityControl";
import MenuGrid from "@/components/menu/MenuGrid";
import { useCartStore } from "@/store";
import { EASE } from "@/lib/animations";
import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

interface FoodDetailsClientProps {
  item: MenuItem;
  categoryName: string;
  related: MenuItem[];
}

export default function FoodDetailsClient({
  item,
  categoryName,
  related,
}: FoodDetailsClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleAddToCart = () => {
    addItem(
      { id: item.id, name: item.name, price: item.price, image: item.image },
      quantity,
    );
    toast({
      title: "Added to cart",
      description: `${quantity} × ${item.name} is ready to order.`,
      variant: "success",
    });
  };

  const handleAddFavorite = () => {
    setIsFavorite((current) => !current);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: item.name,
      variant: "info",
    });
  };

  return (
    <>
      <section className="overflow-hidden bg-cream">
        <Container className="py-10 lg:py-16">
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-wrap items-center gap-1.5 text-sm text-stone"
          >
            <Link
              href="/menu"
              className="transition-colors hover:text-terracotta"
            >
              Menu
            </Link>
            <ChevronRight size={14} className="text-stone/60" />
            <Link
              href={`/menu?category=${item.category}`}
              className="transition-colors hover:text-terracotta"
            >
              {categoryName}
            </Link>
            <ChevronRight size={14} className="text-stone/60" />
            <span className="font-medium text-charcoal">{item.name}</span>
          </motion.nav>

          <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative aspect-square overflow-hidden rounded-3xl shadow-card lg:sticky lg:top-28"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {item.featured ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: 40, y: 40 }}
                  animate={{ opacity: 1, x: 24, y: 24 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
                  className="absolute bottom-0 right-0 flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream-light shadow-card"
                >
                  <Soup size={14} className="text-terracotta-light" />
                  Bestseller
                </motion.div>
              ) : null}
            </motion.div>

            {/* Details */}
            <div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-beige bg-cream-light px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-terracotta"
              >
                {categoryName}
                {item.category === "breakfast" ? <Clock size={13} /> : null}
              </motion.div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                className="mt-4 font-serif text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl"
              >
                {item.name}
              </motion.h1>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                className="mt-4 flex items-center gap-4"
              >
                <Rating value={item.rating} showValue size={17} />
                <span className="h-4 w-px bg-beige" />
                <span className="font-serif text-2xl text-terracotta sm:text-3xl">
                  ${item.price.toFixed(2)}
                </span>
              </motion.div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                className="mt-6 max-w-xl text-base leading-relaxed text-stone-dark"
              >
                {item.description}
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                className="mt-8"
              >
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
                  <Leaf size={15} className="text-terracotta" />
                  Ingredients
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="rounded-full border border-beige bg-cream-light px-3.5 py-1.5 text-sm text-charcoal/80"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
                className="mt-8 flex flex-col gap-4 border-t border-beige pt-8 sm:flex-row sm:items-center"
              >
                <QuantityControl
                  value={quantity}
                  onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
                  onIncrease={() => setQuantity((current) => Math.min(10, current + 1))}
                  label={`Quantity of ${item.name}`}
                />
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto sm:flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={17} />
                  Add to Cart
                </Button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={handleAddFavorite}
                  aria-pressed={isFavorite}
                  aria-label={`${isFavorite ? "Remove" : "Add"} ${item.name} ${isFavorite ? "from" : "to"} favorites`}
                  className={cn(
                    "flex h-13 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors duration-300 sm:w-14",
                    isFavorite
                      ? "border-terracotta bg-terracotta text-cream-light"
                      : "border-charcoal/15 text-charcoal hover:border-terracotta hover:text-terracotta",
                  )}
                >
                  <Heart
                    size={17}
                    className={isFavorite ? "fill-current" : "fill-transparent"}
                  />
                  <span className="sm:hidden">
                    {isFavorite ? "In favorites" : "Save to favorites"}
                  </span>
                </motion.button>
              </motion.div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="mt-8 text-sm text-stone"
              >
                Prices include taxes. Free delivery on orders over $40.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section
          className="bg-cream-light py-16 sm:py-20"
          aria-labelledby="related-heading"
        >
          <Container>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="related-heading"
                  className="font-serif text-2xl text-charcoal sm:text-3xl"
                >
                  You may also like
                </h2>
                <p className="mt-1 text-sm text-stone-dark">
                  More {categoryName.toLowerCase()} favorites from our kitchen.
                </p>
              </div>
              <Button variant="outline" size="md" href="/menu">
                View Full Menu
              </Button>
            </div>
            <div className="mt-8">
              <MenuGrid items={related} />
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}