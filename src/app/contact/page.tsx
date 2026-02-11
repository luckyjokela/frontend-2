"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Globe,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* --- ВЕРХНИЙ БЛОК --- */}
      <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Связаться с нами
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Есть вопросы по заказу или предложению? Наша команда поддержки
            готова помочь вам 24/7. Выберите удобный способ связи.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* --- КОЛОНКА ИНФОРМАЦИИ --- */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">Наши контакты</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Телефон
                    </p>
                    <p className="text-lg font-bold">8 (800) 555-35-35</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email</p>
                    <p className="text-lg font-bold">hello@store-next.ru</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Офис и шоурум
                    </p>
                    <p className="text-lg font-bold">Москва, ул. Дизайна, 12</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Clock size={18} className="text-indigo-600" /> Режим работы
              </h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex justify-between">
                  <span>Пн — Пт</span> <span>09:00 — 21:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Сб — Вс</span> <span>10:00 — 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- ФОРМА ОБРАТНОЙ СВЯЗИ --- */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <h3 className="text-3xl font-bold mb-8">Напишите нам</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Ваш Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Тема обращения
                </label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none">
                  <option>Вопрос по заказу</option>
                  <option>Сотрудничество</option>
                  <option>Возврат товара</option>
                  <option>Другое</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Сообщение
                </label>
                <textarea
                  rows={4}
                  placeholder="Как мы можем вам помочь?"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                ></textarea>
              </div>

              <button className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 group">
                Отправить{" "}
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- КАРТА (ЗАГЛУШКА) --- */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto h-[450px] rounded-[3rem] bg-slate-100 overflow-hidden relative border border-slate-200 shadow-inner">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <Globe size={48} className="mb-4 animate-bounce" />
            <p className="font-medium text-lg">
              Здесь будет ваша интерактивная карта (Google/Yandex)
            </p>
            <p className="text-sm">
              Москва, ул. Дизайна, 12, Бизнес-центр "Next"
            </p>
          </div>
          {/* Интеграция реальной карты через iframe или библиотеку будет здесь */}
        </div>
      </section>
    </div>
  );
}
