import React, { useState } from "react";
import { Briefcase, Code2, Database, Server, type LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { EXPERIENCES, PROJECTS, TECH_STACK } from "@/data/portfolioData";

const HIGHLIGHTS: { icon: LucideIcon; title: string; desc: string; glow: string }[] = [
  {
    icon: Code2,
    title: "Aplikasi Web",
    desc: "Antarmuka responsif, modular, dan type-safe dengan React, TypeScript, dan Tailwind CSS.",
    glow: "from-sky-500/20",
  },
  {
    icon: Server,
    title: "Arsitektur REST API",
    desc: "Endpoint Node.js & Express.js dengan routing, validasi, dan autentikasi yang rapi.",
    glow: "from-indigo-500/20",
  },
  {
    icon: Database,
    title: "Manajemen Database",
    desc: "Skema relasional MySQL dan pemetaan data yang efisien dengan Sequelize ORM.",
    glow: "from-emerald-500/20",
  },
];

const ALL = "Semua";
const CATEGORIES = [ALL, ...Array.from(new Set(TECH_STACK.map((tech) => tech.category)))];

const METRICS = [
  { value: PROJECTS.length, label: "Proyek full-stack unggulan" },
  { value: TECH_STACK.length, label: "Teknologi inti dalam stack" },
  { value: EXPERIENCES.length, label: "Pengalaman magang" },
];

export const AboutAndTech: React.FC = () => {
  const [filter, setFilter] = useState<string>(ALL);
  const visibleTech = filter === ALL ? TECH_STACK : TECH_STACK.filter((t) => t.category === filter);
  const currentRole = EXPERIENCES[0];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tentang Saya"
          title="Logika backend. Pengalaman frontend."
          description="Menjembatani keduanya untuk menghasilkan produk web yang nyaman dipakai dan tangguh di sisi server."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Tile utama — About */}
          <GlassCard interactive className="p-7 sm:p-9 md:col-span-4 md:row-span-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(129,140,248,0.18),transparent)]"
            />
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Mahasiswa S1 Informatika dengan fokus rekayasa perangkat lunak berbasis web.
            </h3>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Fokus utama saya adalah mengembangkan aplikasi web yang tidak hanya nyaman digunakan
                di sisi antarmuka, tetapi juga tangguh di sisi server.
              </p>
              <p>
                Dalam keseharian, saya terbiasa membangun layanan{" "}
                <strong className="font-semibold text-foreground">REST API</strong>, merancang skema
                serta relasi basis data menggunakan{" "}
                <strong className="font-semibold text-foreground">MySQL</strong> dan{" "}
                <strong className="font-semibold text-foreground">Sequelize ORM</strong>, hingga
                mengintegrasikannya secara reaktif ke antarmuka{" "}
                <strong className="font-semibold text-foreground">React</strong>.
              </p>
            </div>
          </GlassCard>

          {/* Tile metrik */}
          <GlassCard interactive className="p-7 md:col-span-2">
            <dl className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-5">
              {METRICS.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="text-metallic text-4xl font-semibold tracking-tight sm:text-5xl">
                    {metric.value}
                  </dd>
                  <p aria-hidden="true" className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {metric.label}
                  </p>
                </div>
              ))}
            </dl>
          </GlassCard>

          {/* Tile peran saat ini */}
          {currentRole && (
            <GlassCard interactive className="p-7 md:col-span-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/[0.05] dark:bg-white/10">
                <Briefcase className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Saat ini · {currentRole.period}
              </p>
              <p className="mt-1 font-semibold leading-snug tracking-tight">{currentRole.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{currentRole.company}</p>
            </GlassCard>
          )}

          {/* Tiga pilar keahlian */}
          {HIGHLIGHTS.map(({ icon: Icon, title, desc, glow }) => (
            <GlassCard key={title} interactive className="group p-7 md:col-span-2">
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-700 ease-apple group-hover:opacity-100",
                  glow
                )}
              />
              <div className="relative">
                <Icon className="h-6 w-6" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </GlassCard>
          ))}

          {/* Tech stack dengan filter kategori */}
          <GlassCard className="p-7 sm:p-9 md:col-span-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Teknologi &amp; Alat Utama</h3>
              <div
                role="group"
                aria-label="Filter kategori teknologi"
                className="inline-flex w-fit flex-wrap gap-1 rounded-full bg-black/[0.04] p-1 dark:bg-white/[0.06]"
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={filter === category}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ease-apple",
                      filter === category
                        ? "bg-background text-foreground shadow-sm dark:bg-white/15"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {visibleTech.map((tech) => (
                <li
                  key={tech.name}
                  className="animate-fade-up rounded-2xl border border-black/[0.06] bg-background/60 px-4 py-2.5 [animation-duration:0.5s] dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span className="block text-sm font-medium">{tech.name}</span>
                  <span className="block text-[11px] text-muted-foreground">{tech.category}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
