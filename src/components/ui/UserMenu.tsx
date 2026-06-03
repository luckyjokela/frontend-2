// src/components/ui/UserMenu.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  LogOut,
  Settings,
  UserCircle,
  LogIn,
  Briefcase,
} from "lucide-react"; // ← ДОБАВИТЬ Briefcase!
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated, logout, role } = useUserStore(); // ← ДОБАВИТЬ role!

  // ← Определяем правильный путь в зависимости от роли!
  const isMaker = role === "maker" || role === "MAKER";
  const profilePath = isMaker ? "/maker/profile" : "/user/profile";
  const ordersPath = isMaker ? "/maker/orders" : "/user/orders";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  // Если НЕ авторизован — показываем кнопку "Войти"
  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 transition shadow-md hover:shadow-lg"
      >
        <LogIn size={18} />
        <span className="font-medium">Войти</span>
      </Link>
    );
  }

  // Если авторизован — показываем меню пользователя
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-full transition"
      >
        <UserCircle className="text-rose-600" size={28} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-bold text-slate-900">Мой аккаунт</p>
            <p className="text-xs text-slate-500">Управление профилем</p>
          </div>

          {/* ← ДИНАМИЧЕСКАЯ ССЫЛКА НА ПРОФИЛЬ! */}
          <Link
            href={profilePath} // ← ИЗМЕНИТЬ!
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700"
          >
            {isMaker ? (
              <Briefcase size={18} className="text-rose-600" />
            ) : (
              <User size={18} className="text-rose-600" />
            )}
            <span className="font-medium">
              {isMaker ? "Профиль кондитера" : "Профиль"}
            </span>
          </Link>

          {/* ← ДИНАМИЧЕСКАЯ ССЫЛКА НА ЗАКАЗЫ! */}
          <Link
            href={ordersPath} // ← ИЗМЕНИТЬ!
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700"
          >
            <Settings size={18} className="text-rose-600" />
            <span className="font-medium">
              {isMaker ? "Заказы кондитера" : "Мои заказы"}
            </span>
          </Link>

          <div className="border-t border-slate-100 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 transition text-red-600"
            >
              <LogOut size={18} />
              <span className="font-medium">Выйти</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
