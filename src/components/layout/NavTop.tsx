"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, Cake } from "lucide-react";
import SearchModal from "@/components/ui/SearchModal";
import CartModal from "@/components/ui/CartModal";
import UserMenu from "@/components/ui/UserMenu";

export function NavTop() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                <Cake className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Кейк Крафт
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className={`${
                    isActive("/")
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  } transition`}
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/cake-builder"
                  className={`${
                    isActive("/cake-builder")
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  } transition`}
                >
                  Конструктор
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className={`${
                    isActive("/catalog")
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  } transition`}
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${
                    isActive("/about")
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  } transition`}
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`${
                    isActive("/contact")
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  } transition`}
                >
                  Контакты
                </Link>
              </li>
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <Search size={20} className="text-slate-700" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-full transition relative"
              >
                <ShoppingCart size={20} className="text-slate-700" />
                <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              <UserMenu />

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-full transition"
              >
                <Menu size={20} className="text-slate-700" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <ul className="md:hidden py-4 border-t border-slate-100 space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block px-4 py-2 ${
                    isActive("/")
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/cake-builder"
                  className={`block px-4 py-2 ${
                    isActive("/cake-builder")
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Конструктор
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className={`block px-4 py-2 ${
                    isActive("/catalog")
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block px-4 py-2 ${
                    isActive("/about")
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block px-4 py-2 ${
                    isActive("/contact")
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Контакты
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}