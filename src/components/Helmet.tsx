// components/Helmet.tsx
import React from "react";

export type HelmetProps = {
  width?: number;
  shellColor?: string;
  facemaskColor?: string;
  stripeColor?: string | null; // Pass null/undefined for no stripe
  outlineColor?: string;
  logoText?: string;
  logoColor?: string;
  flip?: boolean;
};

export default function Helmet({
  width = 64,
  shellColor = "#2d5ca2",
  facemaskColor = "#b58825",
  stripeColor,
  outlineColor = "rgba(0,0,0,0.35)",
  logoText,
  logoColor = "#fff",
  flip = false,
}: HelmetProps) {
  const w = 160;
  const h = 130;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={width}
      height={(width * h) / w}
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
      }}
      aria-label="Team helmet"
    >
      {/* helmet shell */}
      <path
        d="M25,86 C20,63 28,41 45,27 C62,13 92,10 116,20 C140,30 155,51 155,71 C155,78 153,84 150,90
           L132,90 C120,98 108,103 94,105 L75,106 L63,103 L54,103 L54,96 L48,92 L42,92 L37,90
           C31,93 26,90 25,86 Z"
        fill={shellColor}
        stroke={outlineColor}
        strokeWidth="2"
      />

      {/* ear hole */}
      <circle cx="78" cy="83" r="6.5" fill="#222" />

      {/* optional center stripe */}
      {stripeColor && (
        <path
          d="M118,19 C136,27 150,45 154,65 L145,67 C140,48 127,32 108,24 Z"
          fill={stripeColor}
          opacity="0.85"
        />
      )}

      {/* jaw/cheek cutout */}
      <path
        d="M53,95 L66,107 L76,108 C64,108 55,103 53,95 Z"
        fill="#EBEBEB"
        opacity="0.8"
      />

      {/* facemask mount points */}
      <circle cx="98" cy="97" r="2.1" fill={facemaskColor} />
      <circle cx="108" cy="100" r="2.1" fill={facemaskColor} />
      <circle cx="118" cy="101" r="2.1" fill={facemaskColor} />
      <circle cx="127" cy="100" r="2.1" fill={facemaskColor} />

      {/* facemask bars */}
      <path
        d="M98,97 L127,100"
        stroke={facemaskColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M98,103 L137,107"
        stroke={facemaskColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M127,100 L143,106 L149,100 L146,92 L137,90"
        fill="none"
        stroke={facemaskColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* logo text (optional) */}
      {logoText && (
        <g transform="translate(62,61)">
          <circle r="18" fill="rgba(255,255,255,.12)" />
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
            fontSize="26"
            fontWeight={900}
            fill={logoColor}
            stroke="black"
            strokeWidth="1.5"
            paintOrder="stroke"
          >
            {logoText.slice(0, 3).toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );
}
