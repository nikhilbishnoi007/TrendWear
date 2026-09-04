"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Right-sliding Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
              className="w-screen max-w-md bg-neutral-950 border-l border-neutral-850 text-white shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-neutral-900 flex items-center justify-between bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-orange-500" />
                  <h2 className="text-base font-black uppercase tracking-wider text-white">
                    YOUR BAG
                  </h2>
                  <span className="bg-neutral-900 text-orange-500 font-mono text-xs font-bold px-2 py-0.5 border border-neutral-800">
                    {totalItems}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart drawer"
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-none transition-all active:scale-95 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-neutral-900">
                {cart.length === 0 ? (
                  /* Empty State */
                  <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center py-12 px-4 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
                      <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black uppercase tracking-tight text-white">
                        YOUR CART IS EMPTY
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-xs font-light tracking-wide leading-relaxed">
                        Your cart is empty — time to cop something new.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeCart}
                      className="px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                      START COPING
                    </button>
                  </div>
                ) : (
                  /* Cart Items List */
                  <div className="space-y-6 pb-6">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                        className="flex gap-4 pt-6 first:pt-0 group"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-neutral-900 flex-shrink-0 overflow-hidden border border-neutral-850">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-700">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                {item.brand && (
                                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                                    {item.brand}
                                  </p>
                                )}
                                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white line-clamp-1">
                                  {item.name}
                                </h4>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCart(item.id, {
                                    size: item.size,
                                    color: item.color,
                                  })
                                }
                                aria-label={`Remove ${item.name} from bag`}
                                className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {item.size && (
                              <p className="text-[11px] font-mono text-neutral-400">
                                SIZE: <span className="text-white font-bold">{item.size}</span>
                              </p>
                            )}

                            <div className="text-xs font-mono font-bold text-orange-400">
                              ${item.price}
                            </div>
                          </div>

                          {/* Quantity Controls & Subtotal */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center border border-neutral-800 bg-black">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                    { size: item.size, color: item.color }
                                  )
                                }
                                aria-label="Decrease quantity"
                                className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <span className="px-3 py-1 font-mono text-xs font-bold text-white min-w-[28px] text-center">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                    { size: item.size, color: item.color }
                                  )
                                }
                                aria-label="Increase quantity"
                                className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-bold text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer / Subtotal & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-neutral-950 border-t border-neutral-900 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400">
                      <span>SUBTOTAL</span>
                      <span className="text-base font-bold text-white">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                      Taxes & shipping calculated at checkout.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group active:scale-[0.99]"
                    >
                      <span>PROCEED TO CHECKOUT</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={closeCart}
                      className="w-full py-2.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
                    >
                      CONTINUE BROWSING
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-t border-neutral-900/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                    <span>GUARANTEED SAFE CHECKOUT</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
