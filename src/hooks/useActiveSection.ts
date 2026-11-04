import { useEffect, useState } from "react";

/**
 * Scroll-spy: mengembalikan id section yang sedang berada di tengah viewport.
 * `ids` harus referensi stabil (konstanta modul) agar observer tidak dibuat ulang.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));

    // Section terakhir sering tidak mencapai tengah layar — tandai aktif saat mentok bawah.
    const lastId = ids[ids.length - 1];
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && lastId) setActive(lastId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}

