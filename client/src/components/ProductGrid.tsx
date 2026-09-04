"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

export interface ProductGridProps {
  products: Product[];
  className?: string;
  emptyMessage?: string;
  onWishlistToggle?: (productId: string | number, isWishlisted: boolean) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className = "",
  emptyMessage = "NO DROPS FOUND IN THIS CATEGORY",
  onWishlistToggle,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-neutral-800 bg-neutral-950/50 my-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants} className="h-full">
          <ProductCard
            product={product}
            onWishlistToggle={onWishlistToggle}
            className="h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
