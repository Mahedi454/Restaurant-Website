import { Clock, PhoneCall } from "lucide-react";
import { openingHours } from "@/data/hours";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export default function OpeningHours() {
  return (
    <section className="bg-beige/40 py-20 sm:py-24" aria-labelledby="hours-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="hours-heading"
            align="left"
            eyebrow="When to Find Us"
            title="Opening Hours"
            description="Seven days a week, from a slow first coffee to a last glass by the bar."
          />
          <div className="lg:justify-self-end">
            <StaggerContainer className="flex flex-col gap-4">
              {openingHours.map((row) => (
                <StaggerItem key={row.days}>
                  <article className="group flex items-center justify-between gap-4 rounded-2xl bg-cream-light px-6 py-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
                    <div className="flex items-center gap-4">
                      <span className="flex size-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta transition-colors duration-300 group-hover:bg-terracotta group-hover:text-cream-light">
                        <Clock size={19} />
                      </span>
                      <div>
                        <h3 className="font-medium text-charcoal">{row.days}</h3>
                        {row.note ? (
                          <p className="mt-0.5 text-xs text-stone-dark">
                            {row.note}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-charcoal sm:text-base">
                        {row.time}
                      </span>
                      {row.note ? <Badge variant="accent">Offers</Badge> : null}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-stone-dark transition-colors hover:text-terracotta"
            >
              <PhoneCall size={15} />
              Prefer to call? {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}