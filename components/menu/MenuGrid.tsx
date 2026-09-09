"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/animations";
import type { MenuItem } from "@/data/menu";
import MenuCard from "@/components/menu/MenuCard";

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.45,
                ease: EASE,
                delay: Math.min(index * 0.05, 0.45),
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              transition: { duration: 0.22, ease: "easeInOut" },
            }}
          >
            <MenuCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}