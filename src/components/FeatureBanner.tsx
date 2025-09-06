// components/FeatureBanner.tsx
import Image from "next/image";
import clsx from "clsx";

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  attribution?: string;
  height?: number;          // desktop height
  focal?: string;           // e.g. "center", "50% 30%" -> objectPosition
};

export default function FeatureBanner({
  image,
  title,
  subtitle,
  tag = "Sports",
  attribution,
  height = 440,
  focal = "center",
}: Props) {
  return (
    <section
      className="relative w-full rounded-[22px] overflow-hidden shadow-lg"
      style={{ height }}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: focal }}
      />

      {/* Vignette + stronger bottom gradient for readability */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl">
          {tag && (
            <span className="inline-flex items-center px-3 py-1 mb-3 rounded-full text-[11px] font-black uppercase tracking-wide bg-yellow-400 text-black shadow">
              {tag}
            </span>
          )}
          <h1 className={clsx(
            "text-white font-black leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]",
            "text-2xl sm:text-4xl md:text-5xl"
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-yellow-300 font-semibold text-base sm:text-lg md:text-xl drop-shadow">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {attribution && (
        <span className="absolute bottom-2 right-2 z-10 text-[10px] leading-none text-white/85 bg-black/55 px-2 py-0.5 rounded">
          {attribution}
        </span>
      )}
    </section>
  );
}
