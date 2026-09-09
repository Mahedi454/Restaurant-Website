export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Fluffy pancakes, fresh pastries, and slow-morning classics.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
  },
  {
    id: "starters",
    name: "Starters",
    description: "Small plates crafted to awaken the palate.",
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a",
  },
  {
    id: "main-course",
    name: "Main Course",
    description: "Hearty signatures, cooked to perfection.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Juicy, stacked, and unapologetically bold.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "Wood-fired, blistered, and full of flavor.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  },
  {
    id: "pasta",
    name: "Pasta",
    description: "Handmade pasta tossed in rich sauces.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "Fresh catches, simply and beautifully prepared.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
  },
  {
    id: "chicken",
    name: "Chicken",
    description: "Crisp, tender, and seasoned to order.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet endings worth saving room for.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Cocktails, wines, and house-made refreshers.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
  },
];