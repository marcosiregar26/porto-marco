import React from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { EXPERIENCES } from "@/data/portfolioData";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Perjalanan Praktis"
          title="Pengalaman & Magang"
          description="Pengalaman langsung membangun sistem produksi, mengelola database, dan merancang layanan API."
        />

        <ol className="relative mt-14 space-y-6 border-l border-black/10 pl-6 dark:border-white/10 sm:pl-10">
          {EXPERIENCES.map((exp) => (
            <li key={`${exp.role}-${exp.company}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-8 h-3 w-3 rounded-full border-2 border-background bg-foreground ring-4 ring-foreground/10 sm:-left-[47px]"
              />
              <GlassCard interactive className="p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{exp.role}</h3>
                    <p className="mt-1 text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/[0.05] px-3 py-1 text-xs font-medium dark:bg-white/10">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </span>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>

                <ul className="mt-5 space-y-3">
                  {exp.achievements.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {exp.techUsed.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-black/[0.08] px-3 py-1 text-xs text-muted-foreground dark:border-white/10"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
