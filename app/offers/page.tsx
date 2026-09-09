import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ReservationCTA from "@/components/home/ReservationCTA";
import OffersGrid from "@/components/offers/OffersGrid";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Current iFOODS offers — the Weekend Special, Family Dinner, Lunch Combo, Chef's Special Tasting, and Dessert Delight.",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Seasonal Offers"
        title="Good Food, Better Reasons"
        description="Weekend specials, family tables, lunch combos, and the chef's say-so — grab one before it rotates off."
        image="/images/gallery-2.svg"
      />
      <OffersGrid />
      <ReservationCTA />
    </>
  );
}