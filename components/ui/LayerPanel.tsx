"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

const LAYER_GROUPS: [string, string[]][] = [
  ["Assets", ["Roads", "Bridges", "Water mains", "Hydrants", "Streetlights", "Power lines", "Storm drains", "Buildings"]],
  ["Environment", ["Air quality", "Water quality", "Heat islands", "Noise", "Emissions"]],
  ["Mobility", ["Traffic", "Accidents", "Transit", "Bike lanes", "Parking"]],
  ["Hazards", ["Wildfire", "Flood", "Storm", "Ice", "Landslide"]],
  ["Citizen", ["311 reports"]],
];

const DEFAULT_ON: Record<string, boolean> = {
  Roads: true,
  Traffic: true,
  "311 reports": true,
  "Air quality": true,
};

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
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

export default function LayerPanel() {
  const [open, setOpen] = useState<string>("Assets");
  const [layers, setLayers] = useState<Record<string, boolean>>(DEFAULT_ON);

  function toggle(layer: string) {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {LAYER_GROUPS.map(([group, items]) => (
        <div key={group} style={{ borderBottom: "1px solid var(--rule-soft)" }}>
          {/* Group header */}
          <button
            type="button"
            onClick={() => setOpen(open === group ? "" : group)}
            aria-expanded={open === group}
            style={{
              width: "100%",
              textAlign: "left",
              border: "none",
              font: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 16px",
              cursor: "pointer",
              userSelect: "none",
              background: open === group ? "var(--surface-2)" : "transparent",
            }}
          >
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{group}</span>
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

          {/* Layer items */}
          {open === group && (
            <div style={{ padding: "4px 0 8px" }}>
              {items.map((layer) => (
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
                  <Toggle on={!!layers[layer]} onChange={() => toggle(layer)} label={layer} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
