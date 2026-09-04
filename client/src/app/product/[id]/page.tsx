import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getRelatedProducts, PRODUCTS } from "@/data/products";
import { ProductDetailView } from "@/components/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | TrendWear",
    };
  }

  return {
    title: `${product.name} | TrendWear`,
    description:
      product.description ||
      `Cop ${product.name} by ${product.brand || "TrendWear"} - Limited Edition Streetwear.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <ProductDetailView product={product} relatedProducts={relatedProducts} />
  );
}
