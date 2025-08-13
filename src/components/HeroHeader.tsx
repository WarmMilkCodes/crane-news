import Image from "next/image";

export default function HeroHeader({
  image = "/header.jpg",
  kicker = "Crane News & Media Hub",
  title,
  subtitle,
  tag,
  attribution = "Photo © 417 Magazine", // new prop with default text
}: {
  image?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  attribution?: string;
}) {
  return (
    <div className="relative hero -mx-4 md:-mx-6">
      {/* Background image */}
      <Image src={image} alt="" fill priority className="object-cover" />

      {/* Overlay above image */}
      <div className="overlay absolute inset-0 z-0" />

      {/* Attribution text */}
      {attribution && (
        <span className="absolute bottom-2 right-2 z-10 text-[10px] leading-none text-white/80 bg-black/50 px-2 py-0.5 rounded">
          {attribution}
        </span>
      )}

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 h-full flex flex-col justify-end pb-6">
        {tag && <span className="tag tag--gold mb-2">{tag}</span>}
        <div className="text-white/85 text-xs uppercase tracking-wide">{kicker}</div>
        <h1 className="h-serif text-3xl md:text-4xl text-white">{title}</h1>
        {subtitle && <p className="text-white/90">{subtitle}</p>}
      </div>
    </div>
  );
}
