import { ArrowRight, BadgePercent, CalendarDays } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";

interface Offer {
  title: string;
  description: string;
  discount: string;
  validity: string;
  image: string;
  ctaLabel: string;
  href: string;
  featured?: boolean;
}

const offers: Offer[] = [
  {
    title: "Family Dinner Night",
    description:
      "Four sharing starters, two wood-fired pizzas, a tray of mains, and a carafe of house punch — the table version of a second home.",
    discount: "25% Off",
    validity: "Any evening · Tables of 4+",
    image: images.mainAbout,
    ctaLabel: "Book the Family Table",
    href: "/reservation",
    featured: true,
  },
  {
    title: "Weekend Special",
    description:
      "Two courses for two plus a bottle of house wine. Slow afternoons, warm bread, zero decisions left to make.",
    discount: "20% Off",
    validity: "Fri–Sun · 12:00 – 16:00",
    image: images.foodSpread,
    ctaLabel: "Book This Offer",
    href: "/reservation",
  },
  {
    title: "Lunch Combo",
    description:
      "A main, a garden side, and a house drink — built to be done well and done quickly before you're back to real life.",
    discount: "15% Off",
    validity: "Mon–Fri · 12:00 – 15:00",
    image: images.steak,
    ctaLabel: "See the Combo Menu",
    href: "/menu",
  },
  {
    title: "Chef's Special Tasting",
    description:
      "Five courses chosen that morning by the kitchen — fire, acidity, and a little theatre. Only at the first seating.",
    discount: "30% Off",
    validity: "Thu–Sat · First seating",
    image: images.salmon,
    ctaLabel: "Reserve the Tasting",
    href: "/reservation",
  },
  {
    title: "Dessert Delight",
    description:
      "Order any main and the dessert trolley comes to you on the house. Consider the molten one non-negotiable.",
    discount: "Free Dessert",
    validity: "All week · After 17:00",
    image: images.dessert,
    ctaLabel: "Browse the Menu",
    href: "/menu",
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-cream-light shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        offer.featured && "lg:col-span-2",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          offer.featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-terracotta px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream-light shadow-card">
          <BadgePercent size={14} />
          {offer.discount}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-charcoal/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-cream-light backdrop-blur">
          <CalendarDays size={13} className="text-terracotta-light" />
          {offer.validity}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col p-6", offer.featured && "sm:p-8")}>
        <h3
          className={cn(
            "font-serif text-charcoal transition-colors duration-300 group-hover:text-terracotta",
            offer.featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {offer.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-dark">
          {offer.description}
        </p>
        <div className="mt-6">
          <Button
            variant={offer.featured ? "primary" : "outline"}
            size={offer.featured ? "lg" : "md"}
            href={offer.href}
          >
            {offer.ctaLabel}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function OffersGrid() {
  return (
    <section className="bg-cream py-16 sm:py-20" aria-labelledby="offers-heading">
      <Container>
        <SectionHeading
          id="offers-heading"
          eyebrow="Seasonal Offers"
          title="Ways to Eat Well"
          description="A rotating set of favorites — grab a deal, gather the people, and let us do the rest."
        />

        <StaggerContainer
          staggerChildren={0.08}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {offers.map((offer) => (
            <StaggerItem key={offer.title} className="h-full">
              <OfferCard offer={offer} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}