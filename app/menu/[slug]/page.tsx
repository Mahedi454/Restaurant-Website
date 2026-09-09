import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuItemBySlug, getRelatedItems, menuItems } from "@/data/menu";
import { categories } from "@/data/categories";
import FoodDetailsClient from "@/components/menu/FoodDetailsClient";
import { openGraph } from "@/lib/seo";

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
    return {
      title: "Dish not found",
      openGraph: openGraph("Dish not found", "This dish could not be found."),
    };
  }
  const categoryName =
    categories.find((category) => category.id === item.category)?.name ??
    item.category;
  return {
    title: item.name,
    description: item.description,
    openGraph: openGraph(item.name, `${item.description} — ${categoryName} at iFOODS.`),
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