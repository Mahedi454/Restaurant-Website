export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "Reservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

export const footerMenuLinks: NavItem[] = [
  { label: "Starters", href: "/menu" },
  { label: "Mains", href: "/menu" },
  { label: "Grill & Seafood", href: "/menu" },
  { label: "Desserts", href: "/menu" },
  { label: "Cocktails", href: "/menu" },
  { label: "Wine List", href: "/menu" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Our Story", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "Reserve a Table", href: "/reservation" },
  { label: "Contact", href: "/contact" },
  { label: "Private Dining", href: "/reservation" },
];