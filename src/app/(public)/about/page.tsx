"use client";

import { Cake, Heart, Award, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white">
      {/* --- ШАПКА / КНОПКА НАЗАД --- */}
      <nav className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> На главную
        </Link>
      </nav>

      {/* --- HERO СЕКЦИЯ --- */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Мы создаём торты, которые{" "}
            <span className="text-rose-600">вдохновляют</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            CakeCraft — это не просто кондитерская. Это место, где рождаются
            сладкие шедевры. Мы начали в 2022 году с небольшой домашней кухни, а
            сегодня радуем тысячи клиентов по всей стране.
          </p>
        </div>
      </section>

      {/* --- ИЗОБРАЖЕНИЕ И ИСТОРИЯ --- */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-rose-400 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
              alt="Наша команда кондитеров"
              className="relative rounded-2xl shadow-xl object-cover h-96 w-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x600/fce7f3/f43f5e?text=Наша+команда";
              }}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Наша история</h2>
            <p className="text-slate-600 italic border-l-4 border-rose-600 pl-4">
              "Всё началось с мечты создать идеальный свадебный торт, который
              запомнится на всю жизнь."
            </p>
            <p className="text-slate-600">
              За 4 года мы испекли более 5000 тортов, отточили десятки рецептов
              и создали команду талантливых кондитеров. Наша цель — сделать так,
              чтобы каждый праздник стал особенным благодаря вкусному и
              красивому торту.
            </p>
          </div>
        </div>
      </section>

      {/* --- ЦЕННОСТИ --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Наши ценности</h2>
          <div className="w-20 h-1.5 bg-rose-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Cake className="text-rose-600" size={32} />,
              title: "Качество",
              desc: "Только свежие ингредиенты и натуральные продукты. Никаких искусственных добавок.",
            },
            {
              icon: <Heart className="text-rose-600" size={32} />,
              title: "Любовь к делу",
              desc: "Каждый торт мы создаём с душой и вниманием к деталям.",
            },
            {
              icon: <Award className="text-rose-600" size={32} />,
              title: "Мастерство",
              desc: "Наши кондитеры постоянно совершенствуют навыки и изучают новые техники.",
            },
            {
              icon: <Clock className="text-rose-600" size={32} />,
              title: "Надёжность",
              desc: "Всегда доставляем вовремя. Ваш праздник не будет испорчен.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-rose-100 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4 p-3 bg-rose-50 w-fit rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ЦИФРЫ --- */}
      <section className="bg-linear-to-r from-rose-600 via-pink-600 to-rose-600 py-16 mb-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-1">5000+</div>
            <div className="text-rose-100 text-sm">Испечённых тортов</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-1">15+</div>
            <div className="text-rose-100 text-sm">
              Профессиональных кондитеров
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-1">98%</div>
            <div className="text-rose-100 text-sm">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-1">4 года</div>
            <div className="text-rose-100 text-sm">Опыта работы</div>
          </div>
        </div>
      </section>

      {/* --- ПРИЗЫВ К ДЕЙСТВИЮ --- */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 opacity-20 blur-[100px]"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Готовы заказать свой идеальный торт?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/cake-builder"
              className="inline-block px-10 py-5 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-colors shadow-2xl"
            >
              Создать свой торт
            </Link>
            <Link
              href="/catalog"
              className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-colors shadow-2xl"
            >
              Выбрать из каталога
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
