"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Cake,
  Clock,
  Truck,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      {/* --- ВЕРХНИЙ БЛОК --- */}
      <section className="bg-gradient-to-r from-rose-900 via-pink-900 to-rose-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Связаться с нами
          </h1>
          <p className="text-rose-100 max-w-2xl text-lg">
            Есть вопросы по заказу торта или сотрудничеству? Наша команда
            кондитеров и менеджеров готова помочь вам. Выберите удобный способ
            связи.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* --- КОЛОНКА ИНФОРМАЦИИ --- */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                Наши контакты
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Телефон / WhatsApp
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      +7 (999) 123-45-67
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email</p>
                    <p className="text-lg font-bold text-slate-900">
                      hello@cakecraft.ru
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Кондитерская и пункт выдачи
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      г. Москва, ул. Сладкая, 15
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Зона доставки
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      Москва и МО в пределах МКАД
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-rose-100 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
                <Clock size={18} className="text-rose-600" /> Режим работы
              </h4>
              <ul className="text-sm text-slate-600 space-y-3">
                <li className="flex justify-between border-b border-rose-50 pb-2">
                  <span>Приём заказов</span>{" "}
                  <span className="font-medium text-slate-900">Ежедневно</span>
                </li>
                <li className="flex justify-between border-b border-rose-50 pb-2">
                  <span>Пн — Пт</span>{" "}
                  <span className="font-medium text-slate-900">
                    09:00 — 21:00
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Сб — Вс</span>{" "}
                  <span className="font-medium text-slate-900">
                    10:00 — 18:00
                  </span>
                </li>
                <li className="text-xs text-rose-600 mt-3 italic">
                  * Срочные заказы (менее 24 часов) обсуждаются индивидуально
                </li>
              </ul>
            </div>
          </div>

          {/* --- ФОРМА ОБРАТНОЙ СВЯЗИ --- */}
          <div className="lg:col-span-2 bg-white border border-rose-100 rounded-[2.5rem] p-8 md:p-12 shadow-lg shadow-rose-100/50">
            <h3 className="text-3xl font-bold mb-8 text-slate-900">
              Напишите нам
            </h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Анна"
                    className="w-full px-5 py-4 bg-rose-50/50 border border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Телефон или Email
                  </label>
                  <input
                    type="text"
                    placeholder="+7 (___) ___-__-__ или email@example.com"
                    className="w-full px-5 py-4 bg-rose-50/50 border border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Тип обращения
                </label>
                <select className="w-full px-5 py-4 bg-rose-50/50 border border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all appearance-none text-slate-900">
                  <option>Вопрос по заказу торта</option>
                  <option>Консультация по конструктору</option>
                  <option>Сотрудничество / Опт</option>
                  <option>Отзыв или предложение</option>
                  <option>Другое</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Сообщение
                </label>
                <textarea
                  rows={4}
                  placeholder="Опишите, какой торт вы хотите заказать, или задайте ваш вопрос..."
                  className="w-full px-5 py-4 bg-rose-50/50 border border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none text-slate-900 placeholder:text-slate-400"
                ></textarea>
              </div>

              <button className="w-full md:w-auto px-10 py-5 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-200 transition-all flex items-center justify-center gap-3 group">
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

      {/* --- ИНФО-БЛОК --- */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-rose-100 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Cake className="mx-auto mb-4 text-rose-600" size={40} />
              <h4 className="font-bold text-slate-900 mb-2">
                Индивидуальный подход
              </h4>
              <p className="text-sm text-slate-600">
                Поможем подобрать идеальный торт под ваш праздник и бюджет
              </p>
            </div>
            <div className="p-6 border-l border-rose-100 md:border-l md:border-t-0 md:border-t border-rose-100">
              <Truck className="mx-auto mb-4 text-rose-600" size={40} />
              <h4 className="font-bold text-slate-900 mb-2">
                Доставка ко времени
              </h4>
              <p className="text-sm text-slate-600">
                Привезём торт точно к началу вашего мероприятия
              </p>
            </div>
            <div className="p-6 border-l border-rose-100 md:border-l md:border-t-0 md:border-t border-rose-100">
              <MessageSquare className="mx-auto mb-4 text-rose-600" size={40} />
              <h4 className="font-bold text-slate-900 mb-2">Поддержка 24/7</h4>
              <p className="text-sm text-slate-600">
                Отвечаем на вопросы в мессенджерах и по телефону
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
