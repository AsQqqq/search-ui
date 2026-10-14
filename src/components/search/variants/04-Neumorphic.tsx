"use client";

import { useState } from "react";
import { SearchIcon } from "../icons";

export default function NeumorphicSearch() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full justify-center rounded-3xl bg-[#e4e9f0] px-6 py-14">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-lg items-center gap-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск…"
          className="h-14 w-full rounded-2xl bg-[#e4e9f0] px-6 text-slate-700 shadow-[inset_6px_6px_12px_#c2c6cc,inset_-6px_-6px_12px_#ffffff] placeholder:text-slate-400 focus:outline-none focus:shadow-[inset_8px_8px_16px_#bcc0c6,inset_-8px_-8px_16px_#ffffff]"
        />
        <button
          type="submit"
          aria-label="Найти"
          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e4e9f0] text-slate-500 shadow-[6px_6px_12px_#c2c6cc,-6px_-6px_12px_#ffffff] transition hover:text-indigo-500 active:shadow-[inset_4px_4px_8px_#c2c6cc,inset_-4px_-4px_8px_#ffffff]"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
