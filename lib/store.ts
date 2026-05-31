"use client";
import { create } from "zustand";

export interface CurrentUser {
  name: string;
  email: string;
  role: string;
  initials: string;
}

/**
 * Role-based access control.
 *
 * Each role sees a curated subset of nav sections (slugs match Sidebar NAV_GROUPS).
 * `overview`, `ai-agents`, `reports` and `settings` are treated as broadly-available
 * and are unioned in by `allowedSections()` so every role always keeps the shared
 * operating picture, AI assistance, exports, and account settings.
 *
 * Slugs in use:
 *   overview · digital-twin · assets · tasks · traffic · water · air-quality
 *   wildfire · flood-risk · emergency · citizen-reports · ai-agents
 *   capital-grants · reports · data-sources · settings
 */
const ALL_SECTIONS = [
  "overview", "digital-twin", "assets", "tasks", "traffic", "water",
  "air-quality", "wildfire", "flood-risk", "emergency", "citizen-reports",
  "ai-agents", "capital-grants", "reports", "data-sources", "settings",
];

// Sections that every role gets regardless of their domain map.
export const ALWAYS_SECTIONS = ["overview", "ai-agents", "reports", "settings"];

// Role → the domain-specific sections that role is responsible for.
// (ALWAYS_SECTIONS are unioned in by allowedSections, so they may be omitted here.)
export const ROLE_SECTIONS: Record<string, string[]> = {
  // Leadership — full nav.
  "Mayor / Council": ALL_SECTIONS,
  "City Manager":    ALL_SECTIONS,

  "Public Works": [
    "overview", "digital-twin", "assets", "tasks", "water",
    "flood-risk", "citizen-reports", "reports",
  ],
  "Transportation": [
    "overview", "digital-twin", "traffic", "tasks", "reports",
  ],
  "Environment": [
    "overview", "digital-twin", "air-quality", "water", "wildfire",
    "flood-risk", "reports",
  ],
  "Utilities": [
    "overview", "digital-twin", "assets", "water", "tasks", "reports",
  ],
  "Emergency Mgmt": [
    "overview", "digital-twin", "emergency", "wildfire", "flood-risk",
    "citizen-reports", "reports",
  ],
  "Grants Office": [
    "overview", "capital-grants", "reports",
  ],
  "Citizen Support": [
    "overview", "citizen-reports", "reports",
  ],
};

/**
 * Resolve the set of nav slugs a role may see.
 * Unknown roles fall back to the full nav (fail-open for safety in a demo,
 * and so any future role added to data.ts is visible until mapped).
 */
export function allowedSections(role: string): Set<string> {
  const base = ROLE_SECTIONS[role] ?? ALL_SECTIONS;
  return new Set([...ALWAYS_SECTIONS, ...base]);
}

/** Convenience predicate used by the Sidebar. */
export function canSee(role: string, slug: string): boolean {
  return allowedSections(role).has(slug);
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
