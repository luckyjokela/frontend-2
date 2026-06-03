import { create } from "zustand";
import { persist } from "zustand/middleware";

// Типы для заказа
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: {
    layers?: string[];
    fillings?: string[];
    decoration?: string;
    weight?: number;
    comment?: string;
    requestedDate?: string;
  };
}

export interface CartItem extends OrderItem {
  cartId: string; // Уникальный ID для корзины
}

interface OrderState {
  // Корзина
  cartItems: CartItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Оформленные заказы
  orders: any[];
  setOrders: (orders: any[]) => void;
  addOrder: (order: any) => void;

  // Заказы для кондитера
  makerOrders: any[];
  setMakerOrders: (orders: any[]) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      // Корзина
      cartItems: [],

      addToCart: (item) => {
        set((state) => {
          // Проверяем есть ли уже такой товар с такими же опциями
          const existingIndex = state.cartItems.findIndex(
            (cartItem) =>
              cartItem.id === item.id &&
              JSON.stringify(cartItem.options) === JSON.stringify(item.options),
          );

          if (existingIndex >= 0) {
            // Увеличиваем количество
            const updatedItems = [...state.cartItems];
            updatedItems[existingIndex].quantity += item.quantity;
            return { cartItems: updatedItems };
          } else {
            // Добавляем новый товар
            return {
              cartItems: [
                ...state.cartItems,
                { ...item, cartId: `${item.id}-${Date.now()}` },
              ],
            };
          }
        });
      },

      removeFromCart: (cartId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.cartId !== cartId),
        }));
      },

      updateQuantity: (cartId, quantity) => {
        if (quantity < 1) return;

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.cartId === cartId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getCartCount: () => {
        return get().cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        );
      },

      // Оформленные заказы
      orders: [],

      setOrders: (orders) => {
        set({ orders });
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
          cartItems: [], // Очищаем корзину после заказа
        }));
      },

      // Заказы для кондитера
      makerOrders: [],

      setMakerOrders: (orders) => {
        set({ makerOrders: orders });
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          makerOrders: state.makerOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order,
          ),
        }));
      },
    }),
    {
      name: "cakecraft-orders", // localStorage key
    },
  ),
);
