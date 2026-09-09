"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/data/navigation";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useCartCount, useUiStore } from "@/store";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  showSearch?: boolean;
  showCart?: boolean;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: "0%",
    transition: { duration: 0.4, ease: EASE, when: "beforeChildren" },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.3, ease: EASE, when: "afterChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE, delay: 0.15 + custom * 0.06 },
  }),
  exit: (custom: number) => ({
    opacity: 0,
    x: 24,
    transition: { duration: 0.2, ease: "easeInOut", delay: custom * 0.02 },
  }),
};

export default function MobileMenu({
  open,
  onClose,
  showSearch = true,
  showCart = true,
}: MobileMenuProps) {
  const pathname = usePathname();
  const count = useCartCount();
  const openCart = useUiStore((state) => state.openCart);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-cream-light shadow-lifted"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between border-b border-beige px-6 py-5">
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-xl text-charcoal"
              >
                i<span className="text-terracotta">FOODS</span>
              </Link>
              <div className="flex items-center gap-1">
                {showCart ? (
                  <button
                    type="button"
                    onClick={() => {
                      openCart();
                      onClose();
                    }}
                    aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
                    className="relative flex size-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
                  >
                    <ShoppingBag size={19} />
                    {count > 0 ? (
                      <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-cream-light">
                        {count}
                      </span>
                    ) : null}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {showSearch ? (
              <motion.div
                variants={itemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-6 pt-6"
              >
                <div className="flex h-12 items-center gap-3 rounded-full border border-beige bg-cream px-4">
                  <Search size={17} className="text-stone" />
                  <input
                    type="search"
                    placeholder="Search dishes, cocktails…"
                    aria-label="Search menu"
                    className="w-full bg-transparent text-sm text-charcoal outline-none placeholder:text-stone"
                  />
                </div>
              </motion.div>
            ) : null}

            <nav
              aria-label="Mobile navigation"
              className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 py-8"
            >
              {mainNavigation.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    custom={index + (showSearch ? 1 : 0)}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-3"
                    >
                      <span
                        className={cn(
                          "font-serif text-2xl transition-colors duration-300",
                          active ? "text-terracotta" : "text-charcoal",
                        )}
                      >
                        {item.label}
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-stone opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              variants={itemVariants}
              custom={mainNavigation.length + 1 + (showSearch ? 1 : 0)}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="border-t border-beige px-6 pb-8 pt-6"
            >
              <Link
                href="/reservation"
                onClick={onClose}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-terracotta text-sm font-medium text-cream-light shadow-glow transition-colors hover:bg-terracotta-dark"
              >
                Reserve a Table
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}