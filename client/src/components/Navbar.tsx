"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { name: "New Drops", href: "/new-drops" },
  { name: "Sneakers", href: "/sneakers" },
  { name: "Apparel", href: "/apparel" },
  { name: "Accessories", href: "/accessories" },
  { name: "Sale", href: "/sale", isSale: true },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menus when route changes (React-idiomatic render-phase adjustment)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }

  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  // Determine navbar background state
  const isSolid = isScrolled || !isHomepage || isMobileMenuOpen;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isSolid
          ? "bg-black/95 text-white shadow-xl shadow-black/40 border-b border-neutral-800 backdrop-blur-md"
          : "bg-linear-to-b from-black/80 via-black/40 to-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-1 font-black text-2xl sm:text-3xl tracking-tighter uppercase select-none"
            >
              <span className="text-white group-hover:text-neutral-200 transition-colors">
                TREND
              </span>
              <span className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                WEAR
              </span>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full inline-block ml-0.5 animate-pulse" />
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs lg:text-sm font-bold tracking-widest uppercase py-2 transition-all duration-200 group ${
                    link.isSale
                      ? "text-orange-500 hover:text-orange-400 font-extrabold"
                      : isActive
                      ? "text-white"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Account, Cart, Mobile Toggle) */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
                className="p-2 text-neutral-300 hover:text-orange-500 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Expandable Search Input */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-neutral-950 border border-neutral-800 rounded-none shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="SEARCH STREETWEAR, SNEAKERS..."
                      autoFocus
                      className="w-full bg-black text-white text-xs font-mono uppercase px-3 py-2 border border-neutral-800 focus:border-orange-500 focus:outline-none placeholder-neutral-500 tracking-wider"
                    />
                    <button
                      type="submit"
                      className="ml-2 bg-orange-500 hover:bg-orange-600 text-black px-3 py-2 text-xs font-black uppercase tracking-wider transition-colors"
                    >
                      GO
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Account Icon */}
            <Link
              href="/account"
              aria-label="Account"
              className="p-2 text-neutral-300 hover:text-orange-500 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Icon Trigger for CartDrawer */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Open Shopping Cart"
              className="relative p-2 text-neutral-300 hover:text-orange-500 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none group"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-md shadow-orange-500/50 animate-in zoom-in duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-neutral-300 hover:text-orange-500 active:scale-95 transition-all duration-200 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 border-t border-neutral-800 px-6 pt-4 pb-8 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
          <div className="pt-2 pb-1">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH DROPS, SNEAKERS..."
                className="w-full bg-black text-white text-xs font-mono uppercase px-3 py-3 border border-neutral-800 focus:border-orange-500 focus:outline-none placeholder-neutral-500"
              />
              <button
                type="submit"
                className="ml-2 bg-orange-500 text-black px-4 py-3 text-xs font-black uppercase tracking-wider"
              >
                GO
              </button>
            </form>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-black tracking-widest uppercase py-2 flex items-center justify-between border-b border-neutral-900 transition-colors ${
                    link.isSale
                      ? "text-orange-500 hover:text-orange-400"
                      : isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-neutral-600">→</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-neutral-900 text-xs font-mono text-neutral-400 uppercase">
            <Link
              href="/account"
              className="flex items-center gap-2 hover:text-orange-500 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>My Account</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCart();
              }}
              className="flex items-center gap-2 hover:text-orange-500 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({totalItems})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
