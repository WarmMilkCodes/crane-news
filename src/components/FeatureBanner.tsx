// components/FeatureBanner.tsx
import Image from "next/image";

type Props = {
  image: string;                 // /public path or remote (if allowed in next.config)
  title: string;                 // e.g., "Football Returns to Crane"
  subtitle?: string;             // e.g., "75 Years in the Making"
  tag?: string;                  // e.g., "Sports Feature"
  attribution?: string;          // bottom-right overlay text
  height?: number;               // px height (default 420)
};

export default function FeatureBanner({
  image,
  title,
  subtitle,
  tag = "Sports Feature",
  attribution,
  height = 420,
}: Props) {
  return (
    <div
      className="relative w-full rounded-[var(--radius)] overflow-hidden shadow-xl mb-6"
      style={{ height }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-8">
        {tag && (
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[11px] font-black uppercase w-fit mb-3">
            {tag}
          </span>
        )}
        <h1 className="text-white text-3xl md:text-5xl font-black leading-tight drop-shadow">
          {title}
        </h1>
        {subtitle && (
          <p className="text-yellow-300 text-lg md:text-xl font-semibold mt-1 drop-shadow">
            {subtitle}
          </p>
        )}
      </div>

      {attribution && (
        <span className="absolute bottom-2 right-2 z-10 text-[10px] leading-none text-white/85 bg-black/50 px-2 py-0.5 rounded">
          {attribution}
        </span>
      )}
    </div>
  );
}
