import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCommandPalette: () => void;
}

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "API Lab", id: "playground" },
  { label: "Contact", id: "contact" },
] as const;

const SECTION_IDS: readonly string[] = NAV_LINKS.map((link) => link.id);

const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-300 ease-apple hover:bg-black/[0.06] hover:text-foreground active:scale-95 dark:hover:bg-white/10";

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenCommandPalette,
}) => {
  const active = useActiveSection(SECTION_IDS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Micro-indicator: pill latar yang "meluncur" mengikuti link aktif.
  useLayoutEffect(() => {
    const update = () => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-nav-id="${active}"]`);
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };
    update();
    window.addEventListener("resize", update);
    void document.fonts.ready.then(update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:pt-4">
      <nav
        aria-label="Navigasi utama"
        className={cn(
          "pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-1 rounded-full border border-black/[0.06] bg-white/60 py-1.5 pl-5 pr-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-500 ease-apple dark:border-white/10 dark:bg-black/40 lg:w-auto lg:max-w-none",
          scrolled &&
            "bg-white/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.28)] dark:bg-black/60 dark:shadow-2xl"
        )}
      >
        <a
          href="#home"
          className="mr-3 text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          Marco<span className="text-muted-foreground">.dev</span>
        </a>

        {/* Desktop links + sliding indicator */}
        <ul ref={listRef} className="relative hidden items-center lg:flex">
          <li
            aria-hidden="true"
            role="presentation"
            className="absolute inset-y-0 rounded-full bg-black/[0.06] transition-[left,width,opacity] duration-500 ease-apple dark:bg-white/10"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  data-nav-id={link.id}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Quick Spotlight Trigger */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          aria-label="Buka pencarian cepat (Cmd+K)"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-black/[0.03] px-2.5 py-1 text-xs text-muted-foreground transition-all duration-300 ease-apple hover:bg-black/[0.08] hover:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/10 lg:ml-2"
        >
          <Search className="h-3 w-3" />
          <span className="font-mono text-[10px] tracking-tight">⌘K</span>
        </button>

        <div className="flex items-center gap-0.5 sm:ml-1">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Buka pencarian cepat"
            className={cn(iconButtonClass, "sm:hidden")}
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            className={iconButtonClass}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            className={cn(iconButtonClass, "lg:hidden")}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="pointer-events-auto absolute inset-x-3 top-[4.25rem] mx-auto max-w-3xl animate-fade-up rounded-3xl border border-black/[0.06] bg-white/80 p-2 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 [animation-duration:0.45s] dark:border-white/10 dark:bg-black/70 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors",
                    active === link.id
                      ? "bg-black/[0.05] text-foreground dark:bg-white/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
