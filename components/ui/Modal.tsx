"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  closeOnBackdrop?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  className,
  closeOnBackdrop = true,
}: ModalProps) {
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousActiveRef.current = document.activeElement as HTMLElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 cursor-default bg-charcoal/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-cream-light shadow-lifted",
              className,
            )}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-colors hover:bg-terracotta hover:text-cream-light"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            {title ? (
              <div className="border-b border-beige px-6 py-5 sm:px-8">
                <h3 className="text-xl text-charcoal">{title}</h3>
              </div>
            ) : null}
            <div className="px-6 py-6 sm:px-8">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}