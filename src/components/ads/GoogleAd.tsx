// components/ads/GoogleAd.tsx
declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

"use client";
import { useEffect } from "react";
export default function GoogleAd({ slot, format = "auto" }: { slot: string; format?: string }) {
  useEffect(() => {
    try { /* @ts-ignore */ (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);
  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client="ca-pub-xxxxxxxxxxxxxxx"
      data-ad-slot={slot}
      data-ad-format={format}
    />
  );
}
