"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import {
  User,
  Mail,
  Briefcase,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Edit2,
  Save,
} from "lucide-react";

interface MakerStats {
  totalOrders: number;
  completedOrders: number;
  rating: number;
  activeOrders: number;
}

export default function MakerProfilePage() {
  const router = useRouter();
  const { id, email, username, isAuthenticated, updateProfile } =
    useUserStore();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    middleName: "",
    skills: [] as string[],
  });

  const [stats, setStats] = useState<MakerStats>({
    totalOrders: 0,
    completedOrders: 0,
    rating: 0,
    activeOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        // Загружаем профиль
        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`,
          { credentials: "include" },
        );

        if (!profileRes.ok) throw new Error("Не удалось загрузить профиль");

        const profileData = await profileRes.json();

        setForm({
          name: profileData.name || "",
          email: profileData.email,
          surname: profileData.surname || "",
          middleName: profileData.middleName || "",
          skills: profileData.skills || [],
        });

        // Загружаем статистику (заглушка, потом сделаешь endpoint)
        setStats({
          totalOrders: 42,
          completedOrders: 38,
          rating: 4.8,
          activeOrders: 4,
        });
      } catch (err) {
        console.error(err);
        alert("Ошибка загрузки профиля");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // ← НЕ ОТПРАВЛЯЙ id и username!
            email: form.email,
            name: form.name,
            surname: form.surname,
            middleName: form.middleName,
          }),
          credentials: "include",
        },
      );

      const data = await response.json();

      if (data.success) {
        updateProfile({
          email: form.email,
          name: form.name,
          surname: form.surname,
          middleName: form.middleName,
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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-rose-50 to-white">
        <div className="text-slate-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-rose-600 to-pink-600 rounded-3xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Briefcase size={48} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {form.name} {form.surname}
              </h1>
              <p className="text-rose-100 text-lg">Кондитер CakeCraft</p>
              <p className="text-rose-200 text-sm">@{username}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="text-rose-600" size={24} />
              <span className="text-slate-600 text-sm">Всего заказов</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-emerald-600" size={24} />
              <span className="text-slate-600 text-sm">Выполнено</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.completedOrders}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-yellow-500" size={24} />
              <span className="text-slate-600 text-sm">Рейтинг</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.rating}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-blue-600" size={24} />
              <span className="text-slate-600 text-sm">Активных</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.activeOrders}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Info */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
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
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition"
                >
                  Отмена
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  disabled
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              {editMode && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {submitting ? "Сохранение..." : "Сохранить изменения"}
                </button>
              )}
            </form>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Быстрые действия
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/maker/orders")}
                  className="w-full flex items-center gap-3 p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition text-rose-700 font-semibold"
                >
                  <Briefcase size={20} />
                  <span>Мои заказы</span>
                </button>

                <button
                  onClick={() => router.push("/catalog")}
                  className="w-full flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition text-blue-700 font-semibold"
                >
                  <TrendingUp size={20} />
                  <span>Каталог тортов</span>
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition text-slate-700 font-semibold"
                >
                  <User size={20} />
                  <span>На главную</span>
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Мои навыки
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Свадебные торты",
                  "Детские торты",
                  "Веганские",
                  "Шоколадные",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
