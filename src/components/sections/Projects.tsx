import React, { useId, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Database,
  KeyRound,
  Layers,
  Monitor,
  Server,
  Sparkles,
  Table,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { PROJECTS, type ProjectItem } from "@/data/portfolioData";

type TabId = "overview" | "architecture" | "database" | "solution";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Arsitektur" },
  { id: "database", label: "Skema DB (ERD)" },
  { id: "solution", label: "Solusi Teknis" },
];

interface ArchitectureLayer {
  label: string;
  icon: LucideIcon;
  items: string[];
}

const LAYER_DEFINITIONS: { label: string; icon: LucideIcon; tech: string[] }[] = [
  { label: "Client", icon: Monitor, tech: ["React", "TypeScript", "Tailwind CSS"] },
  { label: "REST API", icon: Server, tech: ["Node.js", "Express.js"] },
  { label: "ORM", icon: Layers, tech: ["Sequelize ORM"] },
  { label: "Database", icon: Database, tech: ["MySQL"] },
];

/** Bangun skema arsitektur langsung dari techStack proyek (tanpa data rekaan). */
function buildLayers(stack: string[]): ArchitectureLayer[] {
  return LAYER_DEFINITIONS.map(({ label, icon, tech }) => ({
    label,
    icon,
    items: stack.filter((t) => tech.includes(t)),
  })).filter((layer) => layer.items.length > 0);
}

interface DatabaseTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    isPrimary?: boolean;
    isForeign?: boolean;
    references?: string;
  }[];
}

const PROJECT_DATABASE_SCHEMAS: Record<string, DatabaseTable[]> = {
  "wa-broadcast-otp": [
    {
      name: "device_sessions",
      description: "Status autentikasi & streaming sesi browser WhatsApp",
      columns: [
        { name: "id", type: "BIGINT", isPrimary: true },
        { name: "device_token", type: "VARCHAR(64)" },
        { name: "qr_payload", type: "TEXT" },
        { name: "is_authenticated", type: "BOOLEAN" },
        { name: "expires_at", type: "DATETIME" },
      ],
    },
    {
      name: "otp_requests",
      description: "Kode verifikasi OTP berbatas waktu (TTL)",
      columns: [
        { name: "id", type: "BIGINT", isPrimary: true },
        { name: "session_id", type: "BIGINT", isForeign: true, references: "device_sessions(id)" },
        { name: "recipient_phone", type: "VARCHAR(20)" },
        { name: "otp_hash", type: "VARCHAR(255)" },
        { name: "status", type: "ENUM" },
      ],
    },
    {
      name: "broadcast_logs",
      description: "Histori & antrean rate-limited pengiriman pesan massal",
      columns: [
        { name: "id", type: "BIGINT", isPrimary: true },
        { name: "message_body", type: "TEXT" },
        { name: "rate_limit_delay", type: "INT" },
        { name: "total_sent", type: "INT" },
        { name: "created_at", type: "DATETIME" },
      ],
    },
  ],
  "room-booking-system": [
    {
      name: "rooms",
      description: "Katalog master ruangan fisik & kapasitas",
      columns: [
        { name: "id", type: "INT", isPrimary: true },
        { name: "name", type: "VARCHAR(100)" },
        { name: "capacity", type: "INT" },
        { name: "facilities", type: "JSON" },
        { name: "is_active", type: "BOOLEAN" },
      ],
    },
    {
      name: "bookings",
      description: "Reservasi dengan interval waktu untuk validasi bentrok",
      columns: [
        { name: "id", type: "BIGINT", isPrimary: true },
        { name: "room_id", type: "INT", isForeign: true, references: "rooms(id)" },
        { name: "user_id", type: "BIGINT" },
        { name: "start_time", type: "DATETIME" },
        { name: "end_time", type: "DATETIME" },
        { name: "status", type: "ENUM" },
      ],
    },
    {
      name: "booking_approvals",
      description: "Log persetujuan berjenjang Peminjam & Admin",
      columns: [
        { name: "id", type: "BIGINT", isPrimary: true },
        { name: "booking_id", type: "BIGINT", isForeign: true, references: "bookings(id)" },
        { name: "admin_id", type: "BIGINT" },
        { name: "notes", type: "VARCHAR(255)" },
        { name: "action_date", type: "DATETIME" },
      ],
    },
  ],
};

function TrafficLights() {
  return (
    <div className="flex gap-2" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

function ArchitectureSchema({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {layers.map(({ label, icon: Icon, items }, index) => (
          <React.Fragment key={label}>
            <div className="relative flex-1 rounded-2xl border border-black/[0.06] bg-background/70 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
                style={{ animationDelay: `${index * 250}ms` }}
              />
              <Icon className="h-4 w-4 text-muted-foreground" />
              <p className="mt-2 text-xs font-semibold">{label}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                {items.join(" · ")}
              </p>
            </div>
            {index < layers.length - 1 && (
              <div className="flex justify-center text-muted-foreground" aria-hidden="true">
                <ArrowDown className="h-4 w-4 sm:hidden" />
                <ArrowRight className="hidden h-4 w-4 sm:block" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Visualisasi alur request */}
      <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-black/[0.05] dark:bg-white/10" aria-hidden="true">
        <div className="absolute inset-y-0 w-1/4 animate-flow rounded-full bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Alur request: Client → API → ORM → Database, lalu respons JSON kembali ke Client.
      </p>
    </div>
  );
}

function DatabaseSchemaView({ tables }: { tables: DatabaseTable[] }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {tables.map((tbl) => (
          <div
            key={tbl.name}
            className="rounded-2xl border border-black/[0.06] bg-background/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
              <Table className="h-3.5 w-3.5 text-primary" />
              <span>{tbl.name}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground leading-tight">
              {tbl.description}
            </p>
            <ul className="mt-2.5 space-y-1 font-mono text-[11px]">
              {tbl.columns.map((col) => (
                <li
                  key={col.name}
                  className="flex items-center justify-between border-t border-black/[0.04] pt-1 dark:border-white/[0.04]"
                >
                  <span className="flex items-center gap-1.5 text-foreground/90">
                    {col.isPrimary && (
                      <span className="flex items-center gap-0.5 rounded bg-amber-400/15 px-1 py-0.2 text-[9px] font-bold text-amber-500 dark:text-amber-300">
                        <KeyRound className="h-2.5 w-2.5" /> PK
                      </span>
                    )}
                    {col.isForeign && (
                      <span
                        className="rounded bg-sky-400/15 px-1 py-0.2 text-[9px] font-bold text-sky-500 dark:text-sky-300"
                        title={`Ref: ${col.references}`}
                      >
                        FK
                      </span>
                    )}
                    <span>{col.name}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">{col.type}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Relasi relasional diimplementasikan dengan <strong>Sequelize ORM</strong> di atas <strong>MySQL</strong>.
      </p>
    </div>
  );
}

function ProjectWindow({ project }: { project: ProjectItem }) {
  const [tab, setTab] = useState<TabId>("overview");
  const baseId = useId();
  const layers = buildLayers(project.techStack);
  const tables = PROJECT_DATABASE_SCHEMAS[project.id] ?? [];

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.findIndex((t) => t.id === tab);
    let next: number;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    const nextTab = TABS[next];
    setTab(nextTab.id);
    document.getElementById(`${baseId}-tab-${nextTab.id}`)?.focus();
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-card/80 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 ease-apple hover:-translate-y-1 hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-[#111113]/90">
      {/* Title bar macOS */}
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <TrafficLights />
        <div className="mx-auto max-w-[70%] truncate rounded-md bg-black/[0.04] px-3 py-1 font-mono text-[11px] text-muted-foreground dark:bg-white/[0.06]">
          ~/projects/{project.id}
        </div>
        <span className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>

        {/* Segmented control tabs */}
        <div
          role="tablist"
          aria-label={`Detail ${project.title}`}
          onKeyDown={onTabKeyDown}
          className="mt-5 inline-flex w-full flex-wrap rounded-full bg-black/[0.04] p-1 dark:bg-white/[0.06] sm:w-fit"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`${baseId}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`${baseId}-panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-apple sm:flex-none sm:px-3.5",
                tab === t.id
                  ? "bg-background text-foreground shadow-sm dark:bg-white/15"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          key={tab}
          id={`${baseId}-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab}`}
          className="mt-5 min-h-[250px] flex-1 animate-fade-up [animation-duration:0.4s]"
        >
          {tab === "overview" && (
            <div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{project.shortDesc}</p>
              <ul className="mt-4 space-y-2.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "architecture" && <ArchitectureSchema layers={layers} />}

          {tab === "database" && <DatabaseSchemaView tables={tables} />}

          {tab === "solution" && (
            <div className="rounded-2xl border border-black/[0.06] bg-background/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Tantangan &amp; Solusi
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.challengeAndDetails}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-5 dark:border-white/10">
          <ul className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted-foreground dark:bg-white/[0.06]"
              >
                {tech}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            render={<a href={project.githubUrl} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon className="h-4 w-4" />
            Lihat di GitHub
          </Button>
        </div>
      </div>
    </article>
  );
}

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portofolio Karya"
          title="Proyek Unggulan"
          description="Sistem web full-stack — dari manajemen sesi real-time hingga reservasi bebas bentrok jadwal."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectWindow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
