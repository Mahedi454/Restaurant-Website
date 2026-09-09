import { images } from "@/data/images";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  placement: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: images.foodSpread, alt: "The seasonal spread, laid out for the whole table", placement: "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2" },
  { id: "g2", src: images.burger, alt: "Classic cheeseburger on a toasted bun", placement: "md:col-start-3 md:row-start-1 md:row-span-2" },
  { id: "g3", src: images.pasta, alt: "Truffle mushroom tagliatelle", placement: "md:col-start-4 md:row-start-1" },
  { id: "g4", src: images.dessert, alt: "Decadent chocolate dessert", placement: "md:col-start-4 md:row-start-2" },
  { id: "g5", src: images.pizza, alt: "Wood-fired margherita pizza with basil", placement: "md:col-start-1 md:col-span-2 md:row-start-3 md:row-span-2" },
  { id: "g6", src: images.coffee, alt: "A cappuccino with latte art", placement: "md:col-start-3 md:row-start-3 md:row-span-2" },
  { id: "g7", src: images.salmon, alt: "Grilled salmon fillet with herbs", placement: "md:col-start-4 md:row-start-3" },
  { id: "g8", src: images.steak, alt: "Dry-aged ribeye with herb butter", placement: "md:col-start-4 md:row-start-4" },
];