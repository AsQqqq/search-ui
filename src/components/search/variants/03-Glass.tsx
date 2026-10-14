"use client";

import { useState } from "react";
import { ArrowRightIcon, SearchIcon } from "../icons";

export default function GlassSearch() {
  const [value, setValue] = useState("");

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-sky-500 px-6 py-14">
      <div className="absolute -left-10 -top-10 size-40 rounded-full bg-pink-300/60 blur-2xl" />
      <div className="absolute -bottom-12 right-6 size-48 rounded-full bg-cyan-300/50 blur-2xl" />
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="relative flex w-full max-w-lg items-center gap-3 rounded-2xl border border-white/30 bg-white/15 p-2 pl-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl transition focus-within:border-white/60 focus-within:bg-white/25"
      >
        <SearchIcon className="size-5 text-white/80" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Искать вдохновение…"
          className="w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Найти"
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-violet-600 transition hover:scale-105 active:scale-95"
        >
          <ArrowRightIcon />
        </button>
      </form>
    </div>
  );
}
