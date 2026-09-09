"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "@/components/ui/Toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "Almost there!",
      description: "You're on the list. Welcome to iFOODS.",
      variant: "success",
    });
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="h-12 w-full min-w-0 rounded-full border border-cream-light/20 bg-cream-light/5 px-5 text-sm text-cream-light placeholder:text-cream-light/40 outline-none transition-colors focus:border-terracotta-light focus-visible:ring-2 focus-visible:ring-terracotta-light/50"
      />
      <button
        type="submit"
        className="h-12 shrink-0 rounded-full bg-terracotta px-6 text-sm font-medium text-cream-light transition-colors hover:bg-terracotta-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-light focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
      >
        Join
      </button>
    </form>
  );
}