import React from "react";

export type HelmetProps = {
  width?: number;
  shellColor?: string;            // helmet shell color
  facemaskColor?: string;         // cage/bars
  stripeColor?: string | null;    // null/undefined => no stripe
  outlineColor?: string;          // helmet edge stroke
  flip?: boolean;                 // mirror helmet for away team
};

export default function Helmet({
  width = 64,
  shellColor = "#2d5ca2",
  facemaskColor = "#b58825",
  stripeColor,
  outlineColor = "rgba(0,0,0,0.35)",
  flip = false,
}: HelmetProps) {
  const w = 160, h = 130;
  const shadow = "drop-shadow(0 2px 4px rgba(0,0,0,0.35))";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={width}
      height={(width * h) / w}
      style={{ transform: flip ? "scaleX(-1)" : undefined, filter: shadow }}
      aria-label="Team helmet"
    >
      <defs>
        {/* Clip mask to keep bars outside shell */}
        <clipPath id="shellClip">
          <path d="M25,86 C20,63 28,41 45,27 C62,13 92,10 116,20 C140,30 155,51 155,71 C155,78 153,84 150,90
                   L132,90 C120,98 108,103 94,105 L75,106 L63,103 L54,103 L54,96 L48,92 L42,92 L37,90
                   C31,93 26,90 25,86 Z"/>
        </clipPath>
      </defs>

      {/* Helmet shell */}
      <path
        d="M25,86 C20,63 28,41 45,27 C62,13 92,10 116,20 C140,30 155,51 155,71 C155,78 153,84 150,90
           L132,90 C120,98 108,103 94,105 L75,106 L63,103 L54,103 L54,96 L48,92 L42,92 L37,90
           C31,93 26,90 25,86 Z"
        fill={shellColor}
        stroke={outlineColor}
        strokeWidth="2"
      />

      {/* Optional center stripe */}
      {stripeColor && (
        <path
          d="M118,19 C136,27 150,45 154,65 L145,67 C140,48 127,32 108,24 Z"
          fill={stripeColor}
          opacity="0.9"
        />
      )}

      {/* Ear hole */}
      <circle cx="78" cy="83" r="6.5" fill="#222" />

      {/* Cheek highlight */}
      <path
        d="M54,96 L66,107 L76,108 C64,108 56,103 54,96 Z"
        fill="#e9e9e9"
        opacity="0.75"
      />

      {/* Facemask hinge bolts */}
      <g fill={facemaskColor}>
        <circle cx="98" cy="97" r="2" />
        <circle cx="108" cy="100" r="2" />
      </g>

      {/* Facemask bars */}
      <g
        stroke={facemaskColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#shellClip)"
      >
        {/* Top bar */}
        <path d="M98,97 C112,98 124,98 138,100" />

        {/* Bottom bar */}
        <path d="M98,104 C112,106 126,108 140,111" />

        {/* Vertical drop at cage front */}
        <path d="M140,100 L140,111" />

        {/* Nose loop curve */}
        <path d="M140,100 C145,100 148,98 148,102 C148,106 145,111 140,111" />
      </g>

      {/* Outer bolts for realism */}
      <g fill={facemaskColor}>
        <circle cx="140" cy="100" r="2" />
        <circle cx="140" cy="111" r="2" />
      </g>

      {/* Small strap nub for grounding */}
      <path
        d="M143,112 L147,110"
        stroke={facemaskColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
