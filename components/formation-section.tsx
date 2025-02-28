import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Formation = {
  title: string;
  period: string;
  description: string;
};

const formations: Formation[] = [
  {
    title: "Bachelor Développeur Full-Stack",
    period: "2024 - 2029",
    description: "Formation en développement web avec une spécialisation en technologies modernes comme React, Node.js et MongoDB."
  },
  {
    title: "Baccalauréat Technologique (STMG)",
    period: "2021 - 2024",
    description: "Baccalauréat Technologique avec spécialité Sciences et Technologies du Management et de la Gestion (STMG) option Gestion et Finance."
  }
];

export function FormationSection() {
  return (
    <section className="py-12 bg-muted/20 rounded-3xl p-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {formations.map((formation, index) => (
          <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-muted/20 rounded-t-lg pb-2">
              <CardTitle className="text-xl font-semibold text-primary">{formation.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="inline-block text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {formation.period}
                </span>
              </div>
              <p className="text-muted-foreground">{formation.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}