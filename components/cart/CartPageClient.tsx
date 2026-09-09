"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuantityControl from "@/components/cart/QuantityControl";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import Reveal from "@/components/animations/Reveal";
import {
  FREE_DELIVERY_THRESHOLD,
  useCartDeliveryFee,
  useCartItems,
  useCartStore,
  useCartSubtotal,
  useCartTotal,
} from "@/store";
import { EASE } from "@/lib/animations";

export default function CartPageClient() {
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const deliveryFee = useCartDeliveryFee();
  const total = useCartTotal();
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clear = useCartStore((state) => state.clear);
  const { toast } = useToast();
  const reduceMotion = useReducedMotion();

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal,
  );

  const handleCheckout = () => {
    toast({
      title: "Checkout is a frontend demo",
      description: "Payment will be wired up in a future milestone.",
      variant: "info",
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-beige/60">
          <ShoppingBag size={36} className="text-stone" />
        </div>
        <Reveal as="h1" delay={0.06} className="mt-6">
          <span className="font-serif text-3xl text-charcoal sm:text-4xl">
            Your cart is empty
          </span>
        </Reveal>
        <Reveal as="p" delay={0.12}>
          <span className="mt-3 block max-w-md text-base leading-relaxed text-stone-dark">
            Nothing here yet — explore the menu and add your favorite dishes.
            Orders over $40 ship with free delivery.
          </span>
        </Reveal>
        <Reveal as="div" delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="lg" href="/menu">
            Browse the Menu
            <ArrowRight size={16} />
          </Button>
          <Button variant="outline" size="lg" href="/reservation">
            Reserve a Table
          </Button>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_24rem]">
      <div>
        <Reveal as="h1" className="text-balance">
          <span className="font-serif text-3xl text-charcoal sm:text-4xl">
            Your Cart
          </span>
        </Reveal>
        <Reveal as="p" delay={0.06}>
          <span className="mt-2 block text-sm text-stone-dark">
            {count} {count === 1 ? "item" : "items"} ready for delivery.
          </span>
        </Reveal>

        <ul className="mt-8 divide-y divide-beige rounded-3xl bg-cream-light px-5 shadow-soft sm:px-7">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: EASE },
                }}
                exit={{
                  opacity: 0,
                  x: 48,
                  height: 0,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/menu/${item.id}`}
                  className="relative block size-24 shrink-0 self-start overflow-hidden rounded-2xl bg-beige/50 sm:self-auto"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/menu/${item.id}`}
                    className="line-clamp-1 font-medium text-charcoal transition-colors hover:text-terracotta"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-0.5 text-sm text-stone">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <QuantityControl
                    value={item.quantity}
                    onDecrease={() => decreaseQuantity(item.id)}
                    onIncrease={() => increaseQuantity(item.id)}
                    label={`Quantity of ${item.name}`}
                  />
                  <span className="w-20 text-right font-serif text-lg text-charcoal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-stone transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Button variant="outline" size="md" href="/menu">
            <span className="mr-1">←</span> Continue shopping
          </Button>
          <button
            type="button"
            onClick={clear}
            className="text-sm font-medium text-stone-dark underline-offset-4 transition-colors hover:text-terracotta hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-full"
          >
            Clear cart
          </button>
        </div>
      </div>

      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="lg:sticky lg:top-28"
      >
        <div className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-7">
          <h2 className="font-serif text-xl text-charcoal">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-stone-dark">Subtotal</dt>
              <dd className="font-medium tabular-nums text-charcoal">
                ${subtotal.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-stone-dark">Delivery</dt>
              <dd
                className={
                  deliveryFee === 0
                    ? "font-medium text-terracotta"
                    : "font-medium tabular-nums text-charcoal"
                }
              >
                {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-beige pt-3">
              <dt className="text-base font-semibold text-charcoal">Total</dt>
              <dd className="font-serif text-2xl text-terracotta tabular-nums">
                ${total.toFixed(2)}
              </dd>
            </div>
          </dl>

          {remainingForFreeDelivery > 0 ? (
            <p className="mt-4 rounded-xl bg-beige/50 px-4 py-2.5 text-xs text-stone-dark">
              Add{" "}
              <span className="font-semibold text-terracotta">
                ${remainingForFreeDelivery.toFixed(2)}
              </span>{" "}
              more to unlock free delivery.
            </p>
          ) : (
            <p className="mt-4 rounded-xl bg-terracotta/10 px-4 py-2.5 text-xs font-medium text-terracotta-dark">
              You&apos;ve unlocked free delivery!
            </p>
          )}

          <Button
            variant="primary"
            size="lg"
            className="mt-6 w-full"
            onClick={handleCheckout}
          >
            Proceed to Checkout
            <ArrowRight size={16} />
          </Button>
          <p className="mt-4 text-center text-xs text-stone">
            Estimated arrival in 30–45 minutes · Orders prepared fresh on order.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}