"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Package, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface UserOrder {
  id: string;
  status:
    | "pending"
    | "accepted"
    | "in_progress"
    | "ready"
    | "completed"
    | "cancelled";
  createdAt: string;
  totalPrice: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    options?: {
      layers?: string[];
      fillings?: string[];
      decoration?: string;
      weight?: number;
      comment?: string;
    };
  }>;
  requestedDate?: string;
}

export default function UserOrdersPage() {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/my-orders`,
          {
            credentials: "include",
          },
        );

        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router]);

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        label: "Ожидает подтверждения",
        color: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      },
      accepted: {
        label: "Принят кондитером",
        color: "bg-blue-100 text-blue-700",
        icon: CheckCircle,
      },
      in_progress: {
        label: "В работе",
        color: "bg-purple-100 text-purple-700",
        icon: Package,
      },
      ready: {
        label: "Готов",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle,
      },
      completed: {
        label: "Выполнен",
        color: "bg-gray-100 text-gray-700",
        icon: CheckCircle,
      },
      cancelled: {
        label: "Отменен",
        color: "bg-red-100 text-red-700",
        icon: XCircle,
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Мои заказы</h1>
          <p className="text-slate-600">История ваших заказов и их статусы</p>
        </div>

        {/* Список заказов */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <Package className="mx-auto mb-6 text-slate-300" size={80} />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              У вас пока нет заказов
            </h2>
            <p className="text-slate-600 mb-8">
              Оформите свой первый заказ в каталоге или создайте торт в
              конструкторе
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/catalog"
                className="px-8 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-200"
              >
                Каталог тортов
              </Link>
              <Link
                href="/cake-builder"
                className="px-8 py-4 bg-white text-rose-600 border-2 border-rose-600 rounded-xl font-bold hover:bg-rose-50 transition"
              >
                Конструктор
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Шапка заказа */}
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 border-b border-rose-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${statusConfig.color}`}
                        >
                          <StatusIcon size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">
                            Заказ #{order.id.slice(-6).toUpperCase()}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(order.createdAt).toLocaleDateString(
                                "ru-RU",
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Товары */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-slate-100 last:border-0 pb-4 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900">
                              {item.name}
                            </h4>
                            <div className="text-right">
                              <p className="font-bold text-rose-600">
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                ₽
                              </p>
                              <p className="text-sm text-slate-500">
                                {item.quantity} шт. ×{" "}
                                {item.price.toLocaleString()} ₽
                              </p>
                            </div>
                          </div>

                          {/* Опции */}
                          {item.options && (
                            <div className="text-sm text-slate-600 space-y-1 ml-4">
                              {item.options.layers &&
                                item.options.layers.length > 0 && (
                                  <p>
                                    <strong>Коржи:</strong>{" "}
                                    {item.options.layers.join(", ")}
                                  </p>
                                )}
                              {item.options.fillings &&
                                item.options.fillings.length > 0 && (
                                  <p>
                                    <strong>Начинки:</strong>{" "}
                                    {item.options.fillings.join(", ")}
                                  </p>
                                )}
                              {item.options.decoration && (
                                <p>
                                  <strong>Декор:</strong>{" "}
                                  {item.options.decoration}
                                </p>
                              )}
                              {item.options.weight && (
                                <p>
                                  <strong>Вес:</strong> {item.options.weight} кг
                                </p>
                              )}
                              {item.options.comment && (
                                <p className="text-slate-500 italic">
                                  "{item.options.comment}"
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Итого */}
                    <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">
                        Итого:
                      </span>
                      <span className="text-3xl font-black text-rose-600">
                        {order.totalPrice.toLocaleString()} ₽
                      </span>
                    </div>

                    {/* Дата получения */}
                    {order.requestedDate && (
                      <div className="mt-4 p-4 bg-rose-50 rounded-xl">
                        <p className="text-sm text-slate-600">
                          <strong>Дата получения:</strong>{" "}
                          {new Date(order.requestedDate).toLocaleDateString(
                            "ru-RU",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
