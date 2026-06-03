"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/useOrderStore";
import { useUserStore } from "@/store/useUserStore";

const API_BASE = "/api";

export default function MakerOrdersPage() {
  interface Order {
    id: string;
    client: string;
    type: string;
    date: string;
    status: "new" | "accepted" | "ready";
  }

  const { makerOrders, setMakerOrders, updateOrderStatus } = useOrderStore();
  const { isAuthenticated } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/orders/maker`, {
          credentials: "include",
        });

        if (!res.ok) {
          setMakerOrders([]);
          return;
        }

        const data = await res.json();
        setMakerOrders(data.orders || []);
      } catch (err) {
        console.error(err);
        setMakerOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, setMakerOrders]);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/accept`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        updateOrderStatus(orderId, "accepted");
        alert("Заказ принят!");
      } else {
        alert("Ошибка при принятии заказа");
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка");
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/complete`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        updateOrderStatus(orderId, "ready");
        alert("Заказ отмечен как готовый!");
      } else {
        alert("Ошибка при обновлении статуса");
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  const statusMap: Record<string, { label: string; color: string }> = {
    new: { label: "Новый", color: "bg-blue-100 text-blue-700" },
    accepted: { label: "В работе", color: "bg-amber-100 text-amber-700" },
    ready: { label: "Готов", color: "bg-emerald-100 text-emerald-700" },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Лента заказов</h1>

        {makerOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">Пока нет заказов</p>
            <p className="text-gray-400 text-sm mt-2">
              Новые заказы появятся здесь
            </p>
          </div>
        ) : (
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
                {makerOrders.map((o: Order) => (
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
                        <button
                          onClick={() => handleAcceptOrder(o.id)}
                          className="bg-rose-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-rose-600"
                        >
                          Принять
                        </button>
                      )}
                      {o.status === "accepted" && (
                        <button
                          onClick={() => handleCompleteOrder(o.id)}
                          className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-600"
                        >
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
        )}
      </div>
    </div>
  );
}
