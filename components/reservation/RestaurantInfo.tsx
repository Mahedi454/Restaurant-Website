import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import HoursCard from "@/components/ui/HoursCard";
import { siteConfig } from "@/data/site";

const details = [
  {
    Icon: MapPin,
    title: "Find Us",
    lines: [siteConfig.address, "Downtown, by the river"],
  },
  {
    Icon: Phone,
    title: "Call Us",
    lines: [siteConfig.phone, "For takeaways & big parties"],
  },
  {
    Icon: Mail,
    title: "Email Us",
    lines: [siteConfig.email, "We reply within a day"],
  },
];

export default function RestaurantInfo() {
  return (
    <section className="bg-cream-light py-20 sm:py-24" aria-labelledby="restaurant-info-heading">
      <Container>
        <SectionHeading
          id="restaurant-info-heading"
          eyebrow="Good to Know"
          title="Restaurant Information"
          description="The practical details — here's where we are and when the kitchen's alive."
        />

        <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {details.map(({ Icon, title, lines }, index) => (
              <Reveal key={title} delay={index * 0.08} className="flex">
                <div className="flex w-full flex-col rounded-2xl border border-beige bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-charcoal text-cream-light">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-charcoal">{title}</h3>
                  <p className="mt-2 text-sm font-medium text-charcoal">
                    {lines[0]}
                  </p>
                  <p className="mt-1 text-sm text-stone-dark">{lines[1]}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24} className="flex flex-col gap-5">
            <HoursCard />
            <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6">
              <p className="text-sm leading-relaxed text-stone-dark">
                Prefer something more private?{" "}
                <a
                  href={`mailto:${siteConfig.email}?subject=Private%20dining%20enquiry`}
                  className="font-medium text-terracotta underline-offset-4 transition-colors hover:text-terracotta-dark hover:underline"
                >
                  Ask about private dining
                </a>{" "}
                for events, celebrations, and tables for more than twenty.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}