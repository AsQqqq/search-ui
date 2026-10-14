"use client";

import { useState } from "react";
import { ChevronDownIcon, CloseIcon, SearchIcon } from "../icons";

const SCOPES = ["Везде", "Проекты", "Люди", "Файлы"];
const TAGS = ["UI", "Мобайл", "Веб", "Брендинг", "3D", "Иллюстрация"];

export default function ScopedSearch() {
  const [value, setValue] = useState("");
  const [scope, setScope] = useState(SCOPES[0]);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(["UI"]);

  const toggleTag = (t: string) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl space-y-3">
      <div className="flex items-stretch rounded-xl border border-zinc-300 bg-white shadow-sm transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15">
        <div className="relative">
          <button
            type="button"
            onClick={() => setScopeOpen((o) => !o)}
            onBlur={() => setScopeOpen(false)}
            className="flex h-full items-center gap-1.5 rounded-l-xl border-r border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            {scope}
            <ChevronDownIcon className={`size-4 transition-transform ${scopeOpen ? "rotate-180" : ""}`} />
          </button>
          {scopeOpen && (
            <ul className="absolute left-0 top-full z-10 mt-2 w-40 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
              {SCOPES.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setScope(s);
                      setScopeOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${s === scope ? "font-medium text-emerald-600" : "text-zinc-700"}`}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-1.5 px-3 py-2">
          {tags.map((t) => (
            <span key={t} className="flex items-center gap-1 rounded-md bg-emerald-50 py-1 pl-2 pr-1 text-xs font-medium text-emerald-700">
              {t}
              <button type="button" onClick={() => toggleTag(t)} aria-label={`Убрать ${t}`} className="rounded hover:bg-emerald-100">
                <CloseIcon className="size-3" />
              </button>
            </span>
          ))}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value && tags.length) setTags((cur) => cur.slice(0, -1));
            }}
            placeholder={tags.length ? "Добавить запрос…" : `Искать: ${scope.toLowerCase()}`}
            className="min-w-32 flex-1 bg-transparent py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
        </div>
        <button type="submit" className="m-1.5 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700">
          <SearchIcon className="size-4" />
          <span className="hidden sm:inline">Найти</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {TAGS.filter((t) => !tags.includes(t)).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggleTag(t)}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:border-emerald-500 hover:text-emerald-600"
          >
            + {t}
          </button>
        ))}
      </div>
    </form>
  );
}
