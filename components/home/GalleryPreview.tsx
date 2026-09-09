"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { galleryImages } from "@/data/gallery";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export default function GalleryPreview() {
  const [active, setActive] = useState<number | null>(null);
  const activeImage = active !== null ? galleryImages[active] : null;

  return (
    <section className="bg-cream py-20 sm:py-24" aria-labelledby="gallery-heading">
      <Container>
        <SectionHeading
          id="gallery-heading"
          eyebrow="Moments in Plates"
          title="A Look Inside"
          description="Snapshots from the pass, the bar, and the tables in between."
        />

        <StaggerContainer
          staggerChildren={0.06}
          className="mt-12 grid grid-cols-2 auto-rows-[150px] gap-3 sm:auto-rows-[180px] md:grid-cols-4 md:auto-rows-[200px] md:gap-4"
        >
          {galleryImages.map((image, index) => (
            <StaggerItem key={image.id}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(index)}
                aria-label={`Open photo: ${image.alt}`}
                className={cn(
                  "group relative block size-full overflow-hidden rounded-xl bg-cream-light",
                  index === 0 || index === 4 ? "col-span-2" : "",
                  image.placement,
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/35" />
                <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-cream-light/0 text-cream-light/0 transition-all duration-300 group-hover:bg-terracotta group-hover:text-cream-light">
                  <Plus size={16} />
                </span>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Modal
          open={activeImage !== null}
          onClose={() => setActive(null)}
          className="max-w-5xl bg-transparent p-0 shadow-none"
        >
          {activeImage ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent px-6 pb-5 pt-14">
                <p className="text-sm font-medium text-cream-light">
                  {activeImage.alt}
                </p>
              </div>
            </div>
          ) : null}
        </Modal>
      </Container>
    </section>
  );
}