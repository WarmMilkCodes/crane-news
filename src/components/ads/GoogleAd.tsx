"use client";
import { useEffect } from "react";

// Extend window to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  slot: string;
  format?: string;
};

export default function GoogleAd({ slot, format = "auto" }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Make sure the array exists, then push a request
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block my-4"
      style={{ display: "block" }}
      data-ad-client="ca-pub-xxxxxxxxxxxxxxx" // TODO: replace with your AdSense client ID
      data-ad-slot={slot}
      data-ad-format={format}
    />
  );
}
