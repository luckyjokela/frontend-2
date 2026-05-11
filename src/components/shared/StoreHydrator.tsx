"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export function StoreHydrator() {
  useEffect(() => {
    try {
      useUserStore.getState().hydrate();
    } catch (error) {
      console.warn("[StoreHydrator] Failed to hydrate store:", error);
    }
  }, []);

  return null;
}