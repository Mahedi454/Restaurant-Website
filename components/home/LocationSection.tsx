import { Mail, MapPin, Navigation, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const directionsHref = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`;

export default function LocationSection() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="location-heading">
      <Container>
        <SectionHeading
          id="location-heading"
          eyebrow="Find Us"
          title="Visit the Lounge"
          description="Tucked a street off the riverside — easy to find, hard to forget."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <StaggerContainer className="flex flex-col gap-4 lg:col-span-2">
            {[
              {
                Icon: MapPin,
                label: "Address",
                value: siteConfig.address,
              },
              {
                Icon: PhoneCall,
                label: "Phone",
                value: siteConfig.phone,
                href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
              },
              {
                Icon: Mail,
                label: "Email",
                value: siteConfig.email,
                href: `mailto:${siteConfig.email}`,
              },
            ].map(({ Icon, label, value, href }) => (
              <StaggerItem key={label}>
                <div className="flex items-start gap-4 rounded-2xl bg-cream-light p-6 shadow-soft transition-shadow duration-300 hover:shadow-card">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-charcoal text-cream-light">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-dark">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-lg text-charcoal transition-colors hover:text-terracotta"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg text-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerItem className="lg:col-span-3">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-beige bg-beige/50 shadow-soft">
              {/* Map grid pattern */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(26,26,26,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,26,0.07)_1px,transparent_1px)] [background-size:3rem_3rem]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-16 top-10 size-64 rounded-full bg-terracotta/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -right-16 bottom-6 size-72 rounded-full bg-charcoal/5 blur-3xl"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="relative flex size-12 items-center justify-center rounded-full bg-terracotta text-cream-light shadow-glow">
                  <MapPin size={22} />
                  <span className="absolute inset-0 animate-ping rounded-full bg-terracotta/40" />
                </span>
                <p className="mt-4 font-serif text-xl text-charcoal">
                  {siteConfig.name}
                </p>
                <p className="mt-1 max-w-xs text-sm text-stone-dark">
                  {siteConfig.address}
                </p>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-charcoal px-6 text-sm font-medium text-cream-light transition-colors duration-300 hover:bg-charcoal-soft"
                >
                  <Navigation size={15} />
                  Get Directions
                </a>
              </div>
            </div>
          </StaggerItem>
        </div>
      </Container>
    </section>
  );
}