import React from "react";
import { Briefcase, CheckCircle2, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES } from "../../data/portfolioData";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="border-t py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 space-y-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            Perjalanan Praktis
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pengalaman & Magang
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Pengalaman langsung dalam membangun sistem produksi, mengelola
            database, dan merancang layanan API.
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <Card
              key={idx}
              className="overflow-hidden border-l-4 border-l-primary transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Briefcase className="h-5 w-5 text-primary" />
                    {exp.role}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-foreground/80 mt-1">
                    {exp.company}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="w-fit gap-1.5 px-3 py-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.period}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>

                <ul className="space-y-2.5">
                  {exp.achievements.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.techUsed.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};