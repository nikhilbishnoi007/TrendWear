import type { Metadata } from "next";
import { getProductsByCategory, PRODUCTS } from "@/data/products";
import { CategoryView } from "@/components/CategoryView";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_TITLES: Record<string, string> = {
  sneakers: "SNEAKERS // HIGH-HEAT ARCHIVE",
  apparel: "APPAREL // STREETWEAR & TECHWEAR",
  accessories: "ACCESSORIES // TACTICAL & EDC",
  "new-drops": "NEW DROPS // SEASON 04",
  sale: "SALE // ARCHIVE VAULT",
  all: "ALL COLLECTIONS // COMPLETE ARCHIVE",
};

export async function generateStaticParams() {
  return [
    { category: "sneakers" },
    { category: "apparel" },
    { category: "accessories" },
    { category: "new-drops" },
    { category: "sale" },
    { category: "all" },
  ];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const normalized = category.toLowerCase();
  const title =
    CATEGORY_TITLES[normalized] || `${category.toUpperCase()} | TrendWear`;

  return {
    title: `${title} | TrendWear`,
    description: `Explore exclusive ${category} drops and limited edition streetwear at TrendWear.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const normalized = category.toLowerCase();
  const title =
    CATEGORY_TITLES[normalized] || `${category.toUpperCase()} COLLECTION`;

  const products = getProductsByCategory(normalized);

  return (
    <CategoryView
      categorySlug={normalized}
      categoryTitle={title}
      initialProducts={products.length > 0 ? products : PRODUCTS}
    />
  );
}
