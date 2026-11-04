import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Home,
  Layers,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  Terminal,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { InstagramIcon } from "@/components/icons";
import { PROFILE } from "@/data/portfolioData";

export interface CommandItem {
  id: string;
  category: "Navigasi" | "Aksi Cepat" | "API Lab" | "Sosial";
  title: string;
  subtitle?: string;
  keywords: string[];
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  darkMode,
  onToggleDarkMode,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const baseId = useId();
  const { copy } = useCopyToClipboard();

  const scrollToSection = (id: string) => {
    onOpenChange(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigasi
      {
        id: "nav-home",
        category: "Navigasi",
        title: "Home",
        subtitle: "Kembali ke beranda paling atas",
        keywords: ["home", "beranda", "atas", "hero", "marco"],
        icon: <Home className="h-4 w-4" />,
        action: () => scrollToSection("home"),
      },
      {
        id: "nav-about",
        category: "Navigasi",
        title: "Tentang & Tech Stack",
        subtitle: "Bento grid, statistik, dan teknologi utama",
        keywords: ["about", "tentang", "stack", "react", "typescript", "mysql", "sequelize"],
        icon: <User className="h-4 w-4" />,
        action: () => scrollToSection("about"),
      },
      {
        id: "nav-experience",
        category: "Navigasi",
        title: "Pengalaman & Magang",
        subtitle: "Riwayat peran di Divisi TI & Sistem Akademik",
        keywords: ["experience", "pengalaman", "magang", "intern", "backend"],
        icon: <Briefcase className="h-4 w-4" />,
        action: () => scrollToSection("experience"),
      },
      {
        id: "nav-projects",
        category: "Navigasi",
        title: "Portofolio Proyek",
        subtitle: "Sistem Broadcast WhatsApp & Sistem Booking Ruangan",
        keywords: ["projects", "proyek", "karya", "whatsapp", "booking", "otp"],
        icon: <Layers className="h-4 w-4" />,
        action: () => scrollToSection("projects"),
      },
      {
        id: "nav-playground",
        category: "Navigasi",
        title: "API Lab Playground",
        subtitle: "Terminal interaktif uji coba endpoint REST API",
        keywords: ["api", "lab", "playground", "terminal", "rest", "curl", "test"],
        icon: <Terminal className="h-4 w-4" />,
        action: () => scrollToSection("playground"),
      },
      {
        id: "nav-contact",
        category: "Navigasi",
        title: "Kontak & Kolaborasi",
        subtitle: "Kirim pesan langsung atau hubungi via WhatsApp",
        keywords: ["contact", "kontak", "pesan", "email", "whatsapp", "hubungi"],
        icon: <Mail className="h-4 w-4" />,
        action: () => scrollToSection("contact"),
      },

      // Aksi Cepat
      {
        id: "act-copy-email",
        category: "Aksi Cepat",
        title: "Salin Alamat Email",
        subtitle: PROFILE.email,
        keywords: ["salin", "copy", "email", "alamat", "surat"],
        icon: <Copy className="h-4 w-4" />,
        action: () => {
          void copy(PROFILE.email);
          onOpenChange(false);
        },
      },
      {
        id: "act-cv",
        category: "Aksi Cepat",
        title: "Unduh File CV (PDF)",
        subtitle: "Download Curriculum Vitae resmi Marco Siregar",
        keywords: ["cv", "resume", "unduh", "download", "pdf", "biodata"],
        icon: <FileText className="h-4 w-4" />,
        action: () => {
          onOpenChange(false);
          const link = document.createElement("a");
          link.href = PROFILE.cvUrl;
          link.download = "CV_Marco_Siregar.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        id: "act-theme",
        category: "Aksi Cepat",
        title: darkMode ? "Beralih ke Mode Terang (Light)" : "Beralih ke Mode Gelap (Dark)",
        subtitle: darkMode ? "Tampilan Silver Aluminium" : "Tampilan Space Black",
        keywords: ["tema", "theme", "dark", "light", "mode", "gelap", "terang"],
        icon: darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />,
        action: () => {
          onToggleDarkMode();
          onOpenChange(false);
        },
      },

      // API Lab
      {
        id: "api-otp",
        category: "API Lab",
        title: "Jalankan Endpoint: Generate OTP WhatsApp",
        subtitle: "POST /api/otp/generate",
        keywords: ["otp", "whatsapp", "generate", "post", "api"],
        icon: <Code2 className="h-4 w-4 text-sky-400" />,
        action: () => scrollToSection("playground"),
      },
      {
        id: "api-booking",
        category: "API Lab",
        title: "Jalankan Endpoint: Cari Ruangan Tersedia",
        subtitle: "GET /api/rooms",
        keywords: ["rooms", "ruangan", "booking", "get", "api"],
        icon: <Sparkles className="h-4 w-4 text-emerald-400" />,
        action: () => scrollToSection("playground"),
      },

      // Sosial
      {
        id: "social-github",
        category: "Sosial",
        title: "Buka GitHub",
        subtitle: PROFILE.githubUrl,
        keywords: ["github", "repo", "kode", "git"],
        icon: <ExternalLink className="h-4 w-4" />,
        action: () => {
          window.open(PROFILE.githubUrl, "_blank", "noreferrer");
          onOpenChange(false);
        },
      },
      {
        id: "social-linkedin",
        category: "Sosial",
        title: "Buka LinkedIn",
        subtitle: PROFILE.linkedinUrl,
        keywords: ["linkedin", "profil", "koneksi", "karir"],
        icon: <ExternalLink className="h-4 w-4" />,
        action: () => {
          window.open(PROFILE.linkedinUrl, "_blank", "noreferrer");
          onOpenChange(false);
        },
      },
      {
        id: "social-instagram",
        category: "Sosial",
        title: "Buka Instagram",
        subtitle: `@${PROFILE.instagramHandle}`,
        keywords: ["instagram", "ig", "sosial", "foto", "feed", "marco"],
        icon: <InstagramIcon className="h-4 w-4" />,
        action: () => {
          window.open(PROFILE.instagramUrl, "_blank", "noreferrer");
          onOpenChange(false);
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkMode]
  );

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle?.toLowerCase().includes(q) ||
        cmd.keywords.some((k) => k.includes(q))
    );
  }, [commands, query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands, selectedIndex, onOpenChange]);

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const activeEl = listRef.current?.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`);
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${baseId}-title`}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-up [animation-duration:0.2s]"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Spotlight Window */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 animate-fade-up [animation-duration:0.3s] dark:border-white/15 dark:bg-[#121214]/90">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3.5 dark:border-white/10">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            id={`${baseId}-title`}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Ketik perintah atau cari... (misal: Proyek, CV, API, Email, IG)"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <span className="rounded bg-black/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-white/10">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul ref={listRef} role="listbox" className="space-y-1">
              {filteredCommands.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    data-index={index}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-colors duration-150",
                      isSelected
                        ? "bg-black/[0.06] text-foreground dark:bg-white/10"
                        : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground dark:hover:bg-white/[0.05]"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-background/80 dark:border-white/10",
                          isSelected && "text-foreground"
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="truncate">
                        <p className="font-medium text-foreground">{item.title}</p>
                        {item.subtitle && (
                          <p className="text-[11px] text-muted-foreground truncate">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground ml-2 font-mono">
                      {item.category}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-2 text-[11px] text-muted-foreground dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono text-[10px] bg-black/[0.05] dark:bg-white/10 px-1 py-0.5 rounded">↑</kbd>
              <kbd className="font-mono text-[10px] bg-black/[0.05] dark:bg-white/10 px-1 py-0.5 rounded ml-0.5">↓</kbd> Navigasi
            </span>
            <span>
              <kbd className="font-mono text-[10px] bg-black/[0.05] dark:bg-white/10 px-1 py-0.5 rounded">↵</kbd> Pilih
            </span>
          </div>
          <span>macOS Spotlight Style</span>
        </div>
      </div>
    </div>
  );
}
