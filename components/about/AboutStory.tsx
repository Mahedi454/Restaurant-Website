import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import AnimatedImage from "@/components/animations/AnimatedImage";
import Reveal from "@/components/animations/Reveal";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";

const milestones = [
  { year: "2009", title: "A small stove, one room" },
  { year: "2014", title: "The tasting counter opens" },
  { year: "2019", title: "City Eats names us best newcomer" },
  { year: "2026", title: "A neighborhood, still hungry" },
];

export default function AboutStory() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="story-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full border border-terracotta/25"
            />
            <AnimatedImage
              src={images.dining}
              alt="Inside the iFOODS dining room"
              width={960}
              height={1080}
              rounded="rounded-[2rem]"
              priority
              className="aspect-[4/4.5] lg:aspect-[9/10] shadow-lifted"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-charcoal px-6 py-5 text-cream-light shadow-lifted sm:-right-6">
              <p className="font-serif text-4xl text-terracotta-light">Est.</p>
              <p className="mt-1 text-sm text-cream-light/70">2009 · Downtown</p>
            </div>
          </Reveal>

          <div className="max-w-xl">
            <Reveal as="span" className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-terracotta" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
                The Story
              </span>
              <span className="h-px w-8 bg-terracotta" />
            </Reveal>
            <Reveal as="h2" id="story-heading" delay={0.06} className="mt-5">
              <span className="text-balance font-serif text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                From a single stove to the city&apos;s favorite table
              </span>
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5">
              <span className="leading-relaxed text-stone-dark sm:text-lg">
                {siteConfig.name} began in 2009 with a single stove, a small
                room, and a stubborn belief that dinner should feel like a
                celebration. Sixteen years later, the room is bigger and the
                stove still matters more than the rest.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-4">
              <span className="leading-relaxed text-stone-dark">
                We cook with the seasons, buy from farmers we know by name, and
                pour the kind of hospitality we&apos;d want for ourselves. Every
                plate that leaves the pass is a quiet conversation between local
                ingredients, careful technique, and the people around the table.
              </span>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 border-t border-beige pt-6">
              <ol className="space-y-4">
                {milestones.map((milestone) => (
                  <li key={milestone.year} className="flex items-baseline gap-4">
                    <span className="font-serif text-lg text-terracotta">
                      {milestone.year}
                    </span>
                    <span className="text-sm text-stone-dark">
                      {milestone.title}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.26} className="mt-8">
              <Button href="/menu" variant="secondary">
                Taste the Story
                <ArrowRight size={16} />
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}