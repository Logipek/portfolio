import { NextResponse } from "next/server";
import { z } from "zod";
import { getRateLimiter, getClientIdentifier } from "@/lib/rate-limit";

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

  token: z.string(),
});

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const identifier = getClientIdentifier();
    const rateLimiter = getRateLimiter();

    if (rateLimiter.isRateLimited(identifier)) {
      const remainingTime = Math.ceil(
        rateLimiter.getRemainingTime(identifier) / 1000
      );
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

    const { name, email, subject, message, token } = result.data;

    // Vérification du token
    const expectedToken = await generateToken(email);
    if (token !== expectedToken) {
      return NextResponse.json({ error: "Token invalide" }, { status: 400 });
    }

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
          value: `IP: ${identifier.split("-")[0]}\nNavigateur: ${
            identifier.split("-")[1]
          }`,
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

// Génère un token unique basé sur l'email et un timestamp
async function generateToken(email: string): Promise<string> {
  const timestamp = Math.floor(Date.now() / (30 * 1000)); // Change toutes les 30 secondes
  const data = `${email}-${timestamp}-${
    process.env.NEXTAUTH_SECRET || "default-secret"
  }`;

  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
