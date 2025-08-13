export const metadata = { title: "Events — Crane.news" };

export default function EventsPage() {
  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">Events</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold">Back-to-School Night</h3>
          <p className="text-sm text-[var(--color-muted)]">Wed 6:00 PM • High School</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Farmers Market</h3>
          <p className="text-sm text-[var(--color-muted)]">Sat 8:00 AM • Main St</p>
        </div>
      </div>
    </section>
  );
}
