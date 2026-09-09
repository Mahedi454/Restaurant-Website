export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  placement: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/images/gallery-1.svg", alt: "Slow-cooked breakfast bowl", placement: "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2" },
  { id: "g2", src: "/images/gallery-2.svg", alt: "Stacked gourmet burger", placement: "md:col-start-3 md:row-start-1 md:row-span-2" },
  { id: "g3", src: "/images/gallery-3.svg", alt: "Grilled fillet with citrus", placement: "md:col-start-4 md:row-start-1" },
  { id: "g4", src: "/images/gallery-4.svg", alt: "Molten chocolate dessert", placement: "md:col-start-4 md:row-start-2" },
  { id: "g5", src: "/images/gallery-5.svg", alt: "Wood-fired margherita pizza", placement: "md:col-start-1 md:col-span-2 md:row-start-3 md:row-span-2" },
  { id: "g6", src: "/images/gallery-6.svg", alt: "Signature craft cocktail", placement: "md:col-start-3 md:row-start-3 md:row-span-2" },
  { id: "g7", src: "/images/gallery-7.svg", alt: "Seasonal sharing board", placement: "md:col-start-4 md:row-start-3" },
  { id: "g8", src: "/images/gallery-8.svg", alt: "Herb-roasted vegetable bowl", placement: "md:col-start-4 md:row-start-4" },
];