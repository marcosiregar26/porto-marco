import { Check, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

/** Tombol 1-klik salin email dengan toast tooltip yang diumumkan ke screen reader. */
export function CopyEmailButton({
  email,
  className,
  variant = "outline",
  size = "lg",
}: CopyEmailButtonProps) {
  const { status, copy } = useCopyToClipboard();

  const toastText =
    status === "copied"
      ? `${email} disalin ✓`
      : status === "error"
        ? `Gagal menyalin — ${email}`
        : "";

  return (
    <div className="relative inline-flex">
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => void copy(email)}
        aria-label={`Salin alamat email ${email}`}
        className={cn("gap-2 rounded-full", className)}
      >
        {status === "copied" ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : status === "error" ? (
          <X className="h-4 w-4 text-rose-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {status === "copied" ? "Tersalin" : "Salin Email"}
      </Button>

      <span
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute -top-11 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background shadow-lg transition-all duration-500 ease-apple",
          status === "idle" ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        {toastText}
      </span>
    </div>
  );
}

