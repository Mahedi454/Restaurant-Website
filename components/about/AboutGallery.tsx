import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedImage from "@/components/animations/AnimatedImage";
import { images } from "@/data/images";

const tiles = [
  {
    src: images.foodSpread,
    alt: "Seasonal sharing board on the pass",
    className: "col-span-2 row-span-2 aspect-square",
  },
  {
    src: images.steak,
    alt: "Dry-aged ribeye finished with herb butter",
    className: "aspect-square",
  },
  {
    src: images.kitchen,
    alt: "The open kitchen mid-service",
    className: "aspect-square",
  },
  {
    src: images.pizza,
    alt: "Wood-fired margherita pizza leaving the oven",
    className: "col-span-2 aspect-[2/1]",
  },
  {
    src: images.salmon,
    alt: "Grilled salmon with charred lemon",
    className: "col-span-2 aspect-[2/1] sm:col-span-1 sm:aspect-square",
  },
];

export default function AboutGallery() {
  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="gallery-heading">
      <Container>
        <SectionHeading
          id="gallery-heading"
          eyebrow="Inside the House"
          title="Scenes From the Restaurant"
          description="A few frames from the dining room, the bar, and the pass."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {tiles.map((tile) => (
            <AnimatedImage
              key={tile.src}
              src={tile.src}
              alt={tile.alt}
              width={960}
              height={720}
              rounded="rounded-3xl"
              className={tile.className}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}