export function SiteFooter() {
  return (
    <div className="Footer">
      <div className=" bg-white text-slate-900 font-sans">
        <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-bold tracking-tight mb-6 block">
                STORE.
              </span>
              <p className="text-slate-500 text-sm leading-relaxed">
                Лучший магазин для поиска уникальных вещей. Мы верим в качество
                и стиль.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Магазин</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Все товары
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Скидки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Отзывы
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Помощь</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Оплата
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Подписка</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-l-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} Store Inc. Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SiteFooter;
