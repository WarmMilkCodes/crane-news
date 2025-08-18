// app/submit/page.tsx
export default function Submit() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="h-serif text-2xl">Submit news, events, or photos</h1>

      <form
        action="/api/submit"
        method="POST"
        className="mt-4 grid gap-3"
      >
        {/* Honeypot field (keep hidden from humans) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <label className="sr-only" htmlFor="name">Your name</label>
        <input id="name" name="name" placeholder="Your name" className="panel p-3" required />

        <label className="sr-only" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" className="panel p-3" required />

        <label className="sr-only" htmlFor="title">Title</label>
        <input id="title" name="title" placeholder="Title" className="panel p-3" required />

        <label className="sr-only" htmlFor="details">Details / links</label>
        <textarea id="details" name="details" placeholder="Details / links" className="panel p-3 h-32" />

        <button className="btn-primary w-fit">Send</button>
      </form>

      <p className="text-[var(--color-muted)] text-sm mt-3">
        We’ll review before posting.
      </p>
    </section>
  );
}
