"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { id, email, username, isAuthenticated, updateProfile } =
    useUserStore();

  const [form, setForm] = useState({
    email: "",
    username: "",
    name: "",
    middleName: "",
    surname: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //     return;
  //   }

  //   const fetchProfile = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`,
  //         { credentials: "include" },
  //       );

  //       if (!res.ok) throw new Error("Не удалось загрузить профиль");

  //       const data = await res.json();

  //       setForm({
  //         email: data.email,
  //         username: data.username,
  //         name: data.name,
  //         middleName: data.middleName || "",
  //         surname: data.surname,
  //       });
  //     } catch (err) {
  //       console.error(err);
  //       alert("Ошибка загрузки профиля");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, [isAuthenticated, router]);

  useEffect(() => {
    // Для демо: загружаем профиль если есть данные, иначе моковые
    if (!isAuthenticated || isAuthenticated) {
  //     fetchProfile(
        //         const data = await res.json();

        // setForm({
        //   email: data.email,
        //   username: data.username,
        //   name: data.name,
        //   middleName: data.middleName || "",
        //   surname: data.surname,
        // });
  //     );
    } else {
      // Моковые данные для демо
      setForm({
        email: "demo@cakecraft.ru",
        username: "DemoUser",
        name: "Демо",
        middleName: "",
        surname: "Пользователь",
      });
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...form }),
          credentials: "include",
        },
      );

      const data = await response.json();

      if (data.success) {
        updateProfile({
          email: form.email,
          username: form.username,
          name: form.name,
          middleName: form.middleName,
          surname: form.surname,
        });
        alert("Профиль обновлён!");
        setEditMode(false);
      } else {
        alert(data.error || "Ошибка при сохранении");
      }
    } catch (err) {
      alert("Произошла ошибка");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-white">
        <div className="text-slate-600">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div>Перенаправление...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-rose-600 to-pink-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User size={40} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {form.name} {form.surname}
                </h1>
                <p className="text-rose-100">@{form.username}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Личная информация
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-semibold hover:bg-rose-100 transition"
                >
                  <Edit2 size={18} /> Редактировать
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditMode(false);
                    // Reset form logic here if needed
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition"
                >
                  Отмена
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Имя
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 disabled:bg-slate-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    value={form.surname}
                    onChange={(e) =>
                      setForm({ ...form, surname: e.target.value })
                    }
                    disabled={!editMode}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 disabled:bg-slate-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Отчество
                </label>
                <input
                  type="text"
                  value={form.middleName}
                  onChange={(e) =>
                    setForm({ ...form, middleName: e.target.value })
                  }
                  disabled={!editMode}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 disabled:bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  disabled={!editMode}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 disabled:bg-slate-50"
                  required
                />
              </div>

              {editMode && (
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    {submitting ? "Сохранение..." : "Сохранить изменения"}
                  </button>
                </div>
              )}
            </form>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">
                Быстрые действия
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  href="/change-password"
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition text-slate-700"
                >
                  <Lock size={20} className="text-rose-600" />
                  <span className="font-medium">Изменить пароль</span>
                </Link>
                <Link
                  href="/user/orders"
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition text-slate-700"
                >
                  <Calendar size={20} className="text-rose-600" />
                  <span className="font-medium">Мои заказы</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
