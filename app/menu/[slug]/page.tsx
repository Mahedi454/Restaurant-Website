import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuItemBySlug, getRelatedItems, menuItems } from "@/data/menu";
import { categories } from "@/data/categories";
import FoodDetailsClient from "@/components/menu/FoodDetailsClient";

interface MenuItemPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: MenuItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) {
    return { title: "Dish not found" };
  }
  return {
    title: item.name,
    description: item.description,
  };
}

export default async function MenuItemPage({ params }: MenuItemPageProps) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) notFound();

  const categoryName =
    categories.find((category) => category.id === item.category)?.name ??
    item.category;
  const related = getRelatedItems(item, 3);

  return (
    <FoodDetailsClient
      item={item}
      categoryName={categoryName}
      related={related}
    />
  );
}