import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

/**
 * Naive in-memory rate limit. Good enough to blunt casual abuse on a personal
 * site; swap for Upstash/Vercel KV if this ever needs to survive a cold start.
 */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
// Enough headroom that a genuine sender who retries after the mail-client
// fallback isn't blocked, still low enough to be useless for spamming.
const MAX_PER_WINDOW = 6;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot tripped — answer exactly like a success so the bot learns nothing,
  // and send nothing.
  if (parsed.data.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured: say so plainly rather than pretending to deliver.
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Email delivery isn't configured yet.",
        fallback: true,
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? profile.email],
        reply_to: email,
        subject: subject?.trim() ? `Portfolio — ${subject}` : `Portfolio — new message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          subject ? `Subject: ${subject}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the message:", res.status, detail);
      return NextResponse.json(
        { error: "Message couldn't be delivered. Please email me directly.", fallback: true },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please email me directly.", fallback: true },
      { status: 500 }
    );
  }
}
