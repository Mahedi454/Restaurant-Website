import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Container from "@/components/ui/Container";
import { openGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review your order, choose a delivery address and payment method, and confirm your iFOODS order.",
  openGraph: openGraph(
    "Checkout",
    "Review your order, choose a delivery address and payment method, and confirm your iFOODS order.",
  ),
};

export default function CheckoutPage() {
  return (
    <section className="bg-cream py-10 lg:py-16">
      <Container>
        <CheckoutForm />
      </Container>
    </section>
  );
}