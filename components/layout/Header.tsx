"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavigation } from "@/data/navigation";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useCartCount, useUiStore } from "@/store";
import { useMounted } from "@/lib/useMounted";
import { Button } from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";

interface HeaderProps {
  showSearch?: boolean;
  showCart?: boolean;
}

export default function Header({
  showSearch = true,
  showCart = true,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const count = useCartCount();
  const mounted = useMounted();
  const openCart = useUiStore((state) => state.openCart);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isScrolled = scrolled || menuOpen;
  const navStart = reduceMotion ? undefined : { opacity: 0, y: -12 };
  const iconClasses =
    "flex size-10 items-center justify-center rounded-full transition-colors duration-300 text-charcoal hover:bg-charcoal/5";
  const navLinkClasses = (active: boolean) =>
    cn(
      "group relative mx-1 rounded-full px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
      active ? "text-terracotta" : "text-charcoal/80 hover:text-charcoal",
    );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          height: isScrolled ? 64 : 84,
        }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          isScrolled
            ? "border-b border-beige/70 bg-cream/85 shadow-soft backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[88rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <motion.div
            initial={navStart}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-10 shrink-0"
          >
            <Link
              href="/"
              aria-label="iFOODS — Home"
              className="group flex items-baseline gap-2"
            >
              <span className="font-serif text-xl transition-colors duration-300 sm:text-2xl">
                i
                <span className="text-terracotta">FOODS</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {mainNavigation.map((item, index) => {
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={navStart}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: 0.05 + index * 0.045,
                  }}
                >
                  <Link href={item.href} className={navLinkClasses(active)}>
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {showSearch ? (
              <motion.div
                initial={navStart}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.4 }}
                className="hidden sm:block"
              >
                <Link href="/menu" aria-label="Search the menu" className={iconClasses}>
                  <Search size={19} />
                </Link>
              </motion.div>
            ) : null}

            {showCart ? (
              <motion.div
                initial={navStart}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.45 }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={openCart}
                  aria-label={
                    mounted && count > 0
                      ? `Open cart, ${count} item${count === 1 ? "" : "s"}`
                      : "Open cart"
                  }
                  className={iconClasses}
                >
                  <ShoppingBag size={19} />
                  {mounted && count > 0 ? (
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={count}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-cream-light"
                      >
                        {count}
                      </motion.span>
                    </AnimatePresence>
                  ) : null}
                </button>
              </motion.div>
            ) : null}

            {/* Desktop CTA */}
            <motion.div
              initial={navStart}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
              className="ml-2 hidden lg:block"
            >
              <Button size="sm" href="/reservation">
                Reserve a Table
                <ArrowRight size={15} />
              </Button>
            </motion.div>

            {/* Mobile hamburger */}
            <motion.div
              initial={navStart}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.5 }}
              className="lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className={iconClasses}
              >
                <Menu size={21} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        showSearch={showSearch}
        showCart={showCart}
      />
    </>
  );
}