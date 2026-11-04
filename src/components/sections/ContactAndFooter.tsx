import React, { useState } from "react";
import { ArrowUpRight, Mail, MailCheck, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { CopyEmailButton } from "@/components/copy-email-button";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import { PROFILE } from "@/data/portfolioData";

const CURRENT_YEAR = new Date().getFullYear();

const WHATSAPP_URL = PROFILE.whatsappNumber
  ? `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
      "Halo Marco, saya melihat portofolio Anda dan ingin berdiskusi."
    )}`
  : null;

const fieldClass =
  "h-11 rounded-xl bg-background/60 px-3.5 dark:bg-white/[0.04]";

interface ContactRowProps {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}

function ContactRow({ href, label, value, icon, external = false }: ContactRowProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors duration-300 ease-apple hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] dark:bg-white/10">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium">{value}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export const ContactAndFooter: React.FC = () => {
  const [mailOpened, setMailOpened] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Pesan Portofolio dari ${formData.name}`;
    const body = `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    // Isi form sengaja tidak dihapus: jika aplikasi email gagal terbuka, pesan tidak hilang.
    setMailOpened(true);
  };

  return (
    <>
      <section id="contact" className="py-24 sm:py-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Kontak"
                title="Mari berdiskusi."
                description="Tertarik berkolaborasi dalam proyek web, membahas arsitektur API, atau menawarkan peluang magang/kerja? Saya siap mendengar."
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <CopyEmailButton email={PROFILE.email} className="h-11 px-5" />
                {WHATSAPP_URL && (
                  <Button
                    size="lg"
                    className="h-11 gap-2 rounded-full bg-[#25D366] px-5 text-white hover:bg-[#1ebe5b]"
                    render={<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" />}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat WhatsApp
                  </Button>
                )}
              </div>

              <GlassCard className="mt-8 p-2">
                <ContactRow
                  href={`mailto:${PROFILE.email}`}
                  label="Email"
                  value={PROFILE.email}
                  icon={<Mail className="h-4 w-4" />}
                />
                <ContactRow
                  href={PROFILE.githubUrl}
                  label="GitHub"
                  value={`github.com/${PROFILE.githubHandle}`}
                  icon={<GithubIcon className="h-4 w-4" />}
                  external
                />
                <ContactRow
                  href={PROFILE.linkedinUrl}
                  label="LinkedIn"
                  value={PROFILE.name}
                  icon={<LinkedinIcon className="h-4 w-4" />}
                  external
                />
                <ContactRow
                  href={PROFILE.instagramUrl}
                  label="Instagram"
                  value={`@${PROFILE.instagramHandle}`}
                  icon={<InstagramIcon className="h-4 w-4" />}
                  external
                />
              </GlassCard>
            </div>

            <div className="lg:col-span-7">
              <GlassCard className="p-6 sm:p-9">
                <h3 className="text-xl font-semibold tracking-tight">Kirim pesan langsung</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Pesan akan dibuka di aplikasi email Anda, siap dikirim ke {PROFILE.email}.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nama Lengkap
                      </label>
                      <Input
                        id="name"
                        autoComplete="name"
                        placeholder="Nama Anda"
                        required
                        className={fieldClass}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Alamat Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@email.com"
                        required
                        className={fieldClass}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Pesan
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tuliskan pesan atau tawaran proyek Anda di sini..."
                      rows={5}
                      required
                      className="rounded-xl bg-background/60 px-3.5 py-3 dark:bg-white/[0.04]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button type="submit" size="lg" className="h-11 gap-2 rounded-full px-6 text-[15px]">
                      <Send className="h-4 w-4" />
                      Kirim Pesan
                    </Button>
                    <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                      {mailOpened && (
                        <span className="inline-flex items-center gap-1.5">
                          <MailCheck className="h-4 w-4 text-emerald-500" />
                          Aplikasi email dibuka — tekan kirim di sana.
                        </span>
                      )}
                    </p>
                  </div>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] py-10 dark:border-white/10">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
          <p>
            © {CURRENT_YEAR} {PROFILE.name}. Dibangun dengan React, TypeScript, Tailwind CSS &amp;
            shadcn/ui.
          </p>
          <nav aria-label="Tautan footer" className="flex items-center gap-5">
            <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href={PROFILE.instagramUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              Instagram
            </a>
            <a href={`mailto:${PROFILE.email}`} className="transition-colors hover:text-foreground">
              Email
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
};
