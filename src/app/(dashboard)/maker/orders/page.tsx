export default function MakerOrdersPage() {
  const orders = [
    {
      id: "ORD-1042",
      client: "Иванова А.",
      type: "Свадебный (2 яруса)",
      date: "25.05.2026",
      status: "new",
    },
    {
      id: "ORD-1041",
      client: "Петров С.",
      type: "Детский (Мишка)",
      date: "22.05.2026",
      status: "accepted",
    },
    {
      id: "ORD-1039",
      client: "Сидорова М.",
      type: "Юбилейный",
      date: "20.05.2026",
      status: "ready",
    },
    {
      id: "ORD-1035",
      client: "Козлов Д.",
      type: "Веганский",
      date: "18.05.2026",
      status: "new",
    },
  ];

  const statusMap: Record<string, { label: string; color: string }> = {
    new: { label: "Новый", color: "bg-blue-100 text-blue-700" },
    accepted: { label: "В работе", color: "bg-amber-100 text-amber-700" },
    ready: { label: "Готов", color: "bg-emerald-100 text-emerald-700" },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Лента заказов</h1>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4">№ Заказа</th>
                <th className="p-4">Клиент</th>
                <th className="p-4">Тип торта</th>
                <th className="p-4">Дата сдачи</th>
                <th className="p-4">Статус</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-mono text-sm text-gray-600">
                    {o.id}
                  </td>
                  <td className="p-4 font-medium">{o.client}</td>
                  <td className="p-4">{o.type}</td>
                  <td className="p-4 text-gray-500">{o.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusMap[o.status].color}`}
                    >
                      {statusMap[o.status].label}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {o.status === "new" && (
                      <button className="bg-rose-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-rose-600">
                        Принять
                      </button>
                    )}
                    {o.status === "accepted" && (
                      <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-600">
                        Отметить готовым
                      </button>
                    )}
                    {o.status === "ready" && (
                      <span className="text-gray-400 text-sm">Завершён</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
