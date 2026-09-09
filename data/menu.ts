export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  rating: number;
  featured: boolean;
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "golden-buttermilk-pancakes",
    name: "Golden Buttermilk Pancakes",
    slug: "golden-buttermilk-pancakes",
    category: "breakfast",
    description:
      "Three fluffy buttermilk pancakes stacked with whipped honey butter, warm maple syrup, and a scatter of fresh summer berries.",
    ingredients: ["Buttermilk", "Maple syrup", "Honey butter", "Fresh berries", "Vanilla"],
    price: 12.5,
    image: "/images/menu/golden-buttermilk-pancakes.svg",
    rating: 4.8,
    featured: true,
  },
  {
    id: "avocado-egg-toast",
    name: "Avocado & Egg Toast",
    slug: "avocado-egg-toast",
    category: "breakfast",
    description:
      "Charred sourdough layered with smashed avocado, poached eggs, toasted seeds, and a drizzle of chili oil.",
    ingredients: ["Sourdough", "Avocado", "Poached eggs", "Chili oil", "Toasted seeds"],
    price: 13.9,
    image: "/images/menu/avocado-egg-toast.svg",
    rating: 4.7,
    featured: false,
  },
  {
    id: "urban-breakfast-platter",
    name: "Urban Breakfast Platter",
    slug: "urban-breakfast-platter",
    category: "breakfast",
    description:
      "A generous plate of free-range eggs, herbed sausage, golden hash, sourdough toast, and roasted tomatoes.",
    ingredients: ["Free-range eggs", "Herbed sausage", "Hash browns", "Sourdough", "Roasted tomatoes"],
    price: 16.5,
    image: "/images/menu/urban-breakfast-platter.svg",
    rating: 4.9,
    featured: true,
  },

  // Starters
  {
    id: "crispy-calamari",
    name: "Crispy Calamari",
    slug: "crispy-calamari",
    category: "starters",
    description:
      "Lightly battered squid flash-fried until golden, tossed with lemon zest and served with smoky aioli.",
    ingredients: ["Squid", "Lemon zest", "Smoked paprika", "Garlic aioli", "Parsley"],
    price: 11.9,
    image: "/images/menu/crispy-calamari.svg",
    rating: 4.6,
    featured: false,
  },
  {
    id: "burrata-tomatoes",
    name: "Burrata & Heirloom Tomatoes",
    slug: "burrata-tomatoes",
    category: "starters",
    description:
      "Creamy burrata over marinated heirloom tomatoes, basil oil, aged balsamic, and sea salt.",
    ingredients: ["Burrata", "Heirloom tomatoes", "Basil oil", "Balsamic glaze", "Sea salt"],
    price: 13.5,
    image: "/images/menu/burrata-tomatoes.svg",
    rating: 4.8,
    featured: false,
  },
  {
    id: "truffle-fries",
    name: "Truffle Fries",
    slug: "truffle-fries",
    category: "starters",
    description:
      "Crisp hand-cut fries tossed in truffle oil, shaved parmesan, and fresh herbs with truffle aioli.",
    ingredients: ["Potatoes", "Truffle oil", "Parmesan", "Truffle aioli", "Chives"],
    price: 9.5,
    image: "/images/menu/truffle-fries.svg",
    rating: 4.7,
    featured: false,
  },

  // Main Course
  {
    id: "grilled-ribeye-steak",
    name: "Grilled Ribeye Steak",
    slug: "grilled-ribeye-steak",
    category: "main-course",
    description:
      "Dry-aged ribeye grilled over open flame, finished with herb butter, charred greens, and crispy shallots.",
    ingredients: ["Dry-aged ribeye", "Herb butter", "Charred greens", "Crispy shallots", "Flaky salt"],
    price: 34.5,
    image: "/images/menu/grilled-ribeye-steak.svg",
    rating: 4.9,
    featured: true,
  },
  {
    id: "herb-roasted-lamb-chops",
    name: "Herb-Roasted Lamb Chops",
    slug: "herb-roasted-lamb-chops",
    category: "main-course",
    description:
      "Rosemary and garlic marinated lamb chops, slow-roasted and served with minted pea purée.",
    ingredients: ["Lamb chops", "Rosemary", "Garlic", "Minted pea purée", "Red wine jus"],
    price: 29.9,
    image: "/images/menu/herb-roasted-lamb-chops.svg",
    rating: 4.8,
    featured: false,
  },
  {
    id: "chicken-milanese",
    name: "Chicken Milanese",
    slug: "chicken-milanese",
    category: "main-course",
    description:
      "Panko-crusted chicken breast fried golden, with arugula, shaved parmesan, and lemon-caper dressing.",
    ingredients: ["Chicken breast", "Panko", "Arugula", "Parmesan", "Lemon-caper dressing"],
    price: 21.0,
    image: "/images/menu/chicken-milanese.svg",
    rating: 4.6,
    featured: false,
  },

  // Burgers
  {
    id: "classic-beef-burger",
    name: "Classic Beef Burger",
    slug: "classic-beef-burger",
    category: "burgers",
    description:
      "Grass-fed beef patty, aged cheddar, smoked bacon, lettuce, tomato, and house sauce on a toasted brioche bun.",
    ingredients: ["Grass-fed beef", "Aged cheddar", "Smoked bacon", "Brioche bun", "House sauce"],
    price: 16.5,
    image: "/images/menu/classic-beef-burger.svg",
    rating: 4.8,
    featured: true,
  },
  {
    id: "smoky-bbq-bacon-burger",
    name: "Smoky BBQ Bacon Burger",
    slug: "smoky-bbq-bacon-burger",
    category: "burgers",
    description:
      "Double beef patty, crispy bacon, caramelized onions, BBQ glaze, and melted cheddar on a sesame bun.",
    ingredients: ["Double beef", "Bacon", "BBQ glaze", "Caramelized onions", "Cheddar"],
    price: 18.5,
    image: "/images/menu/smoky-bbq-bacon-burger.svg",
    rating: 4.7,
    featured: false,
  },
  {
    id: "crispy-chicken-burger",
    name: "Crispy Chicken Burger",
    slug: "crispy-chicken-burger",
    category: "burgers",
    description:
      "Buttermilk-brined crispy chicken, slaw, pickles, and spicy mayo on a toasted potato bun.",
    ingredients: ["Fried chicken", "Buttermilk", "Slaw", "Pickles", "Spicy mayo"],
    price: 15.9,
    image: "/images/menu/crispy-chicken-burger.svg",
    rating: 4.6,
    featured: false,
  },

  // Pizza
  {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    slug: "margherita-pizza",
    category: "pizza",
    description:
      "San Marzano tomatoes, fresh mozzarella, and basil on a wood-fired blistered crust.",
    ingredients: ["San Marzano tomatoes", "Fresh mozzarella", "Basil", "Olive oil", "Sea salt"],
    price: 15.8,
    image: "/images/menu/margherita-pizza.svg",
    rating: 4.9,
    featured: true,
  },
  {
    id: "pepperoni-honey-pizza",
    name: "Pepperoni & Honey Pizza",
    slug: "pepperoni-honey-pizza",
    category: "pizza",
    description:
      "Crispy pepperoni, tomato sauce, mozzarella, and a finishing drizzle of hot honey.",
    ingredients: ["Pepperoni", "Hot honey", "Mozzarella", "Tomato sauce", "Oregano"],
    price: 17.9,
    image: "/images/menu/pepperoni-honey-pizza.svg",
    rating: 4.8,
    featured: false,
  },
  {
    id: "truffle-mushroom-pizza",
    name: "Truffle Mushroom Pizza",
    slug: "truffle-mushroom-pizza",
    category: "pizza",
    description:
      "Wild mushrooms, truffle cream, mozzarella, and thyme on a golden wood-fired base.",
    ingredients: ["Wild mushrooms", "Truffle cream", "Mozzarella", "Thyme", "Parmesan"],
    price: 19.5,
    image: "/images/menu/truffle-mushroom-pizza.svg",
    rating: 4.7,
    featured: false,
  },

  // Pasta
  {
    id: "truffle-mushroom-pasta",
    name: "Truffle Mushroom Pasta",
    slug: "truffle-mushroom-pasta",
    category: "pasta",
    description:
      "Creamy mushroom ragù, truffle oil, parmesan, and fresh herbs over silky tagliatelle.",
    ingredients: ["Tagliatelle", "Mushroom ragù", "Truffle oil", "Parmesan", "Fresh herbs"],
    price: 18.9,
    image: "/images/menu/truffle-mushroom-pasta.svg",
    rating: 4.9,
    featured: true,
  },
  {
    id: "creamy-alfredo-pasta",
    name: "Creamy Alfredo Pasta",
    slug: "creamy-alfredo-pasta",
    category: "pasta",
    description:
      "Fettuccine tossed in a parmesan cream sauce with cracked pepper, nutmeg, and parsley.",
    ingredients: ["Fettuccine", "Parmesan cream", "Cracked pepper", "Nutmeg", "Parsley"],
    price: 17.5,
    image: "/images/menu/creamy-alfredo-pasta.svg",
    rating: 4.6,
    featured: true,
  },
  {
    id: "spicy-arrabbiata-pasta",
    name: "Spicy Arrabbiata Pasta",
    slug: "spicy-arrabbiata-pasta",
    category: "pasta",
    description:
      "Penne in a fiery tomato sauce with garlic, chili flakes, and a basil garnish.",
    ingredients: ["Penne", "Tomato sauce", "Chili flakes", "Garlic", "Basil"],
    price: 16.9,
    image: "/images/menu/spicy-arrabbiata-pasta.svg",
    rating: 4.5,
    featured: false,
  },

  // Seafood
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    slug: "grilled-salmon",
    category: "seafood",
    description:
      "Atlantic salmon fillet, lemon beurre blanc, asparagus, and charred lemon.",
    ingredients: ["Atlantic salmon", "Lemon beurre blanc", "Asparagus", "Charred lemon", "Dill"],
    price: 24.5,
    image: "/images/menu/grilled-salmon.svg",
    rating: 4.8,
    featured: true,
  },
  {
    id: "garlic-butter-prawns",
    name: "Garlic Butter Prawns",
    slug: "garlic-butter-prawns",
    category: "seafood",
    description:
      "Jumbo prawns seared in garlic butter with chili, white wine, and a squeeze of lemon.",
    ingredients: ["Jumbo prawns", "Garlic butter", "White wine", "Chili", "Lemon"],
    price: 22.9,
    image: "/images/menu/garlic-butter-prawns.svg",
    rating: 4.7,
    featured: false,
  },
  {
    id: "fish-and-chips",
    name: "Fish & Chips",
    slug: "fish-and-chips",
    category: "seafood",
    description:
      "Beer-battered cod, chunky chips, mushy peas, and house tartar sauce.",
    ingredients: ["Beer-battered cod", "Chunky chips", "Mushy peas", "Tartar sauce", "Lemon"],
    price: 18.5,
    image: "/images/menu/fish-and-chips.svg",
    rating: 4.5,
    featured: false,
  },

  // Chicken
  {
    id: "crispy-fried-chicken",
    name: "Crispy Fried Chicken",
    slug: "crispy-fried-chicken",
    category: "chicken",
    description:
      "Buttermilk-brined, double-breaded, honey-glazed fried chicken with slaw and house hot sauce.",
    ingredients: ["Buttermilk chicken", "Honey glaze", "Slaw", "House hot sauce", "Pickles"],
    price: 14.9,
    image: "/images/menu/crispy-fried-chicken.svg",
    rating: 4.7,
    featured: true,
  },
  {
    id: "grilled-chicken-steak",
    name: "Grilled Chicken Steak",
    slug: "grilled-chicken-steak",
    category: "chicken",
    description:
      "Free-range chicken breast with herb butter, pan juices, and charred greens.",
    ingredients: ["Free-range chicken", "Herb butter", "Pan juices", "Charred greens", "Thyme"],
    price: 19.9,
    image: "/images/menu/grilled-chicken-steak.svg",
    rating: 4.7,
    featured: true,
  },
  {
    id: "honey-glazed-wings",
    name: "Honey Glazed Wings",
    slug: "honey-glazed-wings",
    category: "chicken",
    description:
      "Sticky honey-garlic glazed wings with toasted sesame, spring onion, and chili flakes.",
    ingredients: ["Chicken wings", "Honey-garlic glaze", "Sesame", "Spring onion", "Chili flakes"],
    price: 13.5,
    image: "/images/menu/honey-glazed-wings.svg",
    rating: 4.6,
    featured: false,
  },

  // Desserts
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    slug: "chocolate-lava-cake",
    category: "desserts",
    description:
      "Molten dark chocolate center, vanilla gelato, and a compote of seasonal berries.",
    ingredients: ["Dark chocolate", "Vanilla gelato", "Seasonal berries", "Cocoa", "Salted caramel"],
    price: 9.5,
    image: "/images/menu/chocolate-lava-cake.svg",
    rating: 5.0,
    featured: true,
  },
  {
    id: "new-york-cheesecake",
    name: "New York Cheesecake",
    slug: "new-york-cheesecake",
    category: "desserts",
    description:
      "Baked vanilla cheesecake on a buttery biscuit base with fresh berries and cream.",
    ingredients: ["Cream cheese", "Biscuit base", "Vanilla", "Fresh berries", "Whipped cream"],
    price: 8.9,
    image: "/images/menu/new-york-cheesecake.svg",
    rating: 4.8,
    featured: false,
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    slug: "tiramisu",
    category: "desserts",
    description:
      "Espresso-soaked ladyfingers, silky mascarpone cream, and a dusting of cocoa.",
    ingredients: ["Espresso", "Ladyfingers", "Mascarpone", "Cocoa", "Marsala"],
    price: 8.5,
    image: "/images/menu/tiramisu.svg",
    rating: 4.7,
    featured: false,
  },

  // Drinks
  {
    id: "mango-smoothie",
    name: "Fresh Mango Smoothie",
    slug: "mango-smoothie",
    category: "drinks",
    description:
      "Ripe mango blended with yogurt, honey, and ice for a silky tropical refresher.",
    ingredients: ["Mango", "Yogurt", "Honey", "Ice", "Fresh mint"],
    price: 6.9,
    image: "/images/menu/mango-smoothie.svg",
    rating: 4.5,
    featured: false,
  },
  {
    id: "vanilla-latte",
    name: "Roasted Vanilla Latte",
    slug: "vanilla-latte",
    category: "drinks",
    description:
      "Double espresso, steamed milk, and house-made vanilla syrup with latte art.",
    ingredients: ["Espresso", "Steamed milk", "Vanilla syrup", "Cinnamon", "Cocoa dust"],
    price: 5.5,
    image: "/images/menu/vanilla-latte.svg",
    rating: 4.6,
    featured: false,
  },
  {
    id: "craft-lemonade",
    name: "Craft Lemonade",
    slug: "craft-lemonade",
    category: "drinks",
    description:
      "Freshly squeezed lemons, raw sugar, and sparkling water muddled with rosemary.",
    ingredients: ["Fresh lemon", "Raw sugar", "Sparkling water", "Rosemary", "Ice"],
    price: 4.9,
    image: "/images/menu/craft-lemonade.svg",
    rating: 4.4,
    featured: false,
  },
];

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return menuItems.find((item) => item.slug === slug);
}

export function getRelatedItems(item: MenuItem, limit = 3): MenuItem[] {
  return menuItems
    .filter((entry) => entry.category === item.category && entry.id !== item.id)
    .slice(0, limit);
}