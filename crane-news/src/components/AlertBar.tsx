type Variant = "gold" | "blue" | "red";
export function AlertBar({ text, variant = "gold" }: { text?: string; variant?: Variant }) {
  if (!text) return null;
  const cls =
    variant === "blue" ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
    : variant === "red" ? "bg-red-600 border-red-600"
    : "bg-[var(--color-accent)] border-[var(--color-accent)]";
  return (
    <div role="status" className={`rounded-lg ${cls} text-white px-4 py-3`}>
      <strong className="mr-2">Notice:</strong>{text}
    </div>
  );
}
