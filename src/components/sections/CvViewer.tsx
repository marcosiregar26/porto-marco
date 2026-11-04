import React, { useCallback, useEffect } from "react";
import { Download, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EXPERIENCES, PROFILE, PROJECTS, TECH_STACK } from "@/data/portfolioData";

const PRINT_CLASS = "printing-cv";

const TECH_BY_CATEGORY = TECH_STACK.reduce<Record<string, string[]>>((acc, tech) => {
  (acc[tech.category] ??= []).push(tech.name);
  return acc;
}, {});

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, "");

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="border-b border-neutral-300 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-900">
        {title}
      </h2>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

/** Pratinjau CV ATS-friendly di dalam modal, lengkap dengan mode cetak bersih. */
export const CvViewer: React.FC = () => {
  useEffect(() => {
    const cleanup = () => document.body.classList.remove(PRINT_CLASS);
    window.addEventListener("afterprint", cleanup);
    return () => {
      window.removeEventListener("afterprint", cleanup);
      cleanup();
    };
  }, []);

  const handlePrint = useCallback(() => {
    document.body.classList.add(PRINT_CLASS);
    window.print();
  }, []);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="lg" className="h-11 gap-2 rounded-full px-6 text-[15px]" />
        }
      >
        <FileText className="h-4 w-4" />
        Lihat CV
      </DialogTrigger>

      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="cv-toolbar gap-3 border-b px-5 py-4 pr-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-left">
            <DialogTitle>Curriculum Vitae</DialogTitle>
            <DialogDescription>Pratinjau ATS-friendly · siap cetak</DialogDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={handlePrint}>
              <Printer className="h-3.5 w-3.5" />
              Cetak / Simpan PDF
            </Button>
            <Button
              size="sm"
              className="gap-1.5 rounded-full"
              render={<a href={PROFILE.cvUrl} download="CV_Marco_Siregar.pdf" />}
            >
              <Download className="h-3.5 w-3.5" />
              Unduh
            </Button>
          </div>
        </DialogHeader>

        <div className="cv-scroll overflow-y-auto bg-muted/50 p-3 sm:p-8">
          <article
            id="cv-print"
            className="mx-auto max-w-[210mm] bg-white p-7 font-sans text-[13px] leading-relaxed text-neutral-700 shadow-xl ring-1 ring-black/5 sm:p-12"
          >
            <header>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{PROFILE.name}</h1>
              <p className="mt-0.5 font-medium text-neutral-600">
                {PROFILE.role} · {PROFILE.education}
              </p>
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-neutral-600">
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                <span aria-hidden="true">·</span>
                <a href={PROFILE.githubUrl}>{stripProtocol(PROFILE.githubUrl)}</a>
                <span aria-hidden="true">·</span>
                <a href={PROFILE.linkedinUrl}>{stripProtocol(PROFILE.linkedinUrl)}</a>
                <span aria-hidden="true">·</span>
                <a href={PROFILE.instagramUrl}>instagram.com/{PROFILE.instagramHandle}</a>
              </p>
            </header>

            <CvSection title="Ringkasan">
              <p>{PROFILE.summary}</p>
            </CvSection>

            <CvSection title="Keahlian Teknis">
              <dl className="grid gap-1">
                {Object.entries(TECH_BY_CATEGORY).map(([category, items]) => (
                  <div key={category} className="flex gap-2">
                    <dt className="w-24 shrink-0 font-semibold text-neutral-900">{category}</dt>
                    <dd>{items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </CvSection>

            <CvSection title="Pengalaman">
              {EXPERIENCES.map((exp) => (
                <div key={`${exp.role}-${exp.company}`} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900">
                      {exp.role} — {exp.company}
                    </h3>
                    <span className="text-[12px] text-neutral-500">{exp.period}</span>
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5">
                    {exp.achievements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CvSection>

            <CvSection title="Proyek">
              <div className="space-y-4">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="break-inside-avoid">
                    <h3 className="font-semibold text-neutral-900">{project.title}</h3>
                    <p className="text-[12px] text-neutral-500">{project.techStack.join(" · ")}</p>
                    <p className="mt-1">{project.shortDesc}</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CvSection>

            <CvSection title="Pendidikan">
              <p className="font-semibold text-neutral-900">S1 Informatika — Mahasiswa aktif</p>
            </CvSection>
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
};

