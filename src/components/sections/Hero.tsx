import React from "react";
import { ArrowRight, Download, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start space-y-6 max-w-3xl">
          {/* Status Badge */}
          <Badge
            variant="secondary"
            className="px-3 py-1 text-xs font-medium tracking-wide"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Tersedia untuk Kolaborasi & Peluang Karir
          </Badge>

          {/* Greeting & Headline */}
          <div className="space-y-3">
            <p className="text-base font-medium text-muted-foreground sm:text-lg">
              Halo, perkenalkan saya
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Marco.
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-muted-foreground sm:text-4xl">
              Mahasiswa S1 Informatika &{" "}
              <span className="text-foreground underline decoration-primary/40 decoration-wavy underline-offset-8">
                Full-Stack Web Developer
              </span>
            </h2>
          </div>

          {/* Summary */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Membangun aplikasi web end-to-end yang cepat, rapi, dan skalabel.
            Berfokus pada perancangan arsitektur{" "}
            <span className="font-medium text-foreground">REST API</span>,
            manajemen relasi database{" "}
            <span className="font-medium text-foreground">MySQL & Sequelize</span>,
            serta antarmuka modern dengan{" "}
            <span className="font-medium text-foreground">React & TypeScript</span>.
          </p>

         {/* CTA Buttons (Kompatibel dengan shadcn Base UI) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              className="group gap-2"
              render={<a href="#projects" />}
            >
              Lihat Proyek
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Dialog>
              <DialogTrigger
                render={
                  <Button variant="outline" size="lg" className="gap-2" />
                }
              >
                <Download className="h-4 w-4" />
                Download CV
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Curriculum Vitae - Marco
                  </DialogTitle>
                  <DialogDescription>
                    Ringkasan profil akademik S1 Informatika, pengalaman magang
                    Backend/Web Developer, dan daftar proyek teknis.
                  </DialogDescription>
                </DialogHeader>
                <div className="rounded-lg border bg-muted/40 p-4 text-sm space-y-2">
                  <p>
                    <strong>Fokus Utama:</strong> Full-Stack Web & REST API
                    Development
                  </p>
                  <p>
                    <strong>Stack Utama:</strong> React, TypeScript, Express.js,
                    Node.js, MySQL, Sequelize
                  </p>
                  <p>
                    <strong>Format File:</strong> PDF (Siap Cetak / ATS Friendly)
                  </p>
                </div>
                <DialogFooter className="sm:justify-end">
                  <Button
                    className="w-full sm:w-auto gap-2"
                    render={
                      <a href="/cv-marco.pdf" download="CV_Marco_FullStack.pdf" />
                    }
                  >
                    <Download className="h-4 w-4" />
                    Unduh File PDF
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Social Links */}
          <div className="flex items-center gap-4 pt-4 text-muted-foreground">
            <a
              href="https://github.com/marcosiregar26"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Marco"
              className="rounded-md p-2 transition-colors hover:bg-accent hover:text-foreground"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Marco"
              className="rounded-md p-2 transition-colors hover:bg-accent hover:text-foreground"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              aria-label="Email Marco"
              className="rounded-md p-2 transition-colors hover:bg-accent hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};