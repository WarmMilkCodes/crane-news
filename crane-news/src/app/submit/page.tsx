export default function Submit() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="h-serif text-2xl">Submit news, events, or photos</h1>
      <form action="mailto:hello@crane.news" method="POST" encType="text/plain" className="mt-4 grid gap-3">
        <input name="name" placeholder="Your name" className="panel p-3" required />
        <input name="email" placeholder="Email" className="panel p-3" required />
        <input name="title" placeholder="Title" className="panel p-3" required />
        <textarea name="details" placeholder="Details / links" className="panel p-3 h-32" />
        <button className="btn-primary w-fit">Send</button>
      </form>
      <p className="text-[var(--color-muted)] text-sm mt-3">We’ll review before posting.</p>
    </section>
  );
}
