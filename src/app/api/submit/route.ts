// app/api/submit/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot
    const website = (form.get("website") || "").toString();
    if (website) {
      return redirect303("/submit/thanks"); // silently succeed for bots
    }

    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const title = (form.get("title") || "").toString().trim();
    const details = (form.get("details") || "").toString().trim();

    if (!name || !email || !title) {
      return json(400, { ok: false, error: "Missing fields" });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return json(400, { ok: false, error: "Invalid email" });
    }

    const html = `
      <h2>New submission from Crane.news</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Title:</strong> ${escapeHtml(title)}</p>
      <p><strong>Details:</strong><br/>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
    `;

    // ✅ Use Resend’s { data, error } pattern
    const { data, error } = await resend.emails.send({
      from: "Crane News <submit@crane.news>", // must be on your verified domain
      to: ["support@crane.news"],
      replyTo: email,                          // correct casing
      subject: `New submission: ${title}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return json(502, { ok: false, error: "Email not accepted by provider." });
    }

    console.log("Resend accepted, id:", data?.id);
    return redirect303("/submit/thanks");
  } catch (err) {
    console.error(err);
    return json(500, { ok: false, error: "Server error" });
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function redirect303(location: string) {
  return new Response(null, { status: 303, headers: { Location: location } });
}
