import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = React.ComponentProps<"div"> & {
  /** Aktifkan hover physics (lift + glow) bergaya Apple. */
  interactive?: boolean;
  /** Aktifkan efek kilau cahaya radial yang mengikuti kursor kustom ala Apple hardware sheen. */
  spotlight?: boolean;
};

function GlassCard({
  className,
  interactive = false,
  spotlight = true,
  onMouseMove,
  ...props
}: GlassCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spotlight && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div
      ref={cardRef}
      data-slot="glass-card"
      onMouseMove={handleMouseMove}
      className={cn(
        "group/glass relative overflow-hidden rounded-3xl border border-black/[0.06] bg-card/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-500 ease-apple hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] dark:hover:border-white/20 dark:hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]",
        className
      )}
      {...props}
    >
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 ease-apple group-hover/glass:opacity-100"
          style={{
            background:
              "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99,102,241,0.08), transparent 75%)",
          }}
        />
      )}
      {props.children}
    </div>
  );
}

export { GlassCard };
