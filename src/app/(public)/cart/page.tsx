"use client";

import { useOrderStore } from "@/store/useOrderStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useOrderStore();
  const { isAuthenticated, id } = useUserStore();
  const router = useRouter();

const handleCheckout = async () => {
  if (!isAuthenticated) {
    router.push("/login");
    return;
  }

  try {
    // Берём первый товар из корзины (для демо)
    const firstItem = cartItems[0];
    
    // Определяем cakeType из названия
    const cakeTypeMap: Record<string, string> = {
      "Свадебный": "WEDDING",
      "Детский": "BIRTHDAY",
      "Шоколадный": "CHOCOLATE",
      "Ягодный": "FRUIT",
      "Веганский": "VEGAN",
      "Классический": "CUSTOM",
    };

    // Получаем тип торта
    let cakeType = "CUSTOM";
    for (const [key, value] of Object.entries(cakeTypeMap)) {
      if (firstItem.name.includes(key)) {
        cakeType = value;
        break;
      }
    }

    // Формируем заказ в формате backend
    const orderData = {
      customerId: id, // из useUserStore
      cakeType: cakeType,
      layers: firstItem.options?.layers || [],
      filling: firstItem.options?.fillings?.[0] || "", // ← ПЕРВЫЙ элемент массива!
      requestedDate: firstItem.options?.requestedDate || new Date().toISOString(),
    };

    console.log("Отправляем заказ:", orderData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        credentials: "include",
      },
    );

    if (response.ok) {
      alert("✅ Заказ успешно оформлен!");
      clearCart();
      router.push("/user/orders");
    } else {
      const error = await response.json();
      console.error("Ошибка backend:", error);
      alert(error.message || "Ошибка при оформлении заказа");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Произошла ошибка");
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 text-slate-300" size={80} />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Корзина пуста
          </h1>
          <p className="text-slate-600 mb-8">
            Добавьте торты из каталога или создайте свой в конструкторе
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/catalog"
              className="px-8 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-200"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/cake-builder"
              className="px-8 py-4 bg-white text-rose-600 border-2 border-rose-600 rounded-xl font-bold hover:bg-rose-50 transition"
            >
              Конструктор торта
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Корзина</h1>
          <p className="text-slate-600">
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "товар"
              : cartItems.length < 5
                ? "товара"
                : "товаров"}
          </p>
        </div>

        {/* Товары */}
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.cartId}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-6">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-2xl"
                  />
                )}

                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {item.name}
                  </h3>

                  {/* Опции торта */}
                  {item.options && (
                    <div className="text-sm text-slate-600 space-y-1 mb-4">
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
                          <strong>Декор:</strong> {item.options.decoration}
                        </p>
                      )}
                      {item.options.weight && (
                        <p>
                          <strong>Вес:</strong> {item.options.weight} кг
                        </p>
                      )}
                      {item.options.requestedDate && (
                        <p>
                          <strong>Дата:</strong>{" "}
                          {new Date(
                            item.options.requestedDate,
                          ).toLocaleDateString("ru-RU")}
                        </p>
                      )}
                      {item.options.comment && (
                        <p className="text-slate-500 italic">
                          "{item.options.comment}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Количество и цена */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity - 1)
                        }
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity + 1)
                        }
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-6">
                      <p className="text-2xl font-bold text-rose-600">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </p>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Итого и оформление */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl text-slate-600">Итого:</span>
            <span className="text-4xl font-black text-rose-600">
              {getCartTotal().toLocaleString()} ₽
            </span>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-linear-to-r from-rose-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-rose-700 hover:to-pink-700 transition shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
            >
              Оформить заказ
              <ArrowRight size={20} />
            </button>

            <Link
              href="/catalog"
              className="block w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-200 transition text-center"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
