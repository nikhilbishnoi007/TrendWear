"use client";

import React, { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types/product";
import { ProductGrid } from "@/components/ProductGrid";

export interface CategoryViewProps {
  categorySlug: string;
  categoryTitle: string;
  initialProducts: Product[];
}

const ALL_SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryTitle,
  initialProducts,
}) => {
  // Extract all unique brands from products
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands);
  }, [initialProducts]);

  // Max price for slider
  const maxProductPrice = useMemo(() => {
    return Math.max(...initialProducts.map((p) => p.price), 350);
  }, [initialProducts]);

  // Filter & Sorting States
  const [maxPrice, setMaxPrice] = useState<number>(maxProductPrice);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Handle Brand Toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setMaxPrice(maxProductPrice);
    setSelectedBrands([]);
    setSelectedSize(null);
    setInStockOnly(false);
    setSortBy("newest");
  };

  const isFiltered =
    maxPrice < maxProductPrice ||
    selectedBrands.length > 0 ||
    selectedSize !== null ||
    inStockOnly;

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // 2. Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }

    // 3. Size filter
    if (selectedSize !== null) {
      result = result.filter((p) => {
        const sizes = p.availableSizes ?? p.sizes ?? [];
        return sizes.some((s) => String(s) === String(selectedSize));
      });
    }

    // 4. In stock only filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock !== false);
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "popularity") {
        return (b.originalPrice || b.price) - (a.originalPrice || a.price);
      }
      // "newest" default
      return (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0);
    });

    return result;
  }, [initialProducts, maxPrice, selectedBrands, selectedSize, inStockOnly, sortBy]);

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Category Header Banner */}
      <div className="border-b border-neutral-900 bg-neutral-950/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-orange-500 font-mono text-xs tracking-widest uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COLLECTION ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            {categoryTitle}
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-xl tracking-wide font-mono uppercase">
            Engineered silhouettes, limited seasonal drops, and tactical streetwear essentials.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Total Count, Mobile Filter Button, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-neutral-900 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              SHOWING <span className="text-white font-bold">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "ITEM" : "ITEMS"}
            </span>

            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET FILTERS</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
              <span>FILTERS {isFiltered && "(ACTIVE)"}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider hidden sm:inline">
                SORT BY:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-neutral-950 text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 pr-8 border border-neutral-800 hover:border-neutral-700 focus:border-orange-500 focus:outline-none cursor-pointer"
                >
                  <option value="newest">NEWEST FIRST</option>
                  <option value="price-asc">PRICE: LOW TO HIGH</option>
                  <option value="price-desc">PRICE: HIGH TO LOW</option>
                  <option value="popularity">POPULARITY / HEAT</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block space-y-8 pr-4 border-r border-neutral-900">
            {/* 1. Price Range Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
                <span className="text-neutral-400 font-bold">PRICE RANGE</span>
                <span className="text-orange-500 font-bold">UP TO ${maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-none accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>$0</span>
                <span>${maxProductPrice}</span>
              </div>
            </div>

            {/* 2. Brand Filter Checkboxes */}
            {availableBrands.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-neutral-900">
                <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                  BRANDS
                </span>
                <div className="space-y-2">
                  {availableBrands.map((brand) => {
                    const checked = selectedBrands.includes(brand);
                    return (
                      <label
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-300 hover:text-white cursor-pointer select-none group"
                      >
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                            checked
                              ? "bg-orange-500 border-orange-500 text-black"
                              : "border-neutral-700 bg-neutral-950 group-hover:border-neutral-500"
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{brand}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. US Size Filter */}
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
                <span className="text-neutral-400 font-bold">US SIZE</span>
                {selectedSize !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedSize(null)}
                    className="text-[10px] text-orange-400 hover:underline"
                  >
                    CLEAR
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {ALL_SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(isSelected ? null : size)}
                      className={`h-9 border font-mono text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-orange-500 text-black border-orange-500 shadow-md shadow-orange-500/30"
                          : "bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. In-Stock Only Toggle */}
            <div className="pt-4 border-t border-neutral-900">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">
                  IN-STOCK ONLY
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-10 h-5 border transition-colors flex items-center p-0.5 ${
                    inStockOnly
                      ? "bg-orange-500 border-orange-500"
                      : "bg-neutral-900 border-neutral-700"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-black transition-transform ${
                      inStockOnly ? "translate-x-5 bg-black" : "translate-x-0 bg-neutral-400"
                    }`}
                  />
                </div>
              </label>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID (3 Columns on Desktop, 4 total grid area) */}
          <main className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              emptyMessage="NO DROPS MATCH YOUR CURRENT FILTER CRITERIA"
            />
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative ml-auto w-full max-w-xs bg-neutral-950 border-l border-neutral-850 h-full p-6 overflow-y-auto flex flex-col justify-between z-10 space-y-6 text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  <span>FILTER DROPS</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs uppercase">
                  <span className="text-neutral-400 font-bold">PRICE</span>
                  <span className="text-orange-500 font-bold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxProductPrice}
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Brands */}
              {availableBrands.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-neutral-900">
                  <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    BRANDS
                  </span>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-300"
                      >
                        <div
                          className={`w-4 h-4 border flex items-center justify-center ${
                            selectedBrands.includes(brand)
                              ? "bg-orange-500 border-orange-500 text-black"
                              : "border-neutral-700"
                          }`}
                        >
                          {selectedBrands.includes(brand) && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div className="space-y-3 pt-4 border-t border-neutral-900">
                <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                  US SIZE
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {ALL_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? null : size)
                      }
                      className={`h-9 border font-mono text-xs font-bold ${
                        selectedSize === size
                          ? "bg-orange-500 text-black border-orange-500"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock */}
              <div className="pt-4 border-t border-neutral-900">
                <label className="flex items-center justify-between text-xs font-mono uppercase font-bold">
                  <span>IN-STOCK ONLY</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-orange-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-900 space-y-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 bg-orange-500 text-black font-black uppercase text-xs tracking-widest"
              >
                APPLY FILTERS ({filteredProducts.length})
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider"
              >
                RESET ALL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
