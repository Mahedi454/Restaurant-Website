import { Clock3, CookingPot, Leaf, Sofa } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const reasons = [
  {
    Icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "Produce is sourced daily from local farms and trusted suppliers, so every plate begins with something good.",
  },
  {
    Icon: CookingPot,
    title: "Expert Chefs",
    description:
      "Our kitchen team blends classical training with modern technique — seasoning every detail with care.",
  },
  {
    Icon: Sofa,
    title: "Cozy Atmosphere",
    description:
      "Soft light, warm wood, and thoughtful music set the scene for long conversations and lingering desserts.",
  },
  {
    Icon: Clock3,
    title: "Fast Service",
    description:
      "Swift, attentive table service without ever feeling rushed — in and out in time for the show, or lounge for hours.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-cream-light py-20 sm:py-24" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="The iFOODS Difference"
          title="Why Guests Choose Us"
          description="Four quiet promises behind every visit."
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ Icon, title, description }) => (
            <StaggerItem key={title}>
              <article className="group h-full rounded-2xl border border-beige bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:bg-cream-light hover:shadow-card">
                <span className="flex size-12 items-center justify-center rounded-xl bg-charcoal text-cream-light transition-colors duration-300 group-hover:bg-terracotta">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-charcoal">
                  {title}
                </h3>
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