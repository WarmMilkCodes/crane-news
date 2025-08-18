// components/ads/LocalAd.tsx
type Props = { image: string; url: string; alt?: string; className?: string };
export default function LocalAd({ image, url, alt, className }: Props) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      <img src={image} alt={alt || "Local Ad"} className="w-full h-auto rounded shadow" loading="lazy" />
    </a>
  );
}
