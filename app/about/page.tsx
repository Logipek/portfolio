import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Testimonials } from "@/components/testimonials";
import { StatsSection } from "@/components/stats-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { FormationSection } from "@/components/formation-section";

export const metadata: Metadata = {
  title: "À propos",
  description: "En savoir plus sur moi et mes compétences",
};

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto py-16 space-y-20 mt-20">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">Qui suis-je?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Je suis un développeur passionné par la création d&apos;applications web modernes et performantes.
            Avec plusieurs années d&apos;expérience dans le développement front-end et back-end, je m&apos;efforce
            de créer des expériences utilisateur exceptionnelles.
          </p>

          <h2 className="text-3xl font-semibold mt-10">Mon parcours</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mon voyage dans le monde du développement a commencé quand j&apos;avais 13 ans, j&apos;ai créé
            mon premier site web. Depuis, j&apos;ai travaillé sur divers projets, allant des applications web
            aux solutions e-commerce, en passant par des plateformes éducatives.
          </p>
        </div>

        <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl mx-auto w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
          <Image
            src="/profile.png"
            alt="Photo de profil"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="py-16 bg-muted/30 rounded-2xl p-8">
        <StatsSection />
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-semibold mb-12 text-center">Mes valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ValueCard
            title="Qualité"
            description="Je m'engage à produire un code propre, maintenable et performant pour chaque projet."
          />
          <ValueCard
            title="Innovation"
            description="Je reste constamment à jour avec les dernières technologies et meilleures pratiques."
          />
          <ValueCard
            title="Communication"
            description="Je crois en une communication claire et transparente tout au long du processus de développement."
          />
        </div>
      </section>

      {/* <section className="py-16 bg-muted/30 rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-12 text-center">Mes compétences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <SkillCard name="React" level={90} />
          <SkillCard name="Next.js" level={85} />
          <SkillCard name="TypeScript" level={80} />
          <SkillCard name="Node.js" level={75} />
          <SkillCard name="Tailwind CSS" level={95} />
          <SkillCard name="UI/UX Design" level={70} />
          <SkillCard name="GraphQL" level={65} />
          <SkillCard name="AWS" level={60} />
        </div>
      </section> */}

      <section className="py-16 bg-muted/30 rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-12 text-center">Expérience professionnelle</h2>
        <ExperienceTimeline />
      </section>

      <section className="">
        <h2 className="text-3xl font-semibold mb-12 text-center">Ce que disent mes clients</h2>
        <Testimonials />
      </section>

      <section className="py-16 bg-muted/30 rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-12 text-center">Formation</h2>
       <FormationSection />
      </section>

      <section>
        <ContactSection />
      </section>
    </div>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-8">
        <h3 className="text-2xl font-medium mb-4">{title}</h3>
        <p className="text-muted-foreground text-lg">{description}</p>
      </CardContent>
    </Card>
  );
}

function SkillCard({ name, level }: { name: string; level: number }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">{name}</h3>
          <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">{level}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
