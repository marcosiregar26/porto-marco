import { useCallback, useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "error";

function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

/** Salin teks ke clipboard dengan fallback untuk konteks non-HTTPS. */
export function useCopyToClipboard(resetMs = 2400) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      let ok = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          ok = true;
        } else {
          ok = legacyCopy(text);
        }
      } catch {
        ok = false;
      }
      setStatus(ok ? "copied" : "error");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus("idle"), resetMs);
      return ok;
    },
    [resetMs]
  );

  return { status, copy };
}

