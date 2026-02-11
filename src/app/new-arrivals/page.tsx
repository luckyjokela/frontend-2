"use client";
import { Sparkles, ShoppingBag, Heart, Share2, Timer } from "lucide-react";
import Link from "next/link";

const newProducts = [
  {
    id: 101,
    name: 'Лимитированная Куртка "Future"',
    price: "24 900 ₽",
    tag: "Exclusive",
    image: "https://images.unsplash.com",
  },
  {
    id: 102,
    name: "Кроссовки Urban Runner",
    price: "18 200 ₽",
    tag: "New Drop",
    image: "https://images.unsplash.com",
  },
  {
    id: 103,
    name: "Сумка-мессенджер Tech",
    price: "7 500 ₽",
    tag: "New",
    image: "https://images.unsplash.com",
  },
  {
    id: 104,
    name: 'Очки "Night Vision"',
    price: "11 000 ₽",
    tag: "Limited",
    image: "https://images.unsplash.com",
  },
];

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* --- ГЛЯНЦЕВЫЙ ХЕДЕР --- */}
      <section className="relative py-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-50"></div>

        <div className="max-w-8xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 mb-6 animate-pulse">
            <Sparkles size={16} />
            <span className="text-sm font-bold tracking-widest uppercase">
              Поступление недели
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase leading-[0.9]">
            <span className="inline-block text-white">Fresh</span>{" "}
            {/* Добавляем px-4, чтобы буквы не обрезались по бокам */}
            <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 px-4 py-2 -mx-4">
              Drops
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Самые горячие новинки сезона уже здесь. Будь первым, кто примерит
            будущее.
          </p>
        </div>
      </section>

      {/* --- СЕТКА НОВИНОК --- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative flex flex-col ${index % 2 !== 0 ? "md:mt-24" : ""}`}
            >
              {/* Карточка изображения */}
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-slate-900 border border-white/5 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Overlay элементы */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1 bg-white text-black font-black text-xs uppercase tracking-tighter rounded-full">
                    {product.tag}
                  </span>
                </div>

                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition">
                    <Share2 size={20} />
                  </button>
                </div>

                <div className="absolute inset-x-6 bottom-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl">
                    <ShoppingBag size={20} /> Быстрая покупка
                  </button>
                </div>
              </div>

              {/* Инфо */}
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Timer size={14} />
                    <span>Доступно в 3 цветах</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BANNER --- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto rounded-[3rem] border border-white/10 p-12 md:p-24 flex flex-col items-center text-center bg-[url('https://www.transparenttextures.com')] bg-indigo-900/20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Не пропусти следующий дроп
          </h2>
          <p className="text-slate-400 mb-10 max-w-lg italic">
            Подпишись на нашу секретную рассылку, чтобы получать уведомления о
            новинках за час до официального релиза.
          </p>
          <div className="flex w-full max-w-md bg-white/5 border border-white/10 p-2 rounded-2xl focus-within:border-indigo-500 transition">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-none focus:ring-0 flex-1 px-4 text-white"
            />
            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-indigo-400 hover:text-white transition">
              Join
            </button>
          </div>
        </div>
      </section>

      {/* --- КНОПКА В КАТАЛОГ --- */}
      <div className="pb-20 text-center">
        <Link
          href="/catalog"
          className="text-slate-500 hover:text-white underline underline-offset-8 transition font-medium"
        >
          Перейти в полный каталог товаров
        </Link>
      </div>
    </div>
  );
}
