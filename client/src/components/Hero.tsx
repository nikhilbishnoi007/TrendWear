"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, ShieldAlert } from "lucide-react";

export const Hero: React.FC = () => {
  // Animation variants for smooth staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black -mt-20">
      {/* Background Image Container with Unsplash Streetwear/Sneaker Visual */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=2400&q=85')`,
          }}
        />

        {/* Multi-layered Dark Overlays for Extreme Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black" />

        {/* Ambient Electric Orange Atmospheric Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-orange-500/15 rounded-full blur-[150px] pointer-events-none" />

        {/* Subtle Streetwear Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Hero Core Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* "New Drop" Pulsing Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-neutral-950/90 border border-neutral-800 rounded-none shadow-2xl backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-[0_0_10px_#f97316]" />
            </span>
            <span className="text-orange-500 font-mono text-xs font-bold tracking-[0.25em] uppercase">
              NEW DROP // SEASON 04
            </span>
            <span className="text-neutral-600">|</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
              <Flame className="w-3 h-3 text-orange-500" />
              <span>LIMITED QUANTITIES</span>
            </div>
          </div>
        </motion.div>

        {/* Bold Large Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white select-none mb-6"
        >
          STEP INTO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-orange-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            THE DROP
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-neutral-300 text-sm sm:text-base md:text-lg font-light tracking-wide leading-relaxed mb-10 text-balance"
        >
          Engineered streetwear silhouettes and high-heat sneaker editions.
          Precision-tailored aesthetics built for the bold and the underground.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Framer Motion Animated "Shop Now" Button */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(249, 115, 22, 0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/category/new-drops"
              className="w-full sm:w-auto px-9 py-4 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs sm:text-sm tracking-[0.2em] transition-colors flex items-center justify-center gap-2.5 group shadow-xl shadow-orange-500/25"
            >
              <span>SHOP NOW</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Secondary Lookbook Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/category/sneakers"
              className="w-full sm:w-auto px-8 py-4 bg-neutral-950/80 hover:bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-600 font-bold uppercase text-xs sm:text-sm tracking-[0.2em] transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <span>EXPLORE SNEAKERS</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom Micro Badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-neutral-900/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-mono text-neutral-500 uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <span className="text-orange-500">✓</span>
            <span>100% AUTHENTIC GUARANTEE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500">⚡</span>
            <span>WORLDWIDE EXPRESS SHIPPING</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
            <span>ENCRYPTED CHECKOUT</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
