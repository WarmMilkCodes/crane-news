type Variant = "gold" | "blue" | "red";
export function AlertBar({ text, variant="gold" }: { text?: string; variant?: Variant; }) {
  if (!text) return null;
  const cls =
    variant === "blue" ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
    : variant === "red" ? "border-[crimson] bg-[crimson]"
    : "border-[var(--color-gold-600)] bg-[var(--color-gold-600)]";
  return (
    <div role="status" className={`rounded-lg ${cls} text-white px-4 py-3`}>
      <strong className="mr-2">Notice:</strong>{text}
    </div>
  );
}
