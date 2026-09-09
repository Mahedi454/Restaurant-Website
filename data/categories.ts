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
    image: "/images/cat-breakfast.svg",
  },
  {
    id: "starters",
    name: "Starters",
    description: "Small plates crafted to awaken the palate.",
    image: "/images/cat-starters.svg",
  },
  {
    id: "main-course",
    name: "Main Course",
    description: "Hearty signatures, cooked to perfection.",
    image: "/images/cat-mains.svg",
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Juicy, stacked, and unapologetically bold.",
    image: "/images/cat-burgers.svg",
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "Wood-fired, blistered, and full of flavor.",
    image: "/images/cat-pizza.svg",
  },
  {
    id: "pasta",
    name: "Pasta",
    description: "Handmade pasta tossed in rich sauces.",
    image: "/images/cat-pasta.svg",
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "Fresh catches, simply and beautifully prepared.",
    image: "/images/cat-seafood.svg",
  },
  {
    id: "chicken",
    name: "Chicken",
    description: "Crisp, tender, and seasoned to order.",
    image: "/images/cat-chicken.svg",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet endings worth saving room for.",
    image: "/images/cat-desserts.svg",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Cocktails, wines, and house-made refreshers.",
    image: "/images/cat-drinks.svg",
  },
];