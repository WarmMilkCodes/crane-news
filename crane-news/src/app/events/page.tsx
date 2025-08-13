export const metadata = { title: "Events — Crane.news" };

export default function EventsPage() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="text-xl md:text-2xl font-semibold">Events</h1>
      <p className="text-[var(--color-muted)] mt-2">Upcoming community events. (Hook up Google Calendar or a CMS later.)</p>
      <ul className="mt-4 space-y-3 text-sm">
        <li className="section-alt p-4">Back-to-School Night — Wed 6:00 PM @ High School</li>
        <li className="section-alt p-4">Farmers Market — Sat 8:00 AM @ Main St</li>
      </ul>
    </section>
  );
}
