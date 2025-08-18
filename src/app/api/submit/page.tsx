// app/submit/thanks/page.tsx
export default function Thanks() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="h-serif text-2xl">Thanks for your submission!</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        We’ve received it and will review shortly. If we have questions,
        we’ll reach out by email.
      </p>
    </section>
  );
}
