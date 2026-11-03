import React from "react";
import { Server, Database, Code2, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TECH_STACK } from "../../data/portfolioData";

export const AboutAndTech: React.FC = () => {
  const highlights = [
    {
      icon: <Code2 className="h-5 w-5 text-primary" />,
      title: "Pengembangan Aplikasi Web",
      desc: "Membangun antarmuka pengguna yang responsif, modular, dan type-safe menggunakan React, TypeScript, dan Tailwind CSS.",
    },
    {
      icon: <Server className="h-5 w-5 text-primary" />,
      title: "Arsitektur REST API",
      desc: "Merancang endpoint backend menggunakan Node.js dan Express.js dengan struktur routing, validasi, dan autentikasi yang rapi.",
    },
    {
      icon: <Database className="h-5 w-5 text-primary" />,
      title: "Manajemen Database",
      desc: "Mengelola skema relasional MySQL dan mengoptimalkan pemetaan objek data menggunakan Sequelize ORM.",
    },
  ];

  return (
    <section id="about" className="border-t bg-muted/20 py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Kolom Kiri: Deskripsi About Me */}
          <div className="space-y-4 lg:col-span-6">
            <Badge variant="outline" className="text-xs uppercase tracking-wider">
              Tentang Saya
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Menjembatani Logika Backend & Pengalaman Frontend
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Saya adalah mahasiswa <strong>S1 Informatika</strong> yang memiliki
              ketertarikan mendalam pada rekayasa perangkat lunak berbasis web.
              Fokus utama saya adalah mengembangkan aplikasi web yang tidak hanya
              nyaman digunakan di sisi antarmuka, tetapi juga tangguh di sisi
              server.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Dalam keseharian ngoding, saya terbiasa membangun layanan{" "}
              <strong>REST API</strong>, merancang skema serta relasi basis data
              menggunakan <strong>MySQL</strong> dan <strong>Sequelize ORM</strong>,
              hingga mengintegrasikannya secara reaktif ke antarmuka{" "}
              <strong>React</strong>.
            </p>

            {/* Tech Stack Badges */}
            <div className="pt-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Cpu className="h-4 w-4 text-primary" />
                <span>Teknologi & Alat Utama:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: 3 Pilar Keahlian */}
          <div className="grid gap-4 lg:col-span-6">
            {highlights.map((item) => (
              <Card
                key={item.title}
                className="transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                    {item.icon}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};