import { Navigation } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import HoursCard from "@/components/ui/HoursCard";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address} restaurant`,
)}`;

export default function MapPlaceholder() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="location-heading">
      <Container>
        <SectionHeading
          id="location-heading"
          eyebrow="Where to Find Us"
          title="On the Riverside"
          description={`Walkable from the bridge, worth the drive from anywhere else. We're at ${siteConfig.address}.`}
        />

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
          <Reveal className="flex">
            <div
              className="relative flex min-h-80 w-full flex-1 items-center justify-center overflow-hidden rounded-3xl border border-beige bg-cream-dark"
              role="img"
              aria-label={`Map placeholder showing iFOODS at ${siteConfig.address}`}
            >
              <Image
                src={images.restaurantInterior}
                alt=""
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="absolute inset-0 object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(196,93,62,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,93,62,0.08) 1px, transparent 1px)",
                  backgroundSize: "2.5rem 2.5rem",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,246,241,0.55)_70%)]" />
              <div className="relative flex flex-col items-center text-center">
                <span className="flex size-16 animate-bounce items-center justify-center rounded-full bg-terracotta text-cream-light shadow-lifted">
                  <Navigation size={26} className="-rotate-12" />
                </span>
                <p className="mt-5 font-serif text-xl text-charcoal">iFOODS</p>
                <p className="mt-1 max-w-xs text-sm text-stone-dark">
                  {siteConfig.address}
                </p>
                <Button variant="outline" size="md" className="mt-6" href={directionsUrl}>
                  Get Directions
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex">
            <div className="w-full">
              <HoursCard />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}