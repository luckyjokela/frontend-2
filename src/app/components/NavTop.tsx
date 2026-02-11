"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu } from "lucide-react";

export function NavTop() {
  const { isAuthenticated, logout } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleProfile = () => {
    router.push("/user/profile");
  };

  const handleChangePassword = () => {
    router.push("/change-password");
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/");
  };

  return (
    <div className="Top-Nav">
      {/* --- НАВИГАЦИЯ --- */}
      <nav className=" dark:bg-gray-900 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold tracking-tight">STORE.</span>
              </Link>
            </div>

            <div
              className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul
                className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700
            md:flex space-x-8 text-sm text-slate-600"
              >
                <li>
                  <Link
                    href="/"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                    aria-current={isActive("/") ? "page" : undefined}
                  >
                    Главная страница
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/catalog")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                  >
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/new-arrivals")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                  >
                    Новинки
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/about")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/contact")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-full">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-full relative">
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <div className="flex list-none">
                {isAuthenticated ? (
                  <div className="relative group">
                    <span className="block py-2 px-3 text-blue-700 md:p-0 cursor-pointer">
                      Account
                    </span>
                    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <li>
                        <button
                          onClick={handleProfile}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          My Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleChangePassword}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Change Password
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/login"
                        className={`block py-2 px-3 rounded-sm md:p-0 ${
                          isActive("/login")
                            ? "text-white md:text-blue-700"
                            : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                        }`}
                      >
                        Sign in
                      </Link>
                    </li>
                    <div className="pr-1.5 pl-1.5 text-gray-900 dark:bg-gray-100">
                      /
                    </div>
                    <li>
                      <Link
                        href="/register"
                        className={`block py-2 px-3 rounded-sm md:p-0 ${
                          isActive("/register")
                            ? "text-white md:text-blue-700"
                            : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                        }`}
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
