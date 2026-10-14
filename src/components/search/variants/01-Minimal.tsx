"use client";

import { useState } from "react";
import { CloseIcon, SearchIcon } from "../icons";

export default function MinimalSearch() {
  const [value, setValue] = useState("");

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="group relative w-full max-w-xl">
      <div className="flex items-center gap-3 pb-3">
        <SearchIcon className="size-6 text-zinc-400 transition-colors group-focus-within:text-zinc-900" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Что ищем?"
          className="w-full bg-transparent text-2xl font-light tracking-tight text-zinc-900 placeholder:text-zinc-300 focus:outline-none"
        />
        {value && (
          <button type="button" onClick={() => setValue("")} aria-label="Очистить" className="text-zinc-400 hover:text-zinc-900">
            <CloseIcon className="size-5" />
          </button>
        )}
      </div>
      <span className="absolute bottom-0 left-0 h-px w-full bg-zinc-200" />
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-zinc-900 transition-all duration-500 ease-out group-focus-within:w-full" />
    </form>
  );
}
