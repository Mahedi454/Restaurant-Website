"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { FieldWrapper, FormInput, FormTextArea } from "@/components/ui/FormFields";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.length >= 7,
      "Enter a valid phone number",
    ),
  subject: z.string().trim().min(3, "Give your message a subject"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(2000, "Keep your message under 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });
  const [sent, setSent] = useState<ContactFormValues | null>(null);
  const reduceMotion = useReducedMotion();

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSent(values);
  };

  const handleReset = () => {
    reset(defaultValues);
    setSent(null);
  };

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -12 }}
            transition={transition}
            className="flex h-full min-h-96 flex-col items-center justify-center rounded-3xl border border-beige bg-cream-light p-8 text-center shadow-soft"
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
              className="flex size-16 items-center justify-center rounded-full bg-terracotta/10 text-terracotta"
            >
              <CheckCircle2 size={32} />
            </motion.span>
            <h3 className="mt-6 font-serif text-3xl text-charcoal">
              Message sent!
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-dark">
              Thanks, <span className="font-medium text-charcoal">{sent.name}</span>. Your
              message about &ldquo;{sent.subject}&rdquo; is on its way — we&apos;ll
              reply to <span className="font-medium text-charcoal">{sent.email}</span>{" "}
              within a day.
            </p>
            <p className="mt-5 text-xs text-stone">
              Frontend demo — no email was actually sent.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-7 rounded-full text-sm font-medium text-terracotta underline-offset-4 transition-colors hover:text-terracotta-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light"
            >
              Send another message
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
                label="Name"
                htmlFor="contact-name"
                error={errors.name?.message}
                required
              >
                <FormInput
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  {...register("name")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Email"
                htmlFor="contact-email"
                error={errors.email?.message}
                required
              >
                <FormInput
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@example.com"
                  {...register("email")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Phone"
                htmlFor="contact-phone"
                error={errors.phone?.message}
              >
                <FormInput
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 012-3456"
                  {...register("phone")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Subject"
                htmlFor="contact-subject"
                error={errors.subject?.message}
                required
              >
                <FormInput
                  id="contact-subject"
                  type="text"
                  placeholder="Reservation, event, feedback…"
                  {...register("subject")}
                />
              </FieldWrapper>
              <FieldWrapper
                label="Message"
                htmlFor="contact-message"
                error={errors.message?.message}
                required
                className="sm:col-span-2"
              >
                <FormTextArea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell us everything…"
                  {...register("message")}
                  className="min-h-40"
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
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}