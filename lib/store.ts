"use client";
import { create } from "zustand";

interface PortalStore {
  view: string;
  role: string;
  aiOpen: boolean;
  picked: any | null;
  detail: any | null;
  navOpen: boolean;
  setView: (v: string) => void;
  setRole: (r: string) => void;
  toggleAI: () => void;
  setAIOpen: (v: boolean) => void;
  setPicked: (d: any | null) => void;
  setDetail: (d: any | null) => void;
  setNavOpen: (v: boolean) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  view: "overview",
  role: "City Manager",
  aiOpen: false,
  picked: null,
  detail: null,
  navOpen: false,
  setView: (v) => set({ view: v }),
  setRole: (r) => set({ role: r }),
  toggleAI: () => set((s) => ({ aiOpen: !s.aiOpen })),
  setAIOpen: (v) => set({ aiOpen: v }),
  setPicked: (d) => set({ picked: d }),
  setDetail: (d) => set({ detail: d }),
  setNavOpen: (v) => set({ navOpen: v }),
}));
