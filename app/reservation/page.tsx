import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import ReservationForm from "@/components/reservation/ReservationForm";
import RestaurantInfo from "@/components/reservation/RestaurantInfo";
import { openGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Reserve a table at iFOODS — pick a date, time, and party size, tell us what you need, and we'll have the bread ready.",
  openGraph: openGraph(
    "Reserve a Table",
    "Reserve a table at iFOODS — pick a date, time, and party size, and we'll have the bread ready.",
  ),
};

export default function ReservationPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Reserve a Table"
        description="Ten minutes of your day, one table with your name on it. We'll keep the light warm and the bread ready."
        image="/images/reservation-1.svg"
      />
      <section className="bg-cream py-20 sm:py-24" aria-labelledby="reservation-form-heading">
        <Container>
          <SectionHeading
            id="reservation-form-heading"
            eyebrow="Book Online"
            title="Tell Us When You're Coming"
            description="Fields marked with a star are required — everything else is just a nicety."
          />
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
            <ReservationForm />
          </Reveal>
        </Container>
      </section>
      <RestaurantInfo />
    </>
  );
}