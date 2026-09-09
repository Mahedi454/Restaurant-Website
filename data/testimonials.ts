export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sophie Laurent",
    role: "Food Critic",
    rating: 5,
    review:
      "Every dish tells a story. The truffle pasta is easily the best I've had in years — silky, aromatic, and perfectly balanced. iFOODS has set a new standard for city dining.",
    image: "/images/avatar-1.svg",
  },
  {
    id: "testimonial-2",
    name: "Daniel Osei",
    role: "Regular Guest",
    rating: 5,
    review:
      "The service is warm, the room glows, and the wood-fired pizza takes me straight back to Naples. My family now celebrates every occasion here.",
    image: "/images/avatar-2.svg",
  },
  {
    id: "testimonial-3",
    name: "Mia Chen",
    role: "Food Blogger",
    rating: 4.5,
    review:
      "From the first cocktail to the molten chocolate cake, everything arrives beautifully plated. A genuinely thoughtful, contemporary menu executed with precision.",
    image: "/images/avatar-3.svg",
  },
  {
    id: "testimonial-4",
    name: "James Whitfield",
    role: "Late-Night Regular",
    rating: 5,
    review:
      "Sunday evenings here are my ritual. The grilled salmon is consistently outstanding and the staff remember exactly how I like my table. Rare and wonderful.",
    image: "/images/avatar-4.svg",
  },
  {
    id: "testimonial-5",
    name: "Amara Brooks",
    role: "Event Planner",
    rating: 5,
    review:
      "We hosted a private dinner for forty guests. The team, the atmosphere, and the seasonal menu were flawless from start to finish. My clients are still talking about it.",
    image: "/images/avatar-5.svg",
  },
];