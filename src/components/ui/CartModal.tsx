// src/components/ui/CartModal.tsx
"use client";

import { useEffect } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } =
    useOrderStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-rose-600" size={24} />
            <h2 className="text-xl font-bold text-slate-900">Корзина</h2>
            <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto mb-4 text-slate-300" size={48} />
              <p className="text-slate-500">Корзина пуста</p>
              <Link
                href="/catalog"
                onClick={onClose}
                className="text-rose-600 font-semibold mt-2 inline-block hover:underline"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-4 bg-slate-50 p-4 rounded-2xl"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-rose-600 font-bold mt-1">
                    {item.price.toLocaleString()} ₽
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                      className="p-1 bg-white rounded-lg hover:bg-slate-200 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold text-slate-900 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                      className="p-1 bg-white rounded-lg hover:bg-slate-200 transition"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-100 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Итого:</span>
              <span className="text-2xl font-black text-rose-600">
                {getCartTotal().toLocaleString()} ₽
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-center hover:bg-rose-700 transition shadow-lg shadow-rose-200"
            >
              Оформить заказ
            </Link>
            <Link
              href="/catalog"
              onClick={onClose}
              className="block text-center text-slate-600 font-semibold hover:text-rose-600 transition"
            >
              Продолжить покупки
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
