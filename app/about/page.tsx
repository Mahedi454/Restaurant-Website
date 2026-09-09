import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ChefSection from "@/components/home/ChefSection";
import ReservationCTA from "@/components/home/ReservationCTA";
import AboutStory from "@/components/about/AboutStory";
import MissionBand from "@/components/about/MissionBand";
import ValuesGrid from "@/components/about/ValuesGrid";
import StatsBand from "@/components/about/StatsBand";
import AboutGallery from "@/components/about/AboutGallery";
import { openGraph } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of iFOODS — a modern kitchen with a warm, timeless soul. Our mission, our values, our chef, and the numbers behind the neighborhood's favorite table.",
  openGraph: openGraph(
    "About Us",
    "The story of iFOODS — our mission, our values, our chef, and the numbers behind the neighborhood's favorite table.",
  ),
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About iFOODS"
        title="A modern kitchen with a warm, timeless soul"
        description="Sixteen years of seasonal cooking, honest hospitality, and one stubborn belief — dinner should feel like a celebration."
        image={images.mainAbout}
      />
      <AboutStory />
      <MissionBand />
      <ValuesGrid />
      <StatsBand />
      <ChefSection />
      <AboutGallery />
      <ReservationCTA />
    </>
  );
}