import { NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long")
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, "Le nom contient des caractères non autorisés"),

  email: z
    .string()
    .email("Email invalide")
    .max(254, "L'email est trop long")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Format d'email invalide"
    ),

  subject: z
    .string()
    .min(5, "Le sujet doit contenir au moins 5 caractères")
    .max(200, "Le sujet est trop long")
    .regex(/^[^<>{}]*$/, "Le sujet contient des caractères non autorisés"),

  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message est trop long")
    .regex(/^[^<>{}]*$/, "Le message contient des caractères non autorisés"),
});

// Store for rate limiting
const requestStore = new Map<string, number[]>();

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 3; // Max requests per window

  // Get or initialize request timestamps for this identifier
  let requests = requestStore.get(identifier) || [];

  // Remove timestamps outside current window
  requests = requests.filter((timestamp) => now - timestamp < windowMs);

  // Check if rate limit is exceeded
  if (requests.length >= maxRequests) {
    return true;
  }

  // Add new timestamp and update store
  requests.push(now);
  requestStore.set(identifier, requests);

  return false;
}

function getRemainingTime(identifier: string): number {
  const requests = requestStore.get(identifier) || [];
  if (requests.length === 0) return 0;

  const windowMs = 60 * 1000;
  const oldestRequest = Math.min(...requests);
  const timeUntilReset = oldestRequest + windowMs - Date.now();

  return Math.max(0, timeUntilReset);
}

export async function POST(request: Request) {
  try {
    // Get client info for rate limiting
    const headersList = headers();
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const identifier = ip;

    // Check rate limit
    if (isRateLimited(identifier)) {
      const remainingTime = Math.ceil(getRemainingTime(identifier) / 1000);
      return NextResponse.json(
        {
          error: `Trop de messages envoyés. Veuillez réessayer dans ${remainingTime} secondes.`,
          remainingTime,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("Discord webhook URL is not configured");
    }

    const embed = {
      title: "Nouveau message de contact",
      color: 0x3b82f6,
      fields: [
        {
          name: "Nom",
          value: name,
          inline: true,
        },
        {
          name: "Email",
          value: email,
          inline: true,
        },
        {
          name: "Sujet",
          value: subject,
        },
        {
          name: "Message",
          value: message,
        },
        {
          name: "Informations",
          value: `IP: ${identifier}`,
        },
      ],
      footer: {
        text: "Portfolio - Formulaire de contact",
      },
      timestamp: new Date().toISOString(),
    };

    const discordMessage = {
      embeds: [embed],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error("Failed to send Discord webhook");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
