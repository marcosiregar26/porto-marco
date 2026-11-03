import React from "react";
import { Layers, Sparkles } from "lucide-react"; // Github dihapus dari sini
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PROJECTS } from "../../data/portfolioData";

// Tambahkan komponen SVG GithubIcon manual
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

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="border-t bg-muted/20 py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 space-y-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            Portofolio Karya
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Proyek Unggulan
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Implementasi sistem web full-stack mulai dari manajemen sesi real-time
            hingga sistem reservasi bebas bentrok jadwal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Layers className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="pt-1 text-sm leading-relaxed">
                    {project.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Highlight Tantangan Teknis */}
                  <div className="rounded-lg border bg-background/60 p-3.5 text-xs leading-relaxed text-muted-foreground">
                    <span className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Fokus & Tantangan Teknis:
                    </span>
                    {project.challengeAndDetails}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="flex items-center justify-between gap-3 border-t pt-4">
                {/* Modal Detail Fitur */}
                <Dialog>
                  <DialogTrigger
                    render={<Button variant="ghost" size="sm" />}
                  >
                    Detail Fitur
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>{project.shortDesc}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Solusi Arsitektur:</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.challengeAndDetails}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Fitur Utama:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          {project.features.map((feat: string, index: number) => (
                            <li key={index}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  render={
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                >
                  <GithubIcon className="h-4 w-4" /> {/* Menggunakan GithubIcon di sini */}
                  GitHub Repo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};