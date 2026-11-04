import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import { CopyEmailButton } from "@/components/copy-email-button";
import { CvViewer } from "@/components/sections/CvViewer";
import { PROFILE } from "@/data/portfolioData";
import heroAvatar from "@/assets/hero.png";

const socialLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-300 ease-apple hover:bg-black/[0.05] hover:text-foreground active:scale-95 dark:hover:bg-white/10";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 md:pt-40"
    >
      {/* Ambient glow — radial gradient tanpa filter blur agar ringan (60 FPS) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20rem] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(129,140,248,0.20),transparent)] dark:bg-[radial-gradient(closest-side,rgba(129,140,248,0.30),transparent)]" />
        <div className="absolute right-[-14rem] top-[28%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.14),transparent)]" />
        <div className="absolute bottom-[-8rem] left-[-14rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(244,114,182,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(127,127,127,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,127,127,0.07)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Profile Avatar Frame */}
        <div className="relative mx-auto mb-6 inline-block animate-fade-up">
          <div
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-sky-500/30 via-indigo-500/25 to-emerald-500/30 blur-md"
          />
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border border-black/10 bg-background/80 shadow-2xl dark:border-white/20">
            <img
              src={heroAvatar}
              alt={PROFILE.name}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <span
            className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background"
            title="Tersedia untuk kolaborasi"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        <div>
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-black/[0.06] bg-white/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Tersedia untuk Kolaborasi &amp; Peluang Karir
          </div>
        </div>

        <h1 className="text-metallic mt-8 animate-fade-up pb-2 text-5xl font-semibold tracking-tighter [animation-delay:80ms] sm:text-7xl lg:text-8xl">
          {PROFILE.name}.
        </h1>

        <p className="mt-4 animate-fade-up text-xl font-medium tracking-tight text-foreground/90 [animation-delay:160ms] sm:text-3xl">
          {PROFILE.education} &amp;{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-sky-300 dark:to-emerald-300">
            {PROFILE.role}
          </span>
        </p>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground [animation-delay:240ms] sm:text-lg">
          {PROFILE.summary}
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:320ms]">
          <Button
            size="lg"
            className="group h-11 gap-2 rounded-full px-6 text-[15px]"
            render={<a href="#projects" />}
          >
            Lihat Proyek
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
          </Button>
          <CvViewer />
          <CopyEmailButton email={PROFILE.email} className="h-11 px-6 text-[15px]" />
        </div>

        <div className="mt-8 flex animate-fade-up items-center justify-center gap-1 [animation-delay:400ms]">
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Marco Siregar"
            className={socialLinkClass}
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Marco Siregar"
            className={socialLinkClass}
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={PROFILE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Marco Siregar"
            className={socialLinkClass}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Gulir ke bagian About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground sm:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};
