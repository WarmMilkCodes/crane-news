import Image from "next/image";

export default function HeroHeader({
  title, subtitle, imageSrc="/header.jpg"
}: { title: string; subtitle?: string; imageSrc?: string; }) {
  return (
    <div className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden rounded-[var(--radius-xl)] shadow-sm">
      <Image src={imageSrc} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#204174]/45 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-sm">{title}</h1>
        {subtitle && <p className="text-white/90 text-sm md:text-base drop-shadow-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
