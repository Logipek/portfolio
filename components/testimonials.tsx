import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Raphael Leguy",
    role: "Directeur",
    company: "Société de nettoyage",
    content: "Un développeur exceptionnel qui a su transformer notre vision en réalité. Le site web qu'il a créé pour nous a considérablement amélioré notre présence en ligne."
  },
  {
    name: "Steven Lo",
    role: "Freelance",
    company: "Vente de vêtements",
    content: "Travailler avec ce développeur a été une expérience formidable. Sa capacité à comprendre nos besoins et à proposer des solutions innovantes a dépassé nos attentes."
  },
  {
    name: "Ahmed Eljikra",
    role: "Directeur",
    company: "Kebab Orléanais",
    content: "Un professionnel rigoureux et créatif. Sa maîtrise technique et son souci du détail ont fait toute la différence dans notre projet."
  }
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index}>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
            <p className="text-muted-foreground italic">"{testimonial.content}"</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 