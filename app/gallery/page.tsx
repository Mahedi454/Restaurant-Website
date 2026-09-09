import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual tour of iFOODS — the kitchen, the bar, the dining room, and the plates. Browse the gallery and step inside.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Step Inside iFOODS"
        description="The kitchen, the bar, the dining room, and the plates that keep people coming back."
        image="/images/gallery-7.svg"
      />
      <section className="bg-cream py-16 sm:py-20" aria-label="Photo gallery">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}