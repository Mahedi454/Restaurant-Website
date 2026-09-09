import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import AnimatedImage from "@/components/animations/AnimatedImage";
import Reveal from "@/components/animations/Reveal";
import { images } from "@/data/images";

export default function ChefSection() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="chef-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* Portrait */}
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 h-44 w-44 rounded-full border border-terracotta/25"
            />
            <AnimatedImage
              src={images.chef}
              alt="Executive Chef Marco Reyes at iFOODS"
              width={840}
              height={1080}
              rounded="rounded-[2rem]"
              className="aspect-[7/8] shadow-lifted"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-cream-light px-5 py-4 shadow-card">
              <p className="font-serif text-lg text-charcoal">Marco Reyes</p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-terracotta">
                Executive Chef
              </p>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal as="span" className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-terracotta" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
                Meet the Chef
              </span>
              <span className="h-px w-8 bg-terracotta" />
            </Reveal>
            <Reveal as="h2" id="chef-heading" delay={0.06} className="mt-5">
              <span className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                Marco Reyes
              </span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-3">
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-terracotta">
                Executive Chef
              </span>
            </Reveal>

            <Reveal as="blockquote" delay={0.14} className="mt-6">
              <div className="border-l-2 border-terracotta pl-5 font-serif text-xl italic leading-snug text-charcoal sm:text-2xl">
                “Good food is honest. I want every plate to feel like it was
                made for the one person sitting in front of it.”
              </div>
            </Reveal>

            <Reveal as="p" delay={0.18} className="mt-6 text-start">
              <span className="leading-relaxed text-stone-dark">
                Marco trained across three continents before planting his
                kitchen at iFOODS. His style is direct and seasonal — fire,
                acidity, and patience doing the talking. He began in a family
                trattoria at fourteen and still visits every market stall before
                writing each week&apos;s specials.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.22} className="mt-4 text-start">
              <span className="leading-relaxed text-stone-dark">
                Under his lead, the kitchen has earned a reputation for dishes
                that feel both familiar and quietly surprising.
              </span>
            </Reveal>

            <Reveal delay={0.28} className="mt-8 flex flex-wrap items-center gap-3">
              <Badge variant="outline">15+ Years Experience</Badge>
              <Badge variant="outline">3 Continents Trained</Badge>
              <Badge variant="accent">Featured in City Eats</Badge>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}