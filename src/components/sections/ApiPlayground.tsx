import React, { useEffect, useRef, useState } from "react";
import { Check, Copy, Info, Loader2, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { highlightJson } from "@/lib/highlight-json";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  type ApiEndpointDemo,
  type HttpMethod,
} from "@/data/apiPlaygroundData";

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  POST: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  PUT: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  DELETE: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

type RunState = { status: "idle" } | { status: "loading" } | { status: "done"; latency: number };

function buildCurl(endpoint: ApiEndpointDemo): string {
  const lines = [`curl -X ${endpoint.method} "${API_BASE_URL}${endpoint.path}"`];
  for (const [key, value] of Object.entries(endpoint.requestHeaders)) {
    lines.push(`  -H "${key}: ${value}"`);
  }
  if (endpoint.requestBody !== undefined) {
    lines.push(`  -d '${JSON.stringify(endpoint.requestBody)}'`);
  }
  return lines.join(" \\\n");
}

const statusColor = (status: number) =>
  status < 300 ? "text-emerald-400" : status < 500 ? "text-amber-400" : "text-rose-400";

export const ApiPlayground: React.FC = () => {
  const [selectedId, setSelectedId] = useState(API_ENDPOINTS[0].id);
  const [run, setRun] = useState<RunState>({ status: "idle" });
  const { status: copyStatus, copy: copyCurl } = useCopyToClipboard();
  const timer = useRef<number | undefined>(undefined);

  const endpoint = API_ENDPOINTS.find((e) => e.id === selectedId) ?? API_ENDPOINTS[0];

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const selectEndpoint = (id: string) => {
    window.clearTimeout(timer.current);
    setSelectedId(id);
    setRun({ status: "idle" });
  };

  const sendRequest = () => {
    window.clearTimeout(timer.current);
    setRun({ status: "loading" });
    const latency = Math.round(8 + Math.random() * 16);
    timer.current = window.setTimeout(() => setRun({ status: "done", latency }), 380 + latency * 12);
  };

  return (
    <section id="playground" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="API Lab"
          title="Coba arsitektur backend saya."
          description="Pilih endpoint, kirim request, dan lihat bagaimana API dari proyek saya merespons — lengkap dengan status code dan payload JSON."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Daftar endpoint */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <GlassCard className="p-2">
              <ul role="listbox" aria-label="Daftar endpoint" className="flex flex-col gap-1">
                {API_ENDPOINTS.map((ep) => {
                  const selected = ep.id === endpoint.id;
                  return (
                    <li key={ep.id} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onClick={() => selectEndpoint(ep.id)}
                        className={cn(
                          "w-full rounded-2xl px-4 py-3 text-left transition-colors duration-300 ease-apple",
                          selected
                            ? "bg-black/[0.05] dark:bg-white/10"
                            : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "w-14 shrink-0 rounded-md py-0.5 text-center font-mono text-[10px] font-bold",
                              METHOD_STYLES[ep.method]
                            )}
                          >
                            {ep.method}
                          </span>
                          <span className="truncate font-mono text-xs">{ep.path.split("?")[0]}</span>
                        </div>
                        <p className="mt-1.5 text-sm font-medium">{ep.title}</p>
                        <p className="text-xs text-muted-foreground">Proyek: {ep.project}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>

            <div className="flex gap-2">
              <Button
                size="lg"
                onClick={sendRequest}
                disabled={run.status === "loading"}
                className="h-11 flex-1 gap-2 rounded-full text-[15px]"
              >
                {run.status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {run.status === "loading" ? "Mengirim…" : "Kirim Request"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => selectEndpoint(endpoint.id)}
                disabled={run.status === "idle"}
                aria-label="Reset terminal"
                className="h-11 w-11 rounded-full px-0"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Simulasi sisi klien: kontrak request/response meniru API proyek saya, namun data dan
              latensi adalah contoh — tidak ada server produksi yang dipanggil.
            </p>
          </div>

          {/* Terminal macOS */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0f] font-mono text-[12.5px] text-neutral-300 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)] lg:col-span-7">
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex gap-2" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="mx-auto truncate text-[11px] text-neutral-500">
                marco@dev — zsh — api-lab
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void copyCurl(buildCurl(endpoint))}
                  className="flex items-center gap-1 rounded bg-white/[0.06] px-2 py-0.5 text-[11px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                  title="Salin perintah cURL"
                >
                  {copyStatus === "copied" ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Salin cURL</span>
                    </>
                  )}
                </button>
                <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                  SIMULASI
                </span>
              </div>
            </div>

            <div className="min-h-[440px] overflow-x-auto p-5" aria-live="polite">
              <pre className="whitespace-pre-wrap break-all text-neutral-200">
                <span className="select-none text-emerald-400">➜ </span>
                <span className="select-none text-sky-400">~/api </span>
                {buildCurl(endpoint)}
              </pre>

              {run.status === "idle" && (
                <p className="mt-5 text-neutral-500">
                  Tekan “Kirim Request” untuk menjalankan
                  <span className="ml-1 animate-caret text-neutral-300">▍</span>
                </p>
              )}

              {run.status === "loading" && (
                <p className="mt-5 flex items-center gap-2 text-neutral-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Menunggu respons dari {API_BASE_URL}…
                </p>
              )}

              {run.status === "done" && (
                <div className="mt-5 animate-fade-up space-y-3 [animation-duration:0.5s]">
                  <p>
                    <span className={cn("font-semibold", statusColor(endpoint.status))}>
                      HTTP/1.1 {endpoint.status} {endpoint.statusText}
                    </span>
                    <span className="text-neutral-500"> · {run.latency} ms</span>
                  </p>
                  <div className="text-neutral-500">
                    {Object.entries(endpoint.responseHeaders).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-neutral-400">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                  <pre className="overflow-x-auto rounded-xl bg-white/[0.03] p-4 leading-relaxed ring-1 ring-white/5">
                    {highlightJson(endpoint.response)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
