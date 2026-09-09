import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import MenuFilter from "@/components/menu/MenuFilter";
import { openGraph } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Our Menu",
  description:
    "Browse the full iFOODS menu — breakfast, starters, mains, burgers, pizza, pasta, seafood, chicken, desserts, and drinks. Search, filter, and add your favorites to the cart.",
  openGraph: openGraph(
    "Our Menu",
    "Browse the full iFOODS menu — search, filter, and add your favorites to the cart.",
  ),
};

interface MenuPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <section className="relative flex min-h-[62vh] items-center overflow-hidden bg-charcoal text-center text-cream-light">
        <Image
          src={images.foodSpread}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/40" />
        <Container className="relative py-20 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal
              as="span"
              className="inline-flex items-center justify-center gap-3"
            >
              <span className="h-px w-8 bg-terracotta-light" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta-light">
                Taste the Craft
              </span>
              <span className="h-px w-8 bg-terracotta-light" />
            </Reveal>
            <Reveal
              as="h1"
              delay={0.08}
              className="mt-5 text-balance font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
            >
              The Menu
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-5">
              <span className="mx-auto block max-w-2xl text-base leading-relaxed text-cream-light/75 sm:text-lg">
                Thirty dishes crafted daily from seasonal ingredients — search,
                filter by craving, and build your order in a few taps.
              </span>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-24 pt-2">
        <Container>
          <MenuFilter initialCategory={category} />
        </Container>
      </section>
    </>
  );
}