export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--color-outline)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 text-sm text-[var(--color-muted)]">
        <div>© {new Date().getFullYear()} Crane.news — Independent community site. Not affiliated with the City of Crane.</div>
      </div>
    </footer>
  );
}
