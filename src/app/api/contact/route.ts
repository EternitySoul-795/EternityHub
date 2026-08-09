import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/data/site";

export const runtime = "nodejs";

type ContactBody = { name?: string; email?: string; message?: string };

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Contact form isn't configured yet." }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Resend's sandbox sender — works with zero setup. Swap for a verified
      // eternitysoul.me address once the domain is added in the Resend dashboard.
      from: `${SITE.brand} Site <onboarding@resend.dev>`,
      to,
      replyTo: email,
      subject: `New message from ${name} via ${SITE.domain}`,
      text: `${message}\n\n— ${name} (${email})`,
    });
    if (error) throw error;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to send." }, { status: 502 });
  }
}
