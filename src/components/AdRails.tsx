// components/ads/AdRails.tsx
"use client";
type LocalAdProps = { image: string; url: string; alt?: string };

function LocalAd({ image, url, alt }: LocalAdProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={image} alt={alt || "Sponsor"} className="w-full h-auto rounded shadow" loading="lazy" />
    </a>
  );
}

export default function AdRails() {
  return (
    <>
      <aside className="rail rail-left space-y-4">
        <LocalAd image="/ads/pizza-depot-300x250.jpg" url="https://example.com" alt="Pizza Depot" />
        <LocalAd image="/ads/hardware-300x600.jpg" url="https://example.com" alt="Crane Hardware" />
      </aside>

      <aside className="rail rail-right space-y-4">
        <LocalAd image="/ads/insurance-300x250.jpg" url="https://example.com" alt="Farm & Home Insurance" />
      </aside>
    </>
  );
}
