import { Heart, ArrowRight, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Стильные Часы",
    price: "12 500 ₽",
    category: "Аксессуары",
    image: "https://images.unsplash.com",
  },
  {
    id: 2,
    name: "Беспроводные Наушники",
    price: "8 900 ₽",
    category: "Электроника",
    image: "https://images.unsplash.com",
  },
  {
    id: 3,
    name: "Кожаный Рюкзак",
    price: "5 400 ₽",
    category: "Сумки",
    image: "https://images.unsplash.com",
  },
  {
    id: 4,
    name: "Умная Колонка",
    price: "15 000 ₽",
    category: "Электроника",
    image: "https://images.unsplash.com",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
    
      {/* --- HERO СЕКЦИЯ --- */}
      <div className="hero-content">
        <section className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-4">
                Новая коллекция {new Date().getFullYear()}
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                Вещи, которые{" "}
                <span className="text-indigo-600">вдохновляют</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Откройте для себя тщательно отобранные товары премиального
                качества с быстрой доставкой по всей стране.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2 group shadow-lg shadow-indigo-200">
                  В магазин{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
                <button className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition">
                  Узнать больше
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com"
                  alt="Main product"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- КАТАЛОГ ТОВАРОВ --- */}
      <section className="products-catalog">
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Популярные товары</h2>
              <p className="text-slate-500">
                То, что наши покупатели выбирают чаще всего
              </p>
            </div>
            <a
              href="#"
              className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline"
            >
              Смотреть все <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:text-red-500">
                    <Heart size={18} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:text-white transition">
                      В корзину
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-slate-800">{product.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-medium text-slate-500">
                        4.8
                      </span>
                    </div>
                  </div>
                  <p className="font-bold text-indigo-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ПРЕИМУЩЕСТВА --- */}
      <section className="our-benefits">
        <div className="bg-indigo-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="text-white">
              <h4 className="text-xl font-bold mb-2">Бесплатная доставка</h4>
              <p className="text-indigo-200 text-sm">
                На все заказы свыше 5000 рублей
              </p>
            </div>
            <div className="text-white border-y md:border-y-0 md:border-x border-indigo-800 py-8 md:py-0">
              <h4 className="text-xl font-bold mb-2">Гарантия возврата</h4>
              <p className="text-indigo-200 text-sm">
                30 дней на обмен или возврат денежных средств
              </p>
            </div>
            <div className="text-white">
              <h4 className="text-xl font-bold mb-2">Поддержка 24/7</h4>
              <p className="text-indigo-200 text-sm">
                Мы всегда на связи, чтобы помочь вам
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
