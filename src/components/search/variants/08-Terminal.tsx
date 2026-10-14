"use client";

import { useRef, useState } from "react";
import { filterSuggestions } from "../data";

type Line = { cmd: string; out: string[] };

export default function TerminalSearch() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Line[]>([
    { cmd: "search --help", out: ["Использование: search <запрос>", "Нажмите Tab для автодополнения"] },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const hint = value ? filterSuggestions(value, 1)[0] : undefined;
  const ghost = hint && hint.toLowerCase().startsWith(value.toLowerCase()) ? hint.slice(value.length) : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const found = filterSuggestions(value, 3);
    setHistory((h) => [
      ...h.slice(-2),
      { cmd: `search "${value}"`, out: found.length ? found.map((f, i) => `[${i + 1}] ${f}`) : ["0 результатов"] },
    ]);
    setValue("");
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full cursor-text overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117] font-mono text-sm shadow-xl"
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-[#161b22] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-zinc-500">~/search — zsh</span>
      </div>
      <div className="space-y-2 p-4 text-zinc-300">
        {history.map((line, i) => (
          <div key={i}>
            <p>
              <span className="text-emerald-400">❯</span> {line.cmd}
            </p>
            {line.out.map((o) => (
              <p key={o} className="text-zinc-500">
                {o}
              </p>
            ))}
          </div>
        ))}
        <form onSubmit={submit} className="flex items-center gap-2">
          <span className="text-emerald-400">❯</span>
          <span className="text-sky-400">search</span>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-0 whitespace-pre text-zinc-600">
              <span className="invisible">{value}</span>
              {ghost}
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab" && ghost) {
                  e.preventDefault();
                  setValue(value + ghost);
                }
              }}
              spellCheck={false}
              aria-label="Поисковый запрос"
              className="relative w-full bg-transparent text-zinc-100 caret-emerald-400 focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
