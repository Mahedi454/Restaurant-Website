"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import QuantityControl from "@/components/cart/QuantityControl";
import { Button } from "@/components/ui/Button";
import {
  FREE_DELIVERY_THRESHOLD,
  useCartDeliveryFee,
  useCartItems,
  useCartStore,
  useCartSubtotal,
  useCartTotal,
  useUiStore,
} from "@/store";
import { EASE } from "@/lib/animations";
import { useFocusTrap } from "@/lib/useFocusTrap";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE, delay: 0.08 + custom * 0.05 },
  }),
  exit: {
    opacity: 0,
    x: 48,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

export default function CartDrawer() {
  const open = useUiStore((state) => state.cartOpen);
  const closeCart = useUiStore((state) => state.closeCart);
  const dialogRef = useRef<HTMLDivElement>(null);
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const deliveryFee = useCartDeliveryFee();
  const total = useCartTotal();
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const reduceMotion = useReducedMotion();

  useFocusTrap(dialogRef, open);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeCart]);

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal,
  );

  return (
    <AnimatePresence>
      {open ? (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[90]"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={closeCart}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream-light shadow-lifted"
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { duration: 0.4, ease: EASE } }}
            exit={{ x: "100%", transition: { duration: 0.3, ease: EASE } }}
          >
            <header className="flex items-center justify-between border-b border-beige px-6 py-5">
              <h2 className="font-serif text-xl text-charcoal">
                Your Cart{" "}
                <span className="ml-1 text-base font-sans text-stone">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex size-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
              >
                <X size={22} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-beige/60">
                  <ShoppingBag size={30} className="text-stone" />
                </div>
                <div>
                  <p className="font-serif text-xl text-charcoal">Your cart is empty</p>
                  <p className="mt-1 text-sm text-stone-dark">
                    Add a few dishes and they&apos;ll appear here.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="mt-2"
                  onClick={closeCart}
                  href="/menu"
                >
                  Browse the Menu
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-beige overflow-y-auto px-6">
                  <AnimatePresence initial={false} mode="popLayout">
                    {items.map((item, index) => (
                      <motion.li
                        key={item.id}
                        layout
                        variants={reduceMotion ? undefined : itemVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex gap-4 py-4"
                      >
                        <Link
                          href={`/menu/${item.id}`}
                          onClick={closeCart}
                          className="relative block size-20 shrink-0 overflow-hidden rounded-xl bg-beige/50"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/menu/${item.id}`}
                              onClick={closeCart}
                              className="min-w-0 truncate font-medium text-charcoal transition-colors hover:text-terracotta"
                            >
                              {item.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                              className="shrink-0 rounded-full p-1 text-stone transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <QuantityControl
                              size="sm"
                              value={item.quantity}
                              onDecrease={() => decreaseQuantity(item.id)}
                              onIncrease={() => increaseQuantity(item.id)}
                              label={`Quantity of ${item.name}`}
                            />
                            <span className="shrink-0 font-serif text-base text-charcoal">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-beige px-6 pb-6 pt-4">
                  {remainingForFreeDelivery > 0 ? (
                    <p className="mb-3 rounded-xl bg-beige/50 px-4 py-2.5 text-xs text-stone-dark">
                      Add{" "}
                      <span className="font-semibold text-terracotta">
                        ${remainingForFreeDelivery.toFixed(2)}
                      </span>{" "}
                      more for free delivery.
                    </p>
                  ) : (
                    <p className="mb-3 rounded-xl bg-terracotta/10 px-4 py-2.5 text-xs font-medium text-terracotta-dark">
                      You&apos;ve unlocked free delivery!
                    </p>
                  )}
                  <dl className="space-y-2 text-sm">
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
                    <div className="flex items-center justify-between border-t border-beige pt-2">
                      <dt className="text-base font-semibold text-charcoal">Total</dt>
                      <dd className="font-serif text-xl text-terracotta">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={total.toFixed(2)}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="inline-block tabular-nums"
                          >
                            ${total.toFixed(2)}
                          </motion.span>
                        </AnimatePresence>
                      </dd>
                    </div>
                  </dl>
                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-5 w-full"
                    onClick={closeCart}
                    href="/checkout"
                  >
                    Checkout
                    <ArrowRight size={16} />
                  </Button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-sm font-medium text-stone-dark transition-colors hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light rounded-full"
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}