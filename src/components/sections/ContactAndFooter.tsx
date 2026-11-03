import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Komponen SVG manual untuk ikon GitHub
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

// Komponen SVG manual untuk ikon LinkedIn
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

const CURRENT_YEAR = new Date().getFullYear();

export const ContactAndFooter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <section id="contact" className="border-t py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Informasi Kontak */}
            <div className="space-y-6 lg:col-span-5">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                  Kontak
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Mari Berdiskusi!
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tertarik untuk berkolaborasi dalam proyek pengembangan web,
                  membahas arsitektur API, atau menawarkan peluang magang/kerja?
                  Silakan kirim pesan.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="https://github.com/marcosiregar26"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border p-3.5 transition-colors hover:bg-accent"
                >
                  <GithubIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">GitHub</p>
                    <p className="text-sm font-medium">github.com/marcosiregar26</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/marcosiregar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border p-3.5 transition-colors hover:bg-accent"
                >
                  <LinkedinIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    <p className="text-sm font-medium">Marco Siregar</p>
                  </div>
                </a>

                <a
                  href="mailto:marco@example.com"
                  className="flex items-center gap-3 rounded-lg border p-3.5 transition-colors hover:bg-accent"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">marco@example.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form Kontak */}
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle>Kirim Pesan Langsung</CardTitle>
                  <CardDescription>
                    Isi formulir di bawah ini dan saya akan membalas pesan Anda
                    secepatnya.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nama Lengkap
                        </label>
                        <Input
                          id="name"
                          placeholder="Nama Anda"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Alamat Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="nama@email.com"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
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
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <Button type="submit" className="w-full sm:w-auto gap-2">
                      {submitted ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Pesan Terkirim!
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {CURRENT_YEAR} <strong>Marco</strong>. Dibangun dengan
            React, TypeScript, Tailwind CSS & shadcn/ui.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/marcosiregar26"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:marco@example.com"
              className="hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};