"use client";

import { useMemo } from "react";

interface AreaChartProps {
  data: number[];
  height?: number;
  color?: string;
  threshold?: number;
  thrLabel?: string;
  labels?: string[];
  band?: [number, number];
}

export default function AreaChart({
  data,
  height = 120,
  color = "var(--blue)",
  threshold,
  thrLabel,
  labels,
  band,
}: AreaChartProps) {
  const W = 100;
  const H = height;
  const padT = 10;
  const padB = labels ? 18 : 6;
  const padX = 4;

  const { min, max, points, areaPoints, thrY, bandY1, bandY2, lastPt } = useMemo(() => {
    if (!data || data.length === 0) return { min: 0, max: 1, points: "", areaPoints: "", thrY: null, bandY1: null, bandY2: null, lastPt: null };

    const allVals = [...data];
    if (threshold != null) allVals.push(threshold);
    if (band) { allVals.push(band[0]); allVals.push(band[1]); }

    const min = Math.min(...allVals);
    const max = Math.max(...allVals);
    const range = max - min || 1;

    const drawH = H - padT - padB;
    const drawW = W - padX * 2;

    const toX = (i: number) => padX + (i / (data.length - 1)) * drawW;
    const toY = (v: number) => padT + (1 - (v - min) / range) * drawH;

    const pts = data.map((v, i) => `${toX(i).toFixed(2)},${toY(v).toFixed(2)}`);
    const points = pts.join(" ");
    const bottom = (H - padB + 1).toFixed(2);
    const areaPoints = `${padX},${bottom} ` + points + ` ${toX(data.length - 1).toFixed(2)},${bottom}`;

    const thrY = threshold != null ? toY(threshold) : null;
    const bandY1 = band ? toY(band[0]) : null;
    const bandY2 = band ? toY(band[1]) : null;

    const lastX = toX(data.length - 1);
    const lastY = toY(data[data.length - 1]);

    return { min, max, points, areaPoints, thrY, bandY1, bandY2, lastPt: { x: lastX, y: lastY } };
  }, [data, height, threshold, band]);

  const gradId = `ag-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Band */}
      {band && bandY1 != null && bandY2 != null && (
        <rect
          x={padX}
          y={bandY2}
          width={W - padX * 2}
          height={bandY1 - bandY2}
          fill="var(--amber)"
          fillOpacity={0.08}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Area fill */}
      {data.length > 1 && (
        <polygon
          points={areaPoints}
          fill={`url(#${gradId})`}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Line */}
      {data.length > 1 && (
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Threshold line */}
      {thrY != null && (
        <>
          <line
            x1={padX}
            y1={thrY}
            x2={W - padX}
            y2={thrY}
            stroke="var(--red)"
            strokeWidth={1}
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
          {thrLabel && (
            <text
              x={W - padX - 2}
              y={thrY - 3}
              textAnchor="end"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 7,
                fill: "var(--red)",
              }}
            >
              {thrLabel}
            </text>
          )}
        </>
      )}

      {/* Last point dot */}
      {lastPt && (
        <circle
          cx={lastPt.x}
          cy={lastPt.y}
          r={3}
          fill={color}
          stroke="var(--surface)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Bottom labels */}
      {labels && labels.length > 0 && (
        <>
          {labels.map((lbl, i) => {
            const x = (padX + (i / (labels.length - 1)) * (W - padX * 2)).toFixed(2);
            return (
              <text
                key={i}
                x={x}
                y={H - 2}
                textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
                style={{ fontFamily: "var(--mono)", fontSize: 7, fill: "var(--ink-faint)" }}
              >
                {lbl}
              </text>
            );
          })}
        </>
      )}
    </svg>
  );
}
