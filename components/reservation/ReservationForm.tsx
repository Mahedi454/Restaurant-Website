"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { FieldWrapper, FormInput, FormSelect, FormTextArea } from "@/components/ui/FormFields";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const todayISO = new Date().toISOString().slice(0, 10);

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  date: z
    .string()
    .min(1, "Choose a date")
    .refine((value) => value >= todayISO, {
      message: "The date can't be in the past",
    }),
  time: z.string().min(1, "Choose a time"),
  guests: z.coerce
    .number()
    .int("Choose a number of guests")
    .min(1, "At least one guest")
    .max(20, "For larger parties, give us a call"),
  specialRequest: z.string().max(300, "Keep it under 300 characters").optional(),
});

type ReservationFormInput = z.input<typeof reservationSchema>;
type ReservationFormValues = z.output<typeof reservationSchema>;

const defaultValues: ReservationFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  specialRequest: "",
};

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

export default function ReservationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormInput, unknown, ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues,
  });
  const [confirmed, setConfirmed] = useState<ReservationFormValues | null>(null);
  const reduceMotion = useReducedMotion();

  const onSubmit = async (values: ReservationFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setConfirmed(values);
  };

  const handleReset = () => {
    reset(defaultValues);
    setConfirmed(null);
  };

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {confirmed ? (
          <motion.div
            key="confirmation"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -12 }}
            transition={transition}
            className="rounded-3xl border border-beige bg-cream-light p-8 text-center shadow-soft sm:p-12"
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
            <h3 className="mt-6 font-serif text-3xl text-charcoal">
              Your table has been reserved.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-dark">
              Thank you, <span className="font-medium text-charcoal">{confirmed.name}</span>. We&apos;ve
              pencilled you in and can&apos;t wait to host you.
            </p>
            <dl className="mx-auto mt-7 grid max-w-md grid-cols-1 gap-3 rounded-2xl border border-beige bg-cream p-5 text-left sm:grid-cols-2">
              {[
                ["Date", formatDate(confirmed.date)],
                ["Time", confirmed.time],
                ["Guests", String(confirmed.guests)],
                ["Phone", confirmed.phone],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
            {confirmed.specialRequest ? (
              <p className="mx-auto mt-4 max-w-md text-sm text-stone-dark">
                <span className="font-medium text-charcoal">Request:</span>{" "}
                {confirmed.specialRequest}
              </p>
            ) : null}
            <p className="mt-5 text-xs text-stone">
              Frontend demo — no table was actually booked.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-7 rounded-full text-sm font-medium text-terracotta underline-offset-4 transition-colors hover:text-terracotta-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light"
            >
              Make another reservation
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={transition}
            className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FieldWrapper
                label="Full Name"
                htmlFor="reservation-name"
                error={errors.name?.message}
                required
              >
                <FormInput
                  id="reservation-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  {...register("name")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Email"
                htmlFor="reservation-email"
                error={errors.email?.message}
                required
              >
                <FormInput
                  id="reservation-email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@example.com"
                  {...register("email")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Phone"
                htmlFor="reservation-phone"
                error={errors.phone?.message}
                required
              >
                <FormInput
                  id="reservation-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 012-3456"
                  {...register("phone")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Guests"
                htmlFor="reservation-guests"
                error={errors.guests?.message}
                required
              >
                <FormSelect id="reservation-guests" {...register("guests")}>
                  {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "guest" : "guests"}
                      </option>
                    ),
                  )}
                </FormSelect>
              </FieldWrapper>
              <FieldWrapper
                label="Date"
                htmlFor="reservation-date"
                error={errors.date?.message}
                required
              >
                <FormInput
                  id="reservation-date"
                  type="date"
                  min={todayISO}
                  {...register("date")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Time"
                htmlFor="reservation-time"
                error={errors.time?.message}
                required
              >
                <FormSelect id="reservation-time" {...register("time")}>
                  <option value="">Choose a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </FormSelect>
              </FieldWrapper>
              <FieldWrapper
                label="Special Request"
                htmlFor="reservation-request"
                error={errors.specialRequest?.message}
                className="sm:col-span-2"
              >
                <FormTextArea
                  id="reservation-request"
                  rows={4}
                  placeholder="Allergies, a birthday surprise, a window seat…"
                  {...register("specialRequest")}
                  className="min-h-32"
                />
              </FieldWrapper>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-terracotta px-8 text-base font-medium tracking-wide text-cream-light shadow-glow transition-all duration-300 hover:bg-terracotta-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Reserving…
                </>
              ) : (
                <>
                  Reserve a Table
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-stone">
              We&apos;ll confirm by email within the hour.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}