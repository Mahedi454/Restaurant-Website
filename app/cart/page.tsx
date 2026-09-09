import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CartPageClient from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the dishes in your iFOODS cart, adjust quantities, and see your delivery total before checking out.",
};

export default function CartPage() {
  return (
    <section className="bg-cream py-10 lg:py-16" aria-labelledby="cart-heading">
      <Container>
        <CartPageClient />
      </Container>
    </section>
  );
}