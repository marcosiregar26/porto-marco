import type { ReactNode } from "react";

const TOKEN_RE =
  /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

/** Syntax highlighter JSON ringan tanpa dependensi (aman: tidak memakai innerHTML). */
export function highlightJson(value: unknown): ReactNode[] {
  const json = JSON.stringify(value, null, 2) ?? "undefined";
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of json.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0;
    const [full, str, colon, literal, num] = match;
    if (index > last) nodes.push(json.slice(last, index));

    if (str !== undefined && colon !== undefined) {
      nodes.push(
        <span key={key++} className="text-sky-300">
          {str}
        </span>,
        colon
      );
    } else if (str !== undefined) {
      nodes.push(
        <span key={key++} className="text-emerald-300">
          {str}
        </span>
      );
    } else if (literal !== undefined) {
      nodes.push(
        <span key={key++} className="text-violet-300">
          {literal}
        </span>
      );
    } else if (num !== undefined) {
      nodes.push(
        <span key={key++} className="text-amber-300">
          {num}
        </span>
      );
    } else {
      nodes.push(full);
    }
    last = index + full.length;
  }

  if (last < json.length) nodes.push(json.slice(last));
  return nodes;
}

