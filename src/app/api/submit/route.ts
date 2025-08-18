// app/api/submit/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot (simple spam filter)
    const website = (form.get("website") || "").toString();
    if (website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const title = (form.get("title") || "").toString().trim();
    const details = (form.get("details") || "").toString().trim();

    if (!name || !email || !title) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    // Basic email sanity check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), { status: 400 });
    }

    const html = `
      <h2>New submission from Crane.news</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Title:</strong> ${escapeHtml(title)}</p>
      <p><strong>Details:</strong><br/>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
    `;

    await resend.emails.send({
      from: "Crane News <noreply@crane.news>", // set up domain & DKIM in Resend
      to: ["support@crane.news"],
      replyTo: email, // so you can reply straight to the submitter
      subject: `New submission: ${title}`,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
