import Image from "next/image";

export default function HeroHeader({
  image = "/header.jpg",
  kicker = "Independent local news",
  title,
  subtitle,
  tag
}: {
  image?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <div className="hero -mx-4 md:-mx-6">
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="overlay" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 h-full flex flex-col justify-end pb-6">
        {tag && <span className="tag tag--gold mb-2">{tag}</span>}
        <div className="text-white/85 text-xs uppercase tracking-wide">{kicker}</div>
        <h1 className="h-serif text-3xl md:text-4xl text-white">{title}</h1>
        {subtitle && <p className="text-white/90">{subtitle}</p>}
      </div>
    </div>
  );
}
