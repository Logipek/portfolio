"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowRight,
  MapPin,
  Phone,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription } from "./ui/alert";

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

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@hugo-damion.fr",
    description: "Pour toute demande de projet ou collaboration",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 6 52 57 83 07",
    description: "Disponible en semaine de 9h à 18h",
  },
  {
    icon: MapPin,
    title: "Localisation",
    value: "Paris, France",
    description: "Disponible pour des projets à distance",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Logipek",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/hugo-damion",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/hugodamion",
    icon: Twitter,
  },
];

type FieldErrors = {
  [key in 'name' | 'email' | 'subject' | 'message']?: string;
};

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  const validateField = (name: string, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[name as keyof typeof contactSchema.shape];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0]?.message || "Champ invalide";
        setErrors(prev => ({ ...prev, [name]: message }));
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Valider tous les champs avant l'envoi
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key, value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      setLoading(false);
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    try {
      const validatedData = contactSchema.parse(formData);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            `Trop de messages envoyés. Veuillez réessayer dans ${data.remainingTime} secondes.`
          );
        }
        throw new Error(data.error || "Une erreur est survenue");
      }

      toast.success(
        "Message envoyé avec succès! Je vous répondrai dans les plus brefs délais."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FieldErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FieldErrors] = err.message;
          }
          toast.error(err.message);
        });
        setErrors(newErrors);
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'envoi du message"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Valider le champ si déjà touché
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-md bg-secondary/50 backdrop-blur-sm border border-primary/5"
    >
      <h3 className="text-xl font-semibold mb-6">Envoyez-moi un message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nom"
              className={`bg-background/50 border-primary/10 focus:border-primary ${
                errors.name && touched.name ? "border-destructive" : ""
              }`}
              maxLength={100}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && touched.name && (
              <Alert variant="destructive" className="py-2 px-3">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription id="name-error" className="text-xs ml-2">
                    {errors.name}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={`bg-background/50 border-primary/10 focus:border-primary ${
                errors.email && touched.email ? "border-destructive" : ""
              }`}
              maxLength={254}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && touched.email && (
            <Alert variant="destructive" className="py-2 px-3">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="email-error" className="text-xs ml-2">
                  {errors.email}
                </AlertDescription>
              </div>
            </Alert>
          )}  
          </div>
        </div>
        <div className="space-y-2">
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Sujet"
            className={`bg-background/50 border-primary/10 focus:border-primary ${
              errors.subject && touched.subject ? "border-destructive" : ""
            }`}
            maxLength={200}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && touched.subject && (
          <Alert variant="destructive" className="py-2 px-3">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="subject-error" className="text-xs ml-2">
                {errors.subject}
              </AlertDescription>
            </div>
          </Alert>
        )}
        </div>
        <div className="space-y-2">
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Message"
            className={`min-h-[150px] bg-background/50 border-primary/10 focus:border-primary ${
              errors.message && touched.message ? "border-destructive" : ""
            }`}
            maxLength={5000}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && touched.message && (
          <Alert variant="destructive" className="py-2 px-3">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="message-error" className="text-xs ml-2">
                {errors.message}
              </AlertDescription>
            </div>
          </Alert>
        )}
          <div className="text-xs text-muted-foreground text-right">
            {formData.message.length}/5000 caractères
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer le message
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold gradient-text mb-4">Contact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une idée de projet ? N&apos;hésitez pas à me contacter pour en discuter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-md bg-secondary/50 backdrop-blur-sm border border-primary/5 hover:bg-secondary/70 hover:border-primary/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                    <p className="text-primary font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-md bg-secondary/50 backdrop-blur-sm border border-primary/5"
            >
              <h3 className="text-lg font-semibold mb-4">Réseaux sociaux</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-primary/10 transition-colors group"
                  >
                    <link.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
