"use client";

import React from "react";
import Link from "next/link";
import { User, ShoppingBag, Heart, ArrowRight, ShieldCheck } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-850 p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mx-auto text-orange-500">
          <User className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-orange-500">
            MEMBER PORTAL
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            WELCOME TO TRENDWEAR
          </h1>
          <p className="text-xs font-mono text-neutral-400 uppercase leading-relaxed">
            Sign in to track orders, access limited drop raffles, and manage your wishlist.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/login"
            className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <span>SIGN IN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/signup"
            className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-bold uppercase text-xs tracking-wider transition-colors block"
          >
            CREATE AN ACCOUNT
          </Link>
        </div>

        <div className="pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono uppercase text-neutral-400">
          <Link
            href="/category/all"
            className="flex items-center justify-center gap-1.5 p-2 bg-neutral-900/50 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
            <span>BROWSE DROPS</span>
          </Link>
          <Link
            href="/drops"
            className="flex items-center justify-center gap-1.5 p-2 bg-neutral-900/50 hover:text-white transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-orange-500" />
            <span>CALENDAR</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          <span>TRENDWEAR VIP ACCESS</span>
        </div>
      </div>
    </div>
  );
}
