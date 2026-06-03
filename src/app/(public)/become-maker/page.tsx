"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function BecomeMakerPage() {
  const router = useRouter();
  const { id, updateRole } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleBecomeMaker = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/become-maker`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id }),
          credentials: "include",
        },
      );

      if (res.ok) {
        updateRole("maker"); // ← ОБНОВИТЬ РОЛЬ В STORE!

        alert("Теперь вы кондитер! Теперь вы можете принимать заказы.");
        router.push("/maker/profile");
      } else {
        alert("Ошибка при смене роли");
      }
    } catch (err) {
      alert("Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Стать кондитером
        </h1>
        <p className="text-slate-600 text-center mb-6">
          После этого вы сможете принимать заказы и работать с заказами
        </p>
        <button
          onClick={handleBecomeMaker}
          disabled={loading}
          className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50"
        >
          {loading ? "Обработка..." : "Подтвердить"}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full py-3 mt-2 text-slate-600 hover:text-slate-800"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
