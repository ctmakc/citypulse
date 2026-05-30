"use client";

export const ICONS: Record<string, string[]> = {
  overview: ["M3 13h8V3H3zM13 21h8V8h-8zM13 3v3M3 17h8v4H3z"],
  twin: ["M12 2 3 7l9 5 9-5z", "M3 12l9 5 9-5", "M3 17l9 5 9-5"],
  alerts: ["M12 3a6 6 0 0 0-6 6c0 5-2 6-2 6h16s-2-1-2-6a6 6 0 0 0-6-6z", "M10.5 21a2 2 0 0 0 3 0"],
  assets: ["M21 8 12 3 3 8v8l9 5 9-5z", "M3 8l9 5 9-5", "M12 13v8"],
  traffic: ["M5 17h14M6 17V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M9 21v-2M15 21v-2M7 11h10"],
  water: ["M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"],
  air: ["M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h9"],
  fire: ["M12 3c1 4 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s2 1 3-6z"],
  flood: ["M2 14c2 0 2-1.5 4-1.5S10 14 12 14s2-1.5 4-1.5 2 1.5 4 1.5M2 18c2 0 2-1.5 4-1.5S10 18 12 18s2-1.5 4-1.5 2 1.5 4 1.5M5 10l1-5 4 3 3-4 2 6"],
  shield: ["M12 2l8 4v6c0 5.5-3.5 10.7-8 13-4.5-2.3-8-7.5-8-13V6z"],
  message: ["M9 3h7l4 4v14H9zM16 3v4h4M5 7v14h10", "M11 12h6M11 16h6"],
  ai: ["M9 3h6v3M4 9h3M17 9h3M4 15h3M17 15h3M9 21h6v-3", "M7 7h10v10H7z", "M11 11h2v2h-2z"],
  capital: ["M3 21h18M5 21V8l5-3 5 3v13M9 21v-5h2v5M13 12h2M9 12h2", "M19 21V12l-4-2"],
  exports: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3"],
  data: ["M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z", "M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  search: ["M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"],
  bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  chevron: ["M6 9l6 6 6-6"],
  check: ["M20 6L9 17l-5-5"],
  close: ["M18 6 6 18M6 6l12 12"],
  sparkles: ["M12 3l1.09 3.41L16.5 7.5l-3.41 1.09L12 12l-1.09-3.41L7.5 7.5l3.41-1.09L12 3zM5 15l.72 2.28L8 18l-2.28.72L5 21l-.72-2.28L2 18l2.28-.72L5 15zM19 2l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6L19 2z"],
  send: ["M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"],
  tasks: ["M9 11l3 3L22 4", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
  menu: ["M3 6h18M3 12h18M3 18h18"],
  external: ["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"],
  calendar: ["M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  list: ["M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"],
  gantt: ["M3 6h6M3 12h10M3 18h14M3 4v2M3 10v4M3 16v4"],
  map: ["M1 6l7-4 8 4 7-4v16l-7 4-8-4-7 4V6zM8 2v16M16 6v16"],
  layers: ["M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"],
  user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  filter: ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
  plus: ["M12 5v14M5 12h14"],
  info: ["M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM12 8v4M12 16h.01"],
  warning: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"],
};

interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, size = 17, strokeWidth = 1.7, className, style }: IconProps) {
  const paths = ICONS[name] || ICONS.info;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
