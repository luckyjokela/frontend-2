"use client";

import { Heart, ArrowRight, Star, Truck, Shield, Clock } from "lucide-react";

const cakes = [
  {
    id: 1,
    name: "Свадебный торт",
    price: "10 500 ₽",
    category: "Свадебные",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Шоколадный трюфель",
    price: "7 900 ₽",
    category: "Шоколадные",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ягодный микс",
    price: "5 400 ₽",
    category: "Ягодные",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Веганский чизкейк",
    price: "3 500 ₽",
    category: "Веганские",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
    rating: 4.8,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* --- HERO СЕКЦИЯ --- */}
      <div className="hero-content">
        <section className="relative bg-linear-to-br from-pink-50 via-rose-50 to-white py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10 order-2 md:order-1">
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold mb-4">
                Новая коллекция {new Date().getFullYear()}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Торты, которые{" "}
                <span className="text-rose-600">вдохновляют</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 max-w-lg leading-relaxed">
                Создаём уникальные торты на заказ с любовью и вниманием к
                деталям. Свежие ингредиенты, индивидуальный дизайн и доставка по
                всей стране.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition flex items-center justify-center gap-2 group shadow-lg shadow-rose-200">
                  Создать свой торт{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition">
                  Смотреть каталог
                </button>
              </div>
            </div>
            <div className="relative order-1 md:order-2 mb-8 md:mb-0">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-50 hidden sm:block"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop"
                  alt="Главный торт"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/600x400/f43f5e/ffffff?text=CakeCraft";
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- КАТАЛОГ ТОРТОВ --- */}
      <section className="products-catalog">
        <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Популярные торты
              </h2>
              <p className="text-slate-500 text-sm sm:text-base">
                То, что наши клиенты выбирают чаще всего
              </p>
            </div>
            <a
              href="/catalog"
              className="text-rose-600 font-semibold flex items-center gap-1 hover:underline text-sm sm:text-base"
            >
              Смотреть все <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {cakes.map((cake) => (
              <div key={cake.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x400/f1f5f9/f43f5e?text=" +
                        encodeURIComponent(cake.name);
                    }}
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:text-red-500 hover:bg-white shadow-md">
                    <Heart size={18} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300 bg-gradient-to-t from-black/70 to-transparent">
                    <button className="w-full py-2.5 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-rose-600 hover:text-white transition shadow-lg">
                      В корзину
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">
                      {cake.category}
                    </p>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      {cake.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-medium text-slate-500">
                        {cake.rating}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold text-rose-600 text-sm sm:text-base ml-2">
                    {cake.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ПРЕИМУЩЕСТВА --- */}
      <section className="our-benefits">
        <div className="bg-linear-to-r from-rose-900 via-pink-900 to-rose-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
            <div className="text-white">
              <Truck className="mx-auto mb-3 sm:mb-4" size={36} />
              <h4 className="text-lg sm:text-xl font-bold mb-2">
                Бесплатная доставка
              </h4>
              <p className="text-rose-200 text-xs sm:text-sm">
                При заказе от 5000 рублей по всему городу
              </p>
            </div>
            <div className="text-white border-y md:border-y-0 md:border-x border-rose-800 py-6 md:py-0">
              <Shield className="mx-auto mb-3 sm:mb-4" size={36} />
              <h4 className="text-lg sm:text-xl font-bold mb-2">
                Гарантия свежести
              </h4>
              <p className="text-rose-200 text-xs sm:text-sm">
                Только свежие ингредиенты и натуральные продукты
              </p>
            </div>
            <div className="text-white">
              <Clock className="mx-auto mb-3 sm:mb-4" size={36} />
              <h4 className="text-lg sm:text-xl font-bold mb-2">
                Поддержка 24/7
              </h4>
              <p className="text-rose-200 text-xs sm:text-sm">
                Поможем с выбором и ответим на все вопросы
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
