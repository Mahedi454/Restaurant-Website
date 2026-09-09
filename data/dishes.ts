export interface Dish {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export const featuredDishes: Dish[] = [
  {
    id: "truffle-mushroom-pasta",
    category: "Pasta",
    name: "Truffle Mushroom Pasta",
    description: "Creamy mushroom ragù, truffle oil, parmesan, and fresh herbs.",
    price: 18.9,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
  },
  {
    id: "classic-beef-burger",
    category: "Burgers",
    name: "Classic Beef Burger",
    description: "Grass-fed beef, aged cheddar, smoked bacon, and brioche.",
    price: 16.5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: "grilled-chicken-steak",
    category: "Chicken",
    name: "Grilled Chicken Steak",
    description: "Free-range chicken, herb butter, and charred greens.",
    price: 19.9,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6",
  },
  {
    id: "creamy-alfredo-pasta",
    category: "Pasta",
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine, parmesan cream, cracked pepper, and parsley.",
    price: 17.5,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
  },
  {
    id: "margherita-pizza",
    category: "Pizza",
    name: "Margherita Pizza",
    description: "San Marzano tomatoes, fresh mozzarella, and basil.",
    price: 15.8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  },
  {
    id: "grilled-salmon",
    category: "Seafood",
    name: "Grilled Salmon",
    description: "Atlantic salmon, lemon beurre blanc, and asparagus.",
    price: 24.5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
  },
  {
    id: "crispy-fried-chicken",
    category: "Chicken",
    name: "Crispy Fried Chicken",
    description: "Buttermilk-brined, honey glaze, slaw, and house sauce.",
    price: 14.9,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92",
  },
  {
    id: "chocolate-lava-cake",
    category: "Desserts",
    name: "Chocolate Lava Cake",
    description: "Molten chocolate center, vanilla gelato, and berries.",
    price: 9.5,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1762631176731-42672d735b85",
  },
];