import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

const MIN_FILL_TIME_MS = 1500;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Best-effort, in-memory rate limit. Resets whenever the serverless instance
// recycles — it's a basic deterrent against bursts, not a durable guarantee.
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Prea multe încercări. Te rugăm să încerci din nou mai târziu." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Date invalide.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, message, company, formRenderedAt } = parsed.data;

  // Honeypot tripped, or submitted faster than a human could fill the form —
  // report success so bots don't learn which signal gave them away.
  const isBot = Boolean(company) || (typeof formRenderedAt === "number" && Date.now() - formRenderedAt < MIN_FILL_TIME_MS);
  if (isBot) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json({ message: "Serviciul de email nu este configurat momentan." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!fromEmail) {
    console.error("CONTACT_FROM_EMAIL is not configured.");
    return NextResponse.json({ message: "Serviciul de email nu este configurat momentan." }, { status: 500 });
  }

  try {
    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Cerere de ofertă de la ${name}`,
      text: [
        `Nume: ${name}`,
        `Email: ${email}`,
        phone ? `Telefon: ${phone}` : undefined,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ message: "Trimiterea mesajului a eșuat. Te rugăm să încerci din nou." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ message: "Trimiterea mesajului a eșuat. Te rugăm să încerci din nou." }, { status: 500 });
  }
}
