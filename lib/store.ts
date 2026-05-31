"use client";
import { create } from "zustand";

export interface CurrentUser {
  name: string;
  email: string;
  role: string;
  initials: string;
}

interface PortalStore {
  view: string;
  role: string;
  aiOpen: boolean;
  picked: any | null;
  detail: any | null;
  navOpen: boolean;
  currentUser: CurrentUser | null;
  toast: { message: string; type: "success" | "error" } | null;
  setView: (v: string) => void;
  setRole: (r: string) => void;
  toggleAI: () => void;
  setAIOpen: (v: boolean) => void;
  setPicked: (d: any | null) => void;
  setDetail: (d: any | null) => void;
  setNavOpen: (v: boolean) => void;
  setCurrentUser: (u: CurrentUser | null) => void;
  setToast: (t: { message: string; type: "success" | "error" } | null) => void;
  clearToast: () => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  view: "overview",
  role: "City Manager",
  aiOpen: false,
  picked: null,
  detail: null,
  navOpen: false,
  currentUser: null,
  toast: null,
  setView: (v) => set({ view: v }),
  setRole: (r) => set({ role: r }),
  toggleAI: () => set((s) => ({ aiOpen: !s.aiOpen })),
  setAIOpen: (v) => set({ aiOpen: v }),
  setPicked: (d) => set({ picked: d }),
  setDetail: (d) => set({ detail: d }),
  setNavOpen: (v) => set({ navOpen: v }),
  setCurrentUser: (u) => set({ currentUser: u }),
  setToast: (t) => set({ toast: t }),
  clearToast: () => set({ toast: null }),
}));
