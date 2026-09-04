"use client";

import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Hero } from "@/components/Hero";

const FEATURED_DROPS = [
  {
    id: "drop-01",
    name: "CYBERPUNK HIGH 'VOLT'",
    category: "Sneakers",
    price: 240,
    tag: "LIMITED DROP",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drop-02",
    name: "OVERSIZED ACID WASH HOODIE",
    category: "Apparel",
    price: 130,
    tag: "NEW IN",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drop-03",
    name: "TACTICAL CARGO VEST v2",
    category: "Apparel",
    price: 175,
    tag: "SELLING FAST",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const { addToCart } = useCart();

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
              <span>FRESH CUTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              LATEST ARRIVALS
            </h2>
          </div>
          <Link
            href="/new-drops"
            className="mt-4 sm:mt-0 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-orange-500 flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL ITEMS</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_DROPS.map((product) => (
            <div
              key={product.id}
              className="group bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-orange-500 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 border border-neutral-800">
                    {product.tag}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-neutral-500">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-base uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-lg font-mono font-bold text-white">
                    ${product.price}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    })
                  }
                  className="w-full bg-neutral-900 hover:bg-orange-500 text-neutral-300 hover:text-black font-bold uppercase text-xs tracking-wider py-3.5 px-4 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
