"use client";

import React, { useState } from "react";
import {
  Filter,
  ChevronDown,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from "lucide-react";

// Расширенные данные товаров
const allProducts = [
  {
    id: 1,
    name: "Стильные Часы",
    price: 12500,
    category: "Аксессуары",
    image: "https://images.unsplash.com",
  },
  {
    id: 2,
    name: "Беспроводные Наушники",
    price: 8900,
    category: "Электроника",
    image: "https://images.unsplash.com",
  },
  {
    id: 3,
    name: "Кожаный Рюкзак",
    price: 5400,
    category: "Сумки",
    image: "https://images.unsplash.com",
  },
  {
    id: 4,
    name: "Умная Колонка",
    price: 15000,
    category: "Электроника",
    image: "https://images.unsplash.com",
  },
  {
    id: 5,
    name: "Минималистичный Светильник",
    price: 3200,
    category: "Дом",
    image: "https://images.unsplash.com",
  },
  {
    id: 6,
    name: "Керамическая Ваза",
    price: 2100,
    category: "Дом",
    image: "https://images.unsplash.com",
  },
];

const categories = ["Все", "Электроника", "Аксессуары", "Сумки", "Дом"];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredProducts =
    activeCategory === "Все"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* --- ЗАГОЛОВОК --- */}
      <header className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Каталог товаров
          </h1>
          <p className="text-slate-500">
            Найдено {filteredProducts.length} предметов
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- ФИЛЬТРЫ (Sidebar) --- */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} /> Категории
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white font-medium"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="font-bold mb-4">Цена</h3>
              <input
                type="range"
                className="w-full accent-indigo-600"
                min="0"
                max="20000"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>0 ₽</span>
                <span>20 000 ₽</span>
              </div>
            </div>
          </aside>

          {/* --- СЕТКА ТОВАРОВ --- */}
          <div className="flex-1">
            {/* Панель управления сеткой */}
            <div className="flex justify-between items-center mb-8 bg-slate-50 p-4 rounded-xl">
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded shadow-sm text-indigo-600">
                  <LayoutGrid size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <List size={20} />
                </button>
              </div>
              <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600">
                Сортировка <ChevronDown size={16} />
              </button>
            </div>

            {/* Товары */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xl font-black text-slate-900 mb-4">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors transform active:scale-95">
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Заглушка, если ничего не найдено */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg">
                  В этой категории пока нет товаров.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
