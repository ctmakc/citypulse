"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import type { MapLayer } from "@/lib/types";

// Each group maps to a map-dot layer category, plus its individual sub-layers
// (kept for fidelity with the original design).
const LAYER_GROUPS: { group: string; cat: MapLayer; items: string[] }[] = [
  { group: "Assets",      cat: "assets",      items: ["Roads", "Bridges", "Water mains", "Hydrants", "Streetlights", "Power lines", "Storm drains", "Buildings"] },
  { group: "Environment", cat: "environment", items: ["Air quality", "Water quality", "Heat islands", "Noise", "Emissions"] },
  { group: "Mobility",    cat: "mobility",    items: ["Traffic", "Accidents", "Transit", "Bike lanes", "Parking"] },
  { group: "Hazards",     cat: "hazards",     items: ["Wildfire", "Flood", "Storm", "Ice", "Landslide"] },
  { group: "Citizen",     cat: "citizen",     items: ["311 reports"] },
];

// All five categories visible by default.
export const DEFAULT_LAYERS: Record<MapLayer, boolean> = {
  assets: true,
  environment: true,
  mobility: true,
  hazards: true,
  citizen: true,
};

const DEFAULT_ITEMS_ON: Record<string, boolean> = {
  Roads: true,
  Traffic: true,
  "311 reports": true,
  "Air quality": true,
  Wildfire: true,
  "Water mains": true,
};

interface LayerPanelProps {
  /** Controlled set of enabled layer categories. Lifts state into the parent
   *  (DigitalTwin) so the map can filter dots. Optional — when omitted the
   *  panel keeps its own state and works standalone. */
  value?: Record<MapLayer, boolean>;
  onChange?: (next: Record<MapLayer, boolean>) => void;
}

function Toggle({
  on,
  onChange,
  label,
  stop,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
  stop?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        if (stop) e.stopPropagation();
        onChange();
      }}
      role="switch"
      aria-checked={on}
      aria-label={`${label} layer`}
      style={{
        width: 30,
        height: 17,
        borderRadius: 100,
        border: "none",
        padding: 0,
        background: on ? "var(--blue)" : "var(--rule)",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background .18s ease",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 2,
          left: on ? 15 : 2,
          width: 13,
          height: 13,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.2)",
          transition: "left .18s ease",
        }}
      />
    </button>
  );
}

export default function LayerPanel({ value, onChange }: LayerPanelProps) {
  const [open, setOpen] = useState<string>("Assets");
  // Group/category enabled-state: controlled by the parent when `value` is
  // supplied, otherwise managed locally so the panel still works on its own.
  const [internalCats, setInternalCats] = useState<Record<MapLayer, boolean>>(DEFAULT_LAYERS);
  const cats = value ?? internalCats;
  // Sub-layer item toggles stay purely visual/local.
  const [items, setItems] = useState<Record<string, boolean>>(DEFAULT_ITEMS_ON);

  function toggleCat(cat: MapLayer) {
    const next = { ...cats, [cat]: !cats[cat] };
    if (value === undefined) setInternalCats(next);
    onChange?.(next);
  }

  function toggleItem(layer: string) {
    setItems((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {LAYER_GROUPS.map(({ group, cat, items: groupItems }) => (
        <div key={group} style={{ borderBottom: "1px solid var(--rule-soft)" }}>
          {/* Group header — chevron expands, master toggle enables the category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              background: open === group ? "var(--surface-2)" : "transparent",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(open === group ? "" : group)}
              aria-expanded={open === group}
              style={{
                flex: 1,
                textAlign: "left",
                border: "none",
                font: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                userSelect: "none",
                background: "transparent",
                padding: 0,
              }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: cats[cat] ? "var(--ink)" : "var(--ink-faint)",
                }}
              >
                {group}
              </span>
              <div
                style={{
                  transform: open === group ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .18s ease",
                  color: "var(--ink-faint)",
                  display: "flex",
                }}
              >
                <Icon name="chevron" size={14} strokeWidth={2} />
              </div>
            </button>
            <Toggle on={!!cats[cat]} onChange={() => toggleCat(cat)} label={group} stop />
          </div>

          {/* Layer items */}
          {open === group && (
            <div style={{ padding: "4px 0 8px", opacity: cats[cat] ? 1 : 0.45 }}>
              {groupItems.map((layer) => (
                <div
                  key={layer}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 16px 5px 24px",
                  }}
                >
                  <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{layer}</span>
                  <Toggle on={!!items[layer]} onChange={() => toggleItem(layer)} label={layer} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
