"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  AlertCircle,
} from "lucide-react";

const CAKE_TYPES = [
  { id: 1, name: "Классический", price: 2500, image: "🎂" },
  { id: 2, name: "Свадебный", price: 5500, image: "💒" },
  { id: 3, name: "Детский", price: 3500, image: "🎈" },
  { id: 4, name: "Шоколадный", price: 4500, image: "🍫" },
  { id: 5, name: "Ягодный", price: 4200, image: "🍓" },
  { id: 6, name: "Веганский", price: 4800, image: "🌱" },
];

const LAYERS = [
  { id: 1, name: "Ванильный бисквит", price: 0 },
  { id: 2, name: "Шоколадный бисквит", price: 200 },
  { id: 3, name: "Красный бархат", price: 300 },
  { id: 4, name: "Медовик", price: 250 },
  { id: 5, name: "Наполеон", price: 350 },
];

const FILLINGS = [
  { id: 1, name: "Крем-чиз", price: 0 },
  { id: 2, name: "Шоколадный ганаш", price: 300 },
  { id: 3, name: "Ягодное конфи", price: 350 },
  { id: 4, name: "Карамель", price: 250 },
  { id: 5, name: "Фруктовый мусс", price: 400 },
  { id: 6, name: "Ореховая паста", price: 450 },
];

const DECORATIONS = [
  { id: 1, name: "Без декора", price: 0 },
  { id: 2, name: "Свежие ягоды", price: 500 },
  { id: 3, name: "Макаронс", price: 600 },
  { id: 4, name: "Шоколадные подтеки", price: 400 },
  { id: 5, name: "Цветы", price: 700 },
  { id: 6, name: "Фигурки", price: 800 },
];

export default function CakeBuilder() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedLayers, setSelectedLayers] = useState<number[]>([1]);
  const [selectedFillings, setSelectedFillings] = useState<number[]>([1]);
  const [selectedDecoration, setSelectedDecoration] = useState<number>(1);
  const [weight, setWeight] = useState<number>(2);
  const [date, setDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Минимальная дата (сегодня) с учётом часового пояса
  const minDate = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Расчёт цены с оптимизацией
  const totalPrice = useMemo(() => {
    if (!selectedType) return 0;
    const typePrice = CAKE_TYPES.find((t) => t.id === selectedType)?.price || 0;
    const layersPrice = selectedLayers.reduce(
      (sum, id) => sum + (LAYERS.find((l) => l.id === id)?.price || 0),
      0,
    );
    const fillingsPrice = selectedFillings.reduce(
      (sum, id) => sum + (FILLINGS.find((f) => f.id === id)?.price || 0),
      0,
    );
    const decorationPrice =
      DECORATIONS.find((d) => d.id === selectedDecoration)?.price || 0;
    return (typePrice + layersPrice + fillingsPrice + decorationPrice) * weight;
  }, [
    selectedType,
    selectedLayers,
    selectedFillings,
    selectedDecoration,
    weight,
  ]);

  const handleAddLayer = useCallback(
    (id: number) => {
      if (selectedLayers.length < 4 && !selectedLayers.includes(id)) {
        setSelectedLayers((prev) => [...prev, id]);
      }
    },
    [selectedLayers],
  );

  const handleRemoveLayer = useCallback(
    (index: number) => {
      if (selectedLayers.length > 1) {
        setSelectedLayers((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [selectedLayers],
  );

  const handleAddFilling = useCallback(
    (id: number) => {
      if (selectedFillings.length < 3 && !selectedFillings.includes(id)) {
        setSelectedFillings((prev) => [...prev, id]);
      }
    },
    [selectedFillings],
  );

  const handleRemoveFilling = useCallback(
    (index: number) => {
      if (selectedFillings.length > 1) {
        setSelectedFillings((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [selectedFillings],
  );

  const handleSubmit = async () => {
    if (!date) {
      setError("Укажите дату получения");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // Формируем данные заказа
      const orderData = {
        cakeType: selectedType,
        layers: selectedLayers,
        fillings: selectedFillings,
        decoration: selectedDecoration,
        weight,
        requestedDate: date,
        comment: comment.trim(), // <-- Поле для пожеланий
        totalPrice,
      };

      // Здесь будет fetch к твоему API
      // const res = await fetch("/api/orders", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(orderData)
      // });

      // Для демо просто эмулируем задержку
      await new Promise((res) => setTimeout(res, 800));
      alert("✅ Заказ успешно создан! (Демо-режим)");

      // Сброс формы при успехе
      setStep(1);
      setSelectedType(null);
      setSelectedLayers([1]);
      setSelectedFillings([1]);
      setSelectedDecoration(1);
      setWeight(2);
      setDate("");
      setComment(""); // <-- Очищаем комментарий
    } catch (err) {
      setError("Ошибка при оформлении. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedType !== null;
    if (step === 4) return date !== "";
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Конструктор торта
          </h1>
          <p className="text-slate-600">
            Создайте свой идеальный торт за 4 шага
          </p>
        </div>

        {/* Прогресс */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-rose-500" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-slate-500 font-medium">
            <span>Тип</span>
            <span>Коржи</span>
            <span>Начинка</span>
            <span>Детали</span>
          </div>
        </div>

        {/* Контент шага */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 min-h-[400px]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-slate-800">
                Выберите тип торта
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CAKE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedType === type.id
                        ? "border-rose-500 bg-rose-50 scale-[1.02]"
                        : "border-slate-200 hover:border-rose-300"
                    }`}
                  >
                    <div className="text-4xl mb-2">{type.image}</div>
                    <h3 className="font-semibold text-slate-800">
                      {type.name}
                    </h3>
                    <p className="text-rose-600 font-bold mt-1">
                      от {type.price} ₽
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-slate-800">
                Выберите коржи
              </h2>
              <p className="text-center text-slate-500 text-sm">
                Можно добавить до 4 коржей
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LAYERS.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => handleAddLayer(layer.id)}
                    className={`p-4 rounded-xl border-2 flex justify-between items-center transition ${
                      selectedLayers.includes(layer.id)
                        ? "border-rose-500 bg-rose-50"
                        : "border-slate-200"
                    }`}
                  >
                    <span className="font-medium text-slate-800">
                      {layer.name}
                    </span>
                    {layer.price > 0 && (
                      <span className="text-sm text-slate-500">
                        +{layer.price} ₽
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {selectedLayers.length > 1 && (
                <div className="bg-slate-50 p-3 rounded-xl mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Выбранные:
                  </p>
                  {selectedLayers.map((id, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-white p-2 rounded mb-2"
                    >
                      <span className="text-sm">
                        {LAYERS.find((l) => l.id === id)?.name}
                      </span>
                      <button
                        onClick={() => handleRemoveLayer(idx)}
                        className="text-red-500 p-1 hover:bg-red-50 rounded"
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-slate-800">
                Выберите начинку
              </h2>
              <p className="text-center text-slate-500 text-sm">
                Можно добавить до 3 начинок
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FILLINGS.map((filling) => (
                  <button
                    key={filling.id}
                    onClick={() => handleAddFilling(filling.id)}
                    className={`p-4 rounded-xl border-2 flex justify-between items-center transition ${
                      selectedFillings.includes(filling.id)
                        ? "border-rose-500 bg-rose-50"
                        : "border-slate-200"
                    }`}
                  >
                    <span className="font-medium text-slate-800">
                      {filling.name}
                    </span>
                    {filling.price > 0 && (
                      <span className="text-sm text-slate-500">
                        +{filling.price} ₽
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {selectedFillings.length > 1 && (
                <div className="bg-slate-50 p-3 rounded-xl mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Выбранные:
                  </p>
                  {selectedFillings.map((id, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-white p-2 rounded mb-2"
                    >
                      <span className="text-sm">
                        {FILLINGS.find((f) => f.id === id)?.name}
                      </span>
                      <button
                        onClick={() => handleRemoveFilling(idx)}
                        className="text-red-500 p-1 hover:bg-red-50 rounded"
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-slate-800">
                Декор и детали
              </h2>

              <div>
                <p className="font-medium text-slate-700 mb-3">Декор:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DECORATIONS.map((dec) => (
                    <button
                      key={dec.id}
                      onClick={() => setSelectedDecoration(dec.id)}
                      className={`p-3 rounded-xl border-2 text-center transition ${
                        selectedDecoration === dec.id
                          ? "border-rose-500 bg-rose-50"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="font-medium text-sm">{dec.name}</div>
                      {dec.price > 0 && (
                        <div className="text-xs text-rose-600 mt-1">
                          +{dec.price} ₽
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium text-slate-700 mb-3">
                  Вес торта (кг):
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() =>
                      setWeight((w) => Math.max(1, +(w - 0.5).toFixed(1)))
                    }
                    className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                  >
                    <Minus size={20} className="text-slate-700" />
                  </button>
                  <div className="text-3xl font-bold text-slate-800 w-16 text-center">
                    {weight}
                  </div>
                  <button
                    onClick={() => setWeight((w) => +(w + 0.5).toFixed(1))}
                    className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                  >
                    <Plus size={20} className="text-slate-700" />
                  </button>
                </div>
              </div>

              <div>
                <p className="font-medium text-slate-700 mb-3">
                  Дата получения:
                </p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={minDate}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-rose-500 focus:outline-none transition text-slate-800"
                />
              </div>

              {/* Поле для комментариев */}
              <div>
                <p className="font-medium text-slate-700 mb-3">
                  Пожелания к оформлению:
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например:
• Написать 'С Днём Рождения, Анна!'
• Не использовать орехи
• Сделать в розовых тонах
• Добавить больше ягод"
                  rows={4}
                  maxLength={500}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-rose-500 focus:outline-none transition text-slate-800 resize-none placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-500 mt-2 text-right">
                  {comment.length}/500
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Навигация и Итого */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-lg">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
              step === 1
                ? "opacity-0 pointer-events-none"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <ChevronLeft size={20} /> Назад
          </button>

          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Итого
            </p>
            <p className="text-3xl font-bold text-rose-600">
              {totalPrice.toLocaleString()} ₽
            </p>
          </div>

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition shadow-lg shadow-rose-200"
            >
              Далее <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition shadow-lg shadow-rose-200"
            >
              {isSubmitting ? "Создаём..." : "Оформить заказ"}{" "}
              {!isSubmitting && <Check size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
