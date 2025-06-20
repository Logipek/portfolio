import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  recaptchaToken: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message, recaptchaToken } = result.data;

    // Vérifier le jeton reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "Échec de la vérification reCAPTCHA" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("Discord webhook URL is not configured");
    }

    const timestamp = new Date().toISOString();
    const embed = {
      title: "Nouveau message du site: hugo-damion.me",
      color: 0x3b82f6, // Couleur bleue primary
      fields: [
        {
          name: "Nom de l'utilisateur",
          value: name,
          inline: true,
        },
        {
          name: "Email de l'utilisateur",
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
      ],
      timestamp,
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
