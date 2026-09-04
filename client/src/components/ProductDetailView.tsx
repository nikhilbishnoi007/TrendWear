"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Bell,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/types/product";

const DEFAULT_US_SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

export interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
}) => {
  const { addToCart, openCart } = useCart();

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.secondaryImage].filter(Boolean) as string[];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const inStock = product.inStock !== false;
  const availableSizes = product.availableSizes ?? product.sizes ?? DEFAULT_US_SIZES;
  const sizesList = product.sizes && product.sizes.length > 0 ? product.sizes : DEFAULT_US_SIZES;

  const isSizeAvailable = (size: string | number): boolean => {
    if (!inStock) return false;
    return availableSizes.some((s) => String(s) === String(size));
  };

  const handleAddToCart = () => {
    if (!inStock) return;

    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        size: `US ${selectedSize}`,
      },
      quantity
    );

    // Open CartDrawer to confirm addition
    openCart();
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotifySubmitted(true);
      setTimeout(() => {
        setIsNotifyOpen(false);
        setNotifySubmitted(false);
        setNotifyEmail("");
      }, 2500);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-700" />
          <Link
            href={`/${product.category?.toLowerCase() || "new-drops"}`}
            className="hover:text-orange-500 transition-colors"
          >
            {product.category || "DROPS"}
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-700" />
          <span className="text-neutral-300 line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            {galleryImages.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-none flex-shrink-0">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View angle ${idx + 1}`}
                    className={`relative w-20 h-24 md:w-22 md:h-28 bg-neutral-900 border transition-all duration-200 overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-orange-500 ring-2 ring-orange-500/30 scale-100"
                        : "border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image Display */}
            <div className="relative flex-1 aspect-square sm:aspect-[4/5] bg-neutral-950 border border-neutral-900 overflow-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={galleryImages[selectedImageIndex] || product.image}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`w-full h-full object-cover ${
                    !inStock ? "grayscale opacity-50" : ""
                  }`}
                />
              </AnimatePresence>

              {/* Badges on main image */}
              {product.isNewDrop && inStock && (
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 shadow-xl shadow-orange-500/30">
                  NEW DROP
                </div>
              )}

              {!inStock && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  <span className="bg-neutral-950/95 text-neutral-300 border border-neutral-700 font-black text-sm uppercase tracking-[0.25em] px-6 py-3 shadow-2xl">
                    SOLD OUT
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white transition-all active:scale-90"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted
                      ? "fill-orange-500 text-orange-500"
                      : "text-white hover:text-orange-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Controls */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header: Brand, Title, Price */}
            <div className="space-y-3 border-b border-neutral-900 pb-6">
              {product.brand && (
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                  {product.brand}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 pt-1">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg font-mono text-neutral-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold px-2.5 py-1">
                    SAVE ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Colorway Indicator */}
              {product.colorway && (
                <div className="pt-2 text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-neutral-500">COLORWAY:</span>
                  <span className="text-white font-bold">{product.colorway}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  OVERVIEW
                </h2>
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            )}

            {/* US Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  SELECT US SIZE:{" "}
                  {selectedSize ? (
                    <span className="text-orange-500 font-bold">US {selectedSize}</span>
                  ) : (
                    <span className="text-neutral-500 font-normal">REQUIRED</span>
                  )}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-neutral-400" />
                  <span>TRUE TO SIZE</span>
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                {sizesList.map((size) => {
                  const available = isSizeAvailable(size);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!available}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`h-12 border font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? "bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/25 scale-105"
                          : available
                          ? "bg-neutral-950 text-white border-neutral-800 hover:border-orange-500/60 hover:bg-neutral-900"
                          : "bg-neutral-900/40 text-neutral-600 border-neutral-900 cursor-not-allowed line-through opacity-40"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {sizeError && (
                <p className="text-xs font-mono text-red-400 tracking-wide animate-bounce pt-1">
                  ⚠ PLEASE SELECT A SIZE BEFORE ADDING TO BAG
                </p>
              )}
            </div>

            {/* Quantity Stepper & CTA Buttons */}
            <div className="space-y-4 pt-2">
              {inStock ? (
                <div className="space-y-4">
                  {/* Quantity Control Row */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      QUANTITY:
                    </span>
                    <div className="inline-flex items-center border border-neutral-800 bg-neutral-950">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="px-3.5 py-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-mono text-xs font-bold text-white min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                        className="px-3.5 py-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase tracking-[0.2em] text-sm transition-all duration-200 shadow-xl shadow-orange-500/25 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              ) : (
                /* Sold Out / Notify Me Button */
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setIsNotifyOpen(true)}
                    className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-orange-400 border border-orange-500/30 font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl flex items-center justify-center gap-2.5 active:scale-[0.99]"
                  >
                    <Bell className="w-5 h-5 animate-pulse" />
                    <span>NOTIFY ME WHEN RESTOCKED</span>
                  </button>
                  <p className="text-[11px] font-mono text-neutral-500 text-center uppercase tracking-wider">
                    Sign up for instant SMS / Email restock lottery notifications.
                  </p>
                </div>
              )}
            </div>

            {/* Product Feature Highlights / Trust Badges */}
            <div className="border-t border-neutral-900 pt-6 space-y-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>EXPRESS WORLDWIDE DISPATCH WITHIN 24 HOURS</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>100% VERIFIED AUTHENTIC & ORIGINAL PACKAGING</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>HASSLE-FREE 14-DAY RETURNS ON UNWORN ITEMS</span>
              </div>
            </div>

            {/* Tech Specs / Details List */}
            {product.details && product.details.length > 0 && (
              <div className="border-t border-neutral-900 pt-6 space-y-3">
                <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  SPECIFICATIONS & CONSTRUCTION
                </h3>
                <ul className="space-y-2 text-xs font-mono text-neutral-300">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "You Might Also Like" Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-neutral-900">
          <div className="mb-10">
            <div className="text-orange-500 font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED SELECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              YOU MIGHT ALSO LIKE
            </h2>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}

      {/* "Notify Me" Restock Modal */}
      <AnimatePresence>
        {isNotifyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotifyOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 shadow-2xl text-white space-y-6"
            >
              <div className="space-y-2">
                <div className="text-orange-500 font-mono text-xs tracking-widest uppercase">
                  RESTOCK ALERT
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  GET NOTIFIED FOR {product.name}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Enter your email below to receive an exclusive early-access restock link the moment sizes drop.
                </p>
              </div>

              {notifySubmitted ? (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>YOU&apos;RE ON THE LIST! WE WILL NOTIFY YOU FIRST.</span>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS..."
                    className="w-full bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border border-neutral-800 focus:border-orange-500 focus:outline-none placeholder-neutral-500"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-widest transition-colors"
                    >
                      NOTIFY ME
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsNotifyOpen(false)}
                      className="px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold uppercase text-xs tracking-wider transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailView;
