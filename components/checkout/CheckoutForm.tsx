"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  MapPin,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  FieldWrapper,
  FormInput,
  FormTextArea,
} from "@/components/ui/FormFields";
import { EASE } from "@/lib/animations";
import { useMounted } from "@/lib/useMounted";
import { cn } from "@/lib/utils";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  useCartDeliveryFee,
  useCartItems,
  useCartStore,
  useCartSubtotal,
  useCartTotal,
} from "@/store";

const paymentMethods = [
  {
    value: "cash",
    label: "Cash on delivery",
    hint: "Pay when your order arrives at your door.",
    Icon: Banknote,
  },
  {
    value: "card",
    label: "Card",
    hint: "Frontend demonstration — no payment is processed.",
    Icon: CreditCard,
  },
  {
    value: "mobile",
    label: "Mobile payment",
    hint: "Scan or pay in-app. Also a frontend demonstration.",
    Icon: Smartphone,
  },
] as const;

type PaymentMethod = (typeof paymentMethods)[number]["value"];

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your street address"),
  city: z.string().trim().min(2, "Enter your city"),
  postalCode: z.string().trim().min(3, "Enter a valid postal code"),
  notes: z.string().max(300, "Keep it under 300 characters").optional(),
});

type CheckoutInput = z.input<typeof checkoutSchema>;
type CheckoutValues = z.output<typeof checkoutSchema>;

interface OrderValues extends CheckoutValues {
  paymentMethod: PaymentMethod;
}

const defaultValues: CheckoutValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

const transition = { duration: 0.45, ease: EASE };

function createOrderNumber() {
  return `iFD-${Date.now().toString(36).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`;
}

export default function CheckoutForm() {
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const deliveryFee = useCartDeliveryFee();
  const total = useCartTotal();
  const clearCart = useCartStore((state) => state.clear);
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput, unknown, CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const [confirmed, setConfirmed] = useState<OrderValues | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const onSubmit = async (values: CheckoutValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setOrderNumber(createOrderNumber());
    setConfirmed({ ...values, paymentMethod });
    clearCart();
    reset(defaultValues);
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (!mounted || (!confirmed && items.length === 0)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-beige/60">
          <ShoppingBag size={36} className="text-stone" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-charcoal sm:text-4xl">
          Nothing to check out yet
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-stone-dark">
          Your cart is empty. Browse the menu and add a few dishes to get
          started — orders over $40 ship with free delivery.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="lg" href="/menu">
            Browse the Menu
            <ArrowRight size={16} />
          </Button>
          <Button variant="outline" size="lg" href="/cart">
            Back to cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {confirmed ? (
          <motion.section
            key="confirmation"
            role="status"
            aria-labelledby="order-confirmed-heading"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -12 }}
            transition={transition}
            className="mx-auto max-w-2xl rounded-3xl border border-beige bg-cream-light p-8 text-center shadow-soft sm:p-12"
          >
            <motion.span
              initial={reduceMotion ? false : { scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 14,
                delay: 0.15,
              }}
              className="mx-auto flex size-16 items-center justify-center rounded-full bg-terracotta/10 text-terracotta"
            >
              <CheckCircle2 size={32} />
            </motion.span>
            <h1
              id="order-confirmed-heading"
              className="mt-6 font-serif text-3xl text-charcoal sm:text-4xl"
            >
              Order Confirmed
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-dark">
              Thank you,{" "}
              <span className="font-medium text-charcoal">{confirmed.name}</span>.
              Your order is being prepared and will arrive in 30–45 minutes.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-terracotta">
              Order number · {orderNumber}
            </p>

            <dl className="mx-auto mt-7 grid max-w-lg grid-cols-1 gap-3 rounded-2xl border border-beige bg-cream p-5 text-left sm:grid-cols-2">
              {[
                ["Deliver to", `${confirmed.address}, ${confirmed.postalCode} ${confirmed.city}`],
                [
                  "Payment",
                  paymentMethods.find((method) => method.value === confirmed.paymentMethod)
                    ?.label ?? confirmed.paymentMethod,
                ],
                ["Phone", confirmed.phone],
                ["Email", confirmed.email],
              ].map(([label, value]) => (
                <div key={label} className="space-y-1">
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>

            {confirmed.notes ? (
              <p className="mx-auto mt-4 max-w-md text-sm text-stone-dark">
                <span className="font-medium text-charcoal">Order notes:</span>{" "}
                {confirmed.notes}
              </p>
            ) : null}

            <p className="mt-6 text-xs text-stone">
              This is a frontend demonstration. No payment was processed and no
              real order was placed.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="lg" href="/menu">
                Order Again
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" href="/">
                Back to Home
              </Button>
            </div>
          </motion.section>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={transition}
            className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_24rem]"
          >
            <div className="lg:col-span-2">
              <h1 className="font-serif text-3xl text-charcoal sm:text-4xl">
                Checkout
              </h1>
              <p className="mt-2 text-sm text-stone-dark">
                Almost there — confirm your details and place the order.
              </p>
            </div>
            <div className="space-y-10">
              <section className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-8">
                <h2 className="flex items-center gap-3 font-serif text-xl text-charcoal">
                  <span className="flex size-8 items-center justify-center rounded-full bg-terracotta/10 text-sm tabular-nums text-terracotta">
                    1
                  </span>
                  Your details
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FieldWrapper
                    label="Full Name"
                    htmlFor="checkout-name"
                    error={errors.name?.message}
                    required
                  >
                    <FormInput
                      id="checkout-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      {...register("name")}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Email"
                    htmlFor="checkout-email"
                    error={errors.email?.message}
                    required
                  >
                    <FormInput
                      id="checkout-email"
                      type="email"
                      autoComplete="email"
                      placeholder="alex@example.com"
                      {...register("email")}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Phone"
                    htmlFor="checkout-phone"
                    error={errors.phone?.message}
                    required
                    className="sm:col-span-2"
                  >
                    <FormInput
                      id="checkout-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 012-3456"
                      {...register("phone")}
                    />
                  </FieldWrapper>
                </div>
              </section>

              <section className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-8">
                <h2 className="flex items-center gap-3 font-serif text-xl text-charcoal">
                  <span className="flex size-8 items-center justify-center rounded-full bg-terracotta/10 text-sm tabular-nums text-terracotta">
                    2
                  </span>
                  <MapPin size={18} className="text-terracotta" />
                  Delivery address
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FieldWrapper
                    label="Address"
                    htmlFor="checkout-address"
                    error={errors.address?.message}
                    required
                    className="sm:col-span-2"
                  >
                    <FormInput
                      id="checkout-address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="128 Riverside Avenue"
                      {...register("address")}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="City"
                    htmlFor="checkout-city"
                    error={errors.city?.message}
                    required
                  >
                    <FormInput
                      id="checkout-city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Downtown"
                      {...register("city")}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Postal code"
                    htmlFor="checkout-postal"
                    error={errors.postalCode?.message}
                    required
                  >
                    <FormInput
                      id="checkout-postal"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="10001"
                      inputMode="numeric"
                      {...register("postalCode")}
                    />
                  </FieldWrapper>
                </div>
              </section>

              <section className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-8">
                <h2 className="flex items-center gap-3 font-serif text-xl text-charcoal">
                  <span className="flex size-8 items-center justify-center rounded-full bg-terracotta/10 text-sm tabular-nums text-terracotta">
                    3
                  </span>
                  Payment method
                </h2>
                <fieldset className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <legend className="sr-only">Choose your payment method</legend>
                  {paymentMethods.map(({ value, label, hint, Icon }) => (
                    <label
                      key={value}
                      className={cn(
                        "relative flex cursor-pointer flex-col gap-3 rounded-2xl border bg-cream px-4 py-4 transition-colors duration-300 focus-within:ring-2 focus-within:ring-terracotta/40",
                        paymentMethod === value
                          ? "border-terracotta bg-terracotta/5"
                          : "border-beige hover:border-charcoal/25",
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={paymentMethod === value}
                        onChange={() => setPaymentMethod(value)}
                        className="sr-only"
                      />
                      <span className="flex items-center justify-between">
                        <Icon
                          size={22}
                          className={cn(
                            "transition-colors",
                            paymentMethod === value
                              ? "text-terracotta"
                              : "text-stone",
                          )}
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                            paymentMethod === value
                              ? "border-terracotta"
                              : "border-stone/40",
                          )}
                        >
                          <span
                            className={cn(
                              "size-2.5 rounded-full bg-terracotta transition-transform duration-300",
                              paymentMethod === value
                                ? "scale-100"
                                : "scale-0",
                            )}
                          />
                        </span>
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-charcoal">
                          {label}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-stone-dark">
                          {hint}
                        </span>
                      </span>
                    </label>
                  ))}
                </fieldset>
              </section>

              <section className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-8">
                <h2 className="flex items-center gap-3 font-serif text-xl text-charcoal">
                  <span className="flex size-8 items-center justify-center rounded-full bg-terracotta/10 text-sm tabular-nums text-terracotta">
                    4
                  </span>
                  Order notes
                </h2>
                <div className="mt-5">
                  <FieldWrapper
                    label="Notes for the kitchen"
                    htmlFor="checkout-notes"
                    error={errors.notes?.message}
                  >
                    <FormTextArea
                      id="checkout-notes"
                      rows={4}
                      placeholder="Allergies, delivery instructions, or contactless drop-off…"
                      {...register("notes")}
                    />
                  </FieldWrapper>
                </div>
              </section>
            </div>

            <aside
              aria-label="Order summary"
              className="lg:sticky lg:top-28"
            >
              <div className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-7">
                <h2 className="font-serif text-xl text-charcoal">Order Summary</h2>

                <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <span className="relative block size-14 shrink-0 overflow-hidden rounded-xl bg-beige/50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <Link
                          href={`/menu/${item.id}`}
                          className="block truncate text-sm font-medium text-charcoal transition-colors hover:text-terracotta"
                        >
                          {item.name}
                        </Link>
                        <span className="text-xs text-stone-dark">
                          × {item.quantity}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-medium tabular-nums text-charcoal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 space-y-3 border-t border-beige pt-5 text-sm">
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
                    <dt className="text-base font-semibold text-charcoal">
                      Total
                    </dt>
                    <dd className="font-serif text-2xl tabular-nums text-terracotta">
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
                      more to unlock free delivery.{" "}
                      <span className="font-medium text-charcoal">
                        Delivery is ${DELIVERY_FEE.toFixed(2)} otherwise.
                      </span>
                  </p>
                ) : (
                  <p className="mt-4 rounded-xl bg-terracotta/10 px-4 py-2.5 text-xs font-medium text-terracotta-dark">
                    You&apos;ve unlocked free delivery!
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-terracotta px-8 text-base font-medium tracking-wide text-cream-light shadow-glow transition-all duration-300 hover:bg-terracotta-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Placing order…
                    </>
                  ) : (
                    <>
                      Place Order · ${total.toFixed(2)}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-stone">
                  Estimated arrival in 30–45 minutes · Frontend demonstration.
                </p>
              </div>
            </aside>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}