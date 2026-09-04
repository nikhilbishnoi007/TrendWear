"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Flame,
  ShieldCheck,
  Globe,
  Radio,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 4000);
  };

  const FOOTER_COLUMNS = [
    {
      title: "SHOP",
      links: [
        { label: "New Drops", href: "/category/new-drops" },
        { label: "Sneakers", href: "/category/sneakers" },
        { label: "Apparel", href: "/category/apparel" },
        { label: "Accessories", href: "/category/accessories" },
        { label: "Release Calendar", href: "/drops" },
        { label: "Sale Vault", href: "/category/sale" },
      ],
    },
    {
      title: "HELP & SUPPORT",
      links: [
        { label: "Track Your Order", href: "#" },
        { label: "Shipping & Delivery", href: "#" },
        { label: "14-Day Returns", href: "#" },
        { label: "Size & Fit Guide", href: "#" },
        { label: "Authenticity Check", href: "#" },
        { label: "Contact Support", href: "#" },
      ],
    },
    {
      title: "ABOUT TRENDWEAR",
      links: [
        { label: "Our Story", href: "#" },
        { label: "TrendWear Labs", href: "#" },
        { label: "Materials & Tech", href: "#" },
        { label: "Lookbook Archive", href: "#" },
        { label: "Press & Media", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "LEGAL & SECURITY",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Cookie Preferences", href: "#" },
        { label: "Raffle Rules", href: "#" },
        { label: "Compliance & Security", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-white selection:bg-orange-500 selection:text-black">
      {/* TOP SECTION: Newsletter Signup */}
      <div className="border-b border-neutral-900 py-16 px-4 sm:px-6 lg:px-8 bg-black/60 relative overflow-hidden">
        {/* Ambient Orange Glow */}
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-orange-500 text-[11px] font-mono tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>VIP DROP RADAR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              GET NOTIFIED ABOUT NEW DROPS FIRST
            </h2>

            <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed">
              Subscribe to the TrendWear underground newsletter for shock drops, private raffle links, and seasonal lookbooks.
            </p>
          </div>

          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs flex items-center gap-3">
                <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div>
                  <div className="font-bold uppercase">YOU&apos;RE ON THE RADAR</div>
                  <div className="text-neutral-400 text-[11px]">
                    Check your inbox for exclusive early-access confirmations.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="ENTER YOUR EMAIL..."
                    className="flex-1 bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border border-neutral-800 focus:border-orange-500 focus:outline-none placeholder-neutral-600 tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-widest transition-all duration-200 shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && (
                  <p className="text-[11px] font-mono text-red-400 pt-1">{error}</p>
                )}
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-1">
                  NO SPAM. UNSUBSCRIBE ANYTIME AT 1-CLICK.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Brand Statement & Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link
              href="/"
              className="group flex items-center gap-1 font-black text-2xl tracking-tighter uppercase select-none"
            >
              <span className="text-white group-hover:text-neutral-200 transition-colors">
                TREND
              </span>
              <span className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                WEAR
              </span>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full inline-block ml-0.5 animate-pulse" />
            </Link>

            <p className="text-xs font-light text-neutral-400 max-w-sm leading-relaxed font-mono uppercase">
              Engineered streetwear, high-heat sneaker editions, and tactical utility goods. Built for the modern underground culture worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                <span>TOKYO</span>
              </span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-300">LONDON</span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-300">NEW YORK</span>
            </div>
          </div>

          {/* Nav Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-mono text-neutral-400 hover:text-orange-500 transition-colors duration-200 uppercase tracking-wider block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION: Social Icons, Payment Trust, Copyright */}
      <div className="border-t border-neutral-900 bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Media Links */}
          <div className="flex items-center space-x-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-orange-500 text-neutral-400 hover:text-orange-500 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-orange-500 text-neutral-400 hover:text-orange-500 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-orange-500 text-neutral-400 hover:text-orange-500 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Global / Network */}
            <a
              href="#"
              aria-label="Global Network"
              className="w-9 h-9 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-orange-500 text-neutral-400 hover:text-orange-500 flex items-center justify-center transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Security & Authentication Tags */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>100% VERIFIED AUTHENTIC & ENCRYPTED CHECKOUT</span>
          </div>

          {/* Copyright */}
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest text-center md:text-right">
            © {new Date().getFullYear()} TRENDWEAR INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
