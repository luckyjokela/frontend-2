// src/components/ui/SearchModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

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
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-4">
          <Search className="text-slate-400 flex-shrink-0" size={24} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск тортов..."
            className="flex-1 text-xl outline-none text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Популярные:{" "}
            <span className="text-rose-600 cursor-pointer hover:underline">
              Свадебные торты
            </span>
            ,{" "}
            <span className="text-rose-600 cursor-pointer hover:underline">
              Шоколадные
            </span>
            ,{" "}
            <span className="text-rose-600 cursor-pointer hover:underline">
              Детские
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
