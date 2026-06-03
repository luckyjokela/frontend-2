export default function AdminPanelPage() {
  const stats = [
    { label: "Всего заказов", value: "808", change: "+12%", icon: "📦" },
    { label: "Выручка (мес)", value: "225 000 ₽", change: "+8%", icon: "💰" },
    { label: "Активных клиентов", value: "142", change: "+24", icon: "" },
    {
      label: "Кондитеров онлайн",
      value: "12",
      change: "3 offline",
      icon: "🍳",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Анна Смирнова",
      email: "anna@mail.ru",
      role: "Клиент",
      joined: "12.01.2026",
    },
    {
      id: 2,
      name: "Дмитрий Козлов",
      email: "d.kozlov@gmail.com",
      role: "Кондитер",
      joined: "05.03.2026",
    },
    {
      id: 3,
      name: "Елена Волкова",
      email: "elena.v@yandex.ru",
      role: "Клиент",
      joined: "22.04.2026",
    },
    {
      id: 4,
      name: "Игорь Петров",
      email: "igor.p@mail.ru",
      role: "Кондитер",
      joined: "18.05.2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Панель администратора
        </h1>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex justify-between items-start mb-2">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {s.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Таблица пользователей */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-bold text-lg mb-4 text-gray-700">
            Последние регистрации
          </h2>
          <table className="w-full text-left">
            <thead className="text-gray-500 text-sm border-b">
              <tr>
                <th className="pb-3 font-medium">Имя</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Роль</th>
                <th className="pb-3 font-medium">Дата регистрации</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{u.name}</td>
                  <td className="py-3 text-gray-500 text-sm">{u.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${u.role === "Кондитер" ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-600"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500 text-sm">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
