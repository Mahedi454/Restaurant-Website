import { HeartHandshake, Leaf, Sparkles, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const values = [
  {
    Icon: Leaf,
    title: "Seasonal & Honest",
    description:
      "We let the harvest write the menu. Produce arrives daily from farms we know, and we never serve what isn't at its best.",
  },
  {
    Icon: Sparkles,
    title: "Craft Over Speed",
    description:
      "Fire, acidity, and patience do the talking. Every sauce is built from scratch and every plate is finished by hand.",
  },
  {
    Icon: HeartHandshake,
    title: "Warm Hospitality",
    description:
      "Service that feels like a friend's best advice — attentive, unhurried, and genuine from the welcome to the last pour.",
  },
  {
    Icon: Users,
    title: "Gathering People",
    description:
      "A table is a small celebration. We cook for quiet Tuesdays and loud milestones alike, and treat each the same.",
  },
];

export default function ValuesGrid() {
  return (
    <section className="bg-cream-light py-20 sm:py-24" aria-labelledby="values-heading">
      <Container>
        <SectionHeading
          id="values-heading"
          eyebrow="What We Stand For"
          title="The Values We Cook By"
          description="Four quiet promises behind every plate and every visit."
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, description }) => (
            <StaggerItem key={title}>
              <article className="group h-full rounded-2xl border border-beige bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:bg-cream-light hover:shadow-card">
                <span className="flex size-12 items-center justify-center rounded-xl bg-charcoal text-cream-light transition-colors duration-300 group-hover:bg-terracotta">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-charcoal">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                  {description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}