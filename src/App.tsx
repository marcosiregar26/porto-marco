import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutAndTech } from "@/components/sections/AboutAndTech";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { ApiPlayground } from "@/components/sections/ApiPlayground";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { CommandPalette } from "@/components/command-palette";

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme === "dark" : true; // Default: Space Black
    }
    return true;
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground antialiased selection:bg-sky-500/30">
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />
      <main>
        <Hero />
        <AboutAndTech />
        <Experience />
        <Projects />
        <ApiPlayground />
        <ContactAndFooter />
      </main>

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
    </div>
  );
}

export default App;
