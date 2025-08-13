export const metadata = { 
  title: "Media — Crane.news",
  description: "Podcasts, videos, and other media from Crane.news."
};

export default function MediaPage() {
  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">Media</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Empty State — replace with real mapped content */}
        <div className="col-span-full card p-6 text-center text-sm text-[var(--color-muted)]">
          Podcasts, videos, and special features will be published here soon.
        </div>
      </div>
    </section>
  );
}
