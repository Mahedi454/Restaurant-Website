import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import PromoBanner from "@/components/home/PromoBanner";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ChefSection from "@/components/home/ChefSection";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import ReservationCTA from "@/components/home/ReservationCTA";
import OpeningHours from "@/components/home/OpeningHours";
import LocationSection from "@/components/home/LocationSection";
import { openGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "iFOODS — Modern Dining",
  },
  description:
    "iFOODS is a premium city restaurant serving contemporary dishes from seasonal ingredients — order delivery, reserve a table, or explore the full menu.",
  openGraph: openGraph("Modern Dining", "Modern dining, timeless hospitality."),
};

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedMenu />
      <PromoBanner />
      <AboutPreview />
      <WhyChooseUs />
      <ChefSection />
      <Testimonials />
      <GalleryPreview />
      <ReservationCTA />
      <OpeningHours />
      <LocationSection />
    </>
  );
}