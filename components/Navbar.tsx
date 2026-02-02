"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-black/50 backdrop-blur-md border-b border-white/10"
        : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
                DRACIN 25
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-white hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/category/latest"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Terbaru
                </Link>
                <Link
                  href="/category/popular"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Popular
                </Link>
                <Link
                  href="/category/fyp"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  FYP
                </Link>
                <Link
                  href="/dubindo"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dubbing Indo
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 gap-4">
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Cari drama..."
                  className="block w-64 pl-10 pr-3 py-1.5 border border-transparent rounded-full leading-5 bg-white/10 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:text-white sm:text-sm transition-all duration-300"
                />
              </div>

              <button className="text-gray-300 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>

              <button className="text-gray-300 hover:text-white transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/category/latest"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Terbaru
            </Link>
            <Link
              href="/category/popular"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Popular
            </Link>
            <Link
              href="/category/fyp"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              FYP
            </Link>
            <Link
              href="/dubindo"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dubbing Indo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
