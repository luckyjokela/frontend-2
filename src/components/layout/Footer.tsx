export function SiteFooter() {
  return (
    <div className="Footer">
      <div className="bg-white text-slate-900 font-sans">
        <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-linear-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">К</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  Кейк Крафт
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Создаём торты мечты с любовью и вниманием к каждой детали.
                Индивидуальный подход и свежие ингредиенты.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Каталог</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>
                  <a href="/catalog" className="hover:text-rose-600">
                    Все торты
                  </a>
                </li>
                <li>
                  <a href="/cake-builder" className="hover:text-rose-600">
                    Конструктор
                  </a>
                </li>
                <li>
                  <a href="/new-arrivals" className="hover:text-rose-600">
                    Новинки
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Помощь</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>
                  <a href="/contact" className="hover:text-rose-600">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-600">
                    Оплата
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-rose-600">
                    О нас
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Подписка</h5>
              <p className="text-xs text-slate-500 mb-3">
                Получайте скидки и новости
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-l-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button className="bg-rose-600 text-white px-4 py-2 rounded-r-lg hover:bg-rose-700 transition">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} Кейк Крафт. Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SiteFooter;
