import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export default function Categories() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="categories-heading">
      <Container>
        <SectionHeading
          id="categories-heading"
          eyebrow="Explore the Menu"
          title="Browse by Category"
          description="From slow-morning breakfasts to late-night sweets — every craving has a home here."
        />

        <StaggerContainer className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {categories.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href="/menu"
                className="group relative block overflow-hidden rounded-xl bg-cream-light shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent transition-opacity duration-300 group-hover:from-charcoal/80" />
                  <span className="absolute right-3 top-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-cream-light/90 text-charcoal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-serif text-lg text-cream-light">
                    {category.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cream-light/70">
                    {category.description}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}