import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import AnimatedImage from "@/components/animations/AnimatedImage";
import Reveal from "@/components/animations/Reveal";

const stats = [
  { value: "15+", label: "Years of flavor" },
  { value: "40+", label: "Signature dishes" },
  { value: "12k+", label: "Happy guests" },
];

export default function AboutPreview() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="about-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagery */}
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full border border-terracotta/25"
            />
            <AnimatedImage
              src={images.restaurantInterior}
              alt="Inside the iFOODS dining room"
              width={960}
              height={1080}
              rounded="rounded-[2rem]"
              priority
              className="aspect-[4/4.5] lg:aspect-[9/10] shadow-lifted"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-charcoal px-6 py-5 text-cream-light shadow-lifted sm:-right-6">
              <p className="font-serif text-4xl text-terracotta-light">15+</p>
              <p className="mt-1 text-sm text-cream-light/70">
                Years of culinary artistry
              </p>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="max-w-xl">
            <Reveal as="span" className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-terracotta" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
                Our Story
              </span>
              <span className="h-px w-8 bg-terracotta" />
            </Reveal>
            <Reveal as="h2" id="about-heading" delay={0.06} className="mt-5">
              <span className="text-balance font-serif text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                A modern kitchen with a warm, timeless soul
              </span>
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 text-start">
              <span className="leading-relaxed text-stone-dark sm:text-lg">
                {siteConfig.description} Every plate that leaves our pass is a
                small conversation between local farmers, bold technique, and
                the people around the table.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-4 text-start">
              <span className="leading-relaxed text-stone-dark">
                Whether it&apos;s a quiet Tuesday dinner or a city-wide
                celebration, we aim to make the moment taste as good as it
                looks.
              </span>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 grid grid-cols-3 gap-6 border-y border-beige py-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-terracotta sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-stone-dark sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.26} className="mt-8">
              <Button href="/about" variant="secondary">
                Discover More
                <ArrowRight size={16} />
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}