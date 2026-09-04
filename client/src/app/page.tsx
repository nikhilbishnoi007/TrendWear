"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/types/product";

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "drop-01",
    name: "CYBERPUNK HIGH 'VOLT'",
    brand: "TRENDWEAR LABS",
    category: "Sneakers",
    price: 240,
    originalPrice: 280,
    isNewDrop: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drop-02",
    name: "OVERSIZED ACID WASH HOODIE",
    brand: "RAW STREET",
    category: "Apparel",
    price: 130,
    isNewDrop: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drop-03",
    name: "TACTICAL MODULAR CARGO VEST",
    brand: "SYSTEM 04",
    category: "Apparel",
    price: 175,
    isNewDrop: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drop-04",
    name: "AIR PHANTOM PROTO-01",
    brand: "TRENDWEAR LABS",
    category: "Sneakers",
    price: 290,
    isNewDrop: true,
    inStock: false,
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-orange-500 selection:text-black">
      <Hero />

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-neutral-900 pb-6">
          <div>
            <div className="text-orange-500 font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FRESH CUTS // SEASON 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              LATEST ARRIVALS
            </h2>
          </div>
          <Link
            href="/new-drops"
            className="mt-4 sm:mt-0 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-orange-500 flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL DROPS</span>
            <span>→</span>
          </Link>
        </div>
        <ProductGrid products={FEATURED_PRODUCTS} />
      </section>
    </div>
  );
}
