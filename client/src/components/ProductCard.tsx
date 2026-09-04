"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  className?: string;
  onWishlistToggle?: (productId: string | number, isWishlisted: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  onWishlistToggle,
}) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const primaryImage =
    product.image || (product.images && product.images[0]) || "";
  const secondaryImage =
    product.secondaryImage ||
    (product.images && product.images[1]) ||
    primaryImage;
  const hasSecondaryImage =
    Boolean(secondaryImage) && secondaryImage !== primaryImage;

  const inStock = product.inStock !== false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    if (onWishlistToggle) {
      onWishlistToggle(product.id, nextState);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      category: product.category,
      brand: product.brand,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Top Image Showcase Area */}
      <div className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden bg-neutral-900 select-none">
        {/* Primary Product Image */}
        <motion.img
          src={primaryImage}
          alt={product.name}
          initial={false}
          animate={{
            opacity: isHovered && hasSecondaryImage ? 0 : 1,
            scale: isHovered && inStock ? 1.06 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            !inStock ? "grayscale opacity-50" : ""
          }`}
        />

        {/* Secondary Angle Image (Swaps on hover) */}
        {hasSecondaryImage && (
          <motion.img
            src={secondaryImage}
            alt={`${product.name} angle 2`}
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered && inStock ? 1.06 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`absolute inset-0 w-full h-full object-cover ${
              !inStock ? "grayscale opacity-50" : ""
            }`}
          />
        )}

        {/* Badges: "NEW" Badge */}
        {product.isNewDrop && inStock && (
          <div className="absolute top-3 left-3 z-10 bg-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 shadow-lg shadow-orange-500/30">
            NEW
          </div>
        )}

        {/* "SOLD OUT" Overlay Badge */}
        {!inStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <span className="bg-neutral-950/90 text-neutral-300 border border-neutral-700 font-black text-xs uppercase tracking-[0.25em] px-4 py-2 shadow-2xl">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Wishlist Heart Button (Top Right) */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white transition-colors focus:outline-none"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isWishlisted
                ? "fill-orange-500 text-orange-500"
                : "text-white hover:text-orange-400"
            }`}
          />
        </motion.button>

        {/* Quick Add Button (Fades / slides up on hover) */}
        {inStock && (
          <div className="absolute bottom-3 inset-x-3 z-20">
            <motion.button
              type="button"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 12,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleQuickAdd}
              aria-label={`Quick add ${product.name} to cart`}
              className={`w-full py-3 px-4 font-black uppercase text-xs tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-xl ${
                isAdded
                  ? "bg-emerald-500 text-black shadow-emerald-500/30"
                  : "bg-orange-500 hover:bg-orange-400 text-black shadow-orange-500/40"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>ADDED TO CART</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>QUICK ADD</span>
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>

      {/* Product Details Bottom Info */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {product.brand && (
            <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              {product.brand}
            </p>
          )}
          <h3 className="font-bold text-white text-sm sm:text-base uppercase tracking-tight line-clamp-1 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <span className="text-base sm:text-lg font-mono font-bold text-white">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs sm:text-sm font-mono text-neutral-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
