"use client";

import { useState } from "react";
import { Heart, Star, Filter, ChevronDown, LayoutGrid, List } from "lucide-react";

const cakes = [
  {
    id: 1,
    name: "Свадебный торт",
    price: 10500,
    category: "Свадебные",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
    rating: 4.9,
    description: "Многоярусный торт с мастикой",
  },
  {
    id: 2,
    name: "Шоколадный трюфель",
    price: 7900,
    category: "Шоколадные",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "Насыщенный шоколад с ганашем",
  },
  {
    id: 3,
    name: "Ягодный микс",
    price: 5400,
    category: "Ягодные",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
    rating: 4.7,
    description: "Свежие ягоды и лёгкий крем",
  },
  {
    id: 4,
    name: "Веганский чизкейк",
    price: 3500,
    category: "Веганские",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "Без молочных продуктов",
  },
  {
    id: 5,
    name: "Красный бархат",
    price: 7200,
    category: "Классические",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop",
    rating: 4.9,
    description: "Классический американский торт",
  },
  {
    id: 6,
    name: "Детский праздник",
    price: 5500,
    category: "Детские",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=600&fit=crop",
    rating: 4.6,
    description: "Яркий торт с фигурками",
  },
];

const categories = ["Все", "Свадебные", "Шоколадные", "Ягодные", "Веганские", "Классические", "Детские"];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");

  const filteredProducts = activeCategory === "Все"
    ? cakes
    : cakes.filter((c) => c.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      {/* --- ЗАГОЛОВОК --- */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Каталог тортов
          </h1>
          <p className="text-slate-600">
            Найдено {sortedProducts.length} тортов
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- ФИЛЬТРЫ --- */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
                <Filter size={18} /> Категории
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-rose-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-rose-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-4 text-slate-800">Цена</h3>
              <input
                type="range"
                className="w-full accent-rose-600"
                min="0"
                max="20000"
                step="500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>0 ₽</span>
                <span>20 000 ₽</span>
              </div>
            </div>
          </aside>

          {/* --- СЕТКА ТОВАРОВ --- */}
          <div className="flex-1">
            {/* Панель управления */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white rounded-2xl shadow-sm p-4 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-rose-100 text-rose-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition ${
                    viewMode === "list"
                      ? "bg-rose-100 text-rose-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">Сначала дешёвые</option>
                <option value="price-desc">Сначала дорогие</option>
              </select>
            </div>

            {/* Товары */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedProducts.map((cake) => (
                <div
                  key={cake.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-100 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative ${
                    viewMode === "list" ? "w-1/3" : "aspect-square"
                  } overflow-hidden bg-slate-100`}>
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 
                          `https://via.placeholder.com/400x400/fce7f3/f43f5e?text=${encodeURIComponent(cake.name)}`;
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-rose-600 shadow-sm">
                        {cake.category}
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:text-red-500 hover:scale-110 shadow-md">
                      <Heart size={18} />
                    </button>
                  </div>
                  
                  <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-slate-600">{cake.rating}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">
                      {cake.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">{cake.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-rose-600">
                        {cake.price.toLocaleString()} ₽
                      </p>
                      <button className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transform active:scale-95">
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl">
                <p className="text-slate-400 text-lg">В этой категории пока нет тортов.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}