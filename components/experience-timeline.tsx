import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

const experiences: Experience[] = [
  {
    title: "Secrétaire association Pompiers Saint-Jean-Le-Blanc",
    company: "Association Pompiers Saint-Jean-Le-Blanc",
    period: "2024 - Présent",
    description: "Gestion des documents et des dossiers de l'association. Organisation des réunions et des événements."
  },
  {
    title: "Freelance Développeur Full Stack",
    company: "Hugo Damion",
    period: "2022 - Présent",
    description: "Développement d'applications web avec React, Next.js et Node.js. Mise en place d'architectures scalables et maintenance de systèmes existants."
  },
  {
    title: "Sapeur Pompier Volontaire",
    company: "Sapeur Pompier Volontaire",
    period: "2022 - Présent",
    description: "Sauvetage et secours aux personnes en difficulté. Participation à des opérations de secours et de lutte contre les incendies."
  }
];

export function ExperienceTimeline() {
  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-border">
          <div className="absolute left-[-8px] top-6 h-4 w-4 rounded-full bg-primary"></div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{exp.title}</CardTitle>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{exp.company}</span>
                <span>{exp.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{exp.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
} 