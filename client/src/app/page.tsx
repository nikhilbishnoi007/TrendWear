"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-orange-500 selection:text-black">
      {/* Hero Component */}
      <Hero />

      {/* Featured Drops Grid */}
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
            href="/category/new-drops"
            className="mt-4 sm:mt-0 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-orange-500 flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL DROPS</span>
            <span>→</span>
          </Link>
        </div>

        {/* Responsive Product Grid with Framer Motion Stagger */}
        <ProductGrid products={PRODUCTS} />
      </section>
    </div>
  );
}
