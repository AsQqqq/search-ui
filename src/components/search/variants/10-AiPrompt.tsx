"use client";

import { useState } from "react";
import { ArrowUpIcon, SparkleIcon } from "../icons";

const PROMPTS = ["Подбери шрифтовую пару", "Объясни принципы сетки", "Найди референсы лендингов"];

export default function AiPromptSearch() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full justify-center rounded-3xl bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-xl space-y-4">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="ai-glow relative rounded-2xl p-px"
        >
          <div className="relative flex flex-col gap-3 rounded-2xl bg-zinc-900 p-4">
            <div className="flex items-start gap-3">
              <SparkleIcon className="mt-0.5 size-5 shrink-0 text-violet-400" />
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={2}
                placeholder="Спросите что угодно…"
                className="w-full resize-none bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">{value.length} / 500</span>
              <button
                type="submit"
                disabled={!value.trim()}
                aria-label="Отправить"
                className="grid size-9 place-items-center rounded-full bg-white text-zinc-900 transition hover:bg-violet-200 disabled:bg-zinc-700 disabled:text-zinc-500"
              >
                <ArrowUpIcon />
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-2">
          {PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setValue(p)}
              className="rounded-full border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-violet-500/50 hover:text-zinc-200"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
