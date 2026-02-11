import { Target, Users, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* --- ШАПКА / КНОПКА НАЗАД --- */}
      <nav className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> На главную
        </Link>
        <Link href="/Contact"></Link>
      </nav>

      {/* --- HERO СЕКЦИЯ --- */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Мы верим, что <span className="text-indigo-600">качество</span> должно быть доступным
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            STORE. — это не просто магазин. Это проект, рожденный из страсти к эстетике и функциональности. Мы начали в 2020 году как маленькая студия, а сегодня объединяем тысячи ценителей стиля по всему миру.
          </p>
        </div>
      </section>

      {/* --- ИЗОБРАЖЕНИЕ И ИСТОРИЯ --- */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src="https://images.unsplash.com" 
              alt="Наша команда" 
              className="relative rounded-2xl shadow-xl object-cover h-[400px] w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Наша история</h2>
            <p className="text-slate-600 italic border-l-4 border-indigo-600 pl-4">
              "Всё началось с поиска идеального рюкзака, который мы так и не смогли найти в обычных магазинах."
            </p>
            <p className="text-slate-600">
              За 4 года мы отобрали более 500 уникальных позиций, проверили сотни фабрик и выстроили логистику, которая позволяет доставлять заказы за считанные дни. Наша цель — сделать так, чтобы процесс покупки приносил удовольствие.
            </p>
          </div>
        </div>
      </section>

      {/* --- ЦЕННОСТИ --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Наши ценности</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: <Target className="text-indigo-600" />, title: "Цель", desc: "Создавать вещи, которыми хочется пользоваться ежедневно." },
            { icon: <ShieldCheck className="text-indigo-600" />, title: "Качество", desc: "Каждый товар проходит трехэтапную проверку перед отправкой." },
            { icon: <Users className="text-indigo-600" />, title: "Люди", desc: "Мы ценим каждого клиента и всегда готовы пойти навстречу." },
            { icon: <Zap className="text-indigo-600" />, title: "Скорость", desc: "Быстрая обработка заказов и доставка в срок." },
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 p-3 bg-indigo-50 w-fit rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ЦИФРЫ --- */}
      <section className="bg-indigo-600 py-16 mb-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-1">10k+</div>
            <div className="text-indigo-100 text-sm">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-1">50+</div>
            <div className="text-indigo-100 text-sm">Брендов-партнеров</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-1">24/7</div>
            <div className="text-indigo-100 text-sm">Поддержка покупателей</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-1">150+</div>
            <div className="text-indigo-100 text-sm">Городов доставки</div>
          </div>
        </div>
      </section>

      {/* --- ПРИЗЫВ К ДЕЙСТВИЮ --- */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-20 blur-[100px]"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Готовы обновить свой стиль?
          </h2>
          <Link 
            href="/" 
            className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-2xl relative z-10"
          >
            Перейти к покупкам
          </Link>
        </div>
      </section>
    </div>
  );
}
