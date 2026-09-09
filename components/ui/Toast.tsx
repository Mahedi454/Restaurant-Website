"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
} as const;

const variantClasses = {
  success: "text-terracotta",
  error: "text-terracotta-dark",
  info: "text-stone-dark",
} as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (newToast: Omit<ToastItem, "id">) => {
      const id = ++nextId.current;
      setToasts((current) => [...current.slice(-3), { ...newToast, id }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-[110] flex w-full max-w-sm flex-col gap-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {toasts.map((item) => {
            const Icon = variantIcons[item.variant];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex items-start gap-3 rounded-xl border border-beige bg-cream-light p-4 shadow-card"
              >
                <Icon
                  size={20}
                  className={cn("mt-0.5 shrink-0", variantClasses[item.variant])}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-charcoal">{item.title}</p>
                  {item.description ? (
                    <p className="mt-0.5 text-sm text-stone-dark">{item.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  aria-label="Dismiss notification"
                  className="shrink-0 text-stone transition-colors hover:text-charcoal"
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}