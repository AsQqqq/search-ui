"use client";

import { useState } from "react";

export default function BrutalistSearch() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full justify-center rounded-3xl bg-[#fff6d6] px-6 py-14">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-lg border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] transition focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:shadow-[9px_9px_0_0_#000]"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ПОИСК_"
          className="w-full bg-transparent px-5 py-4 font-mono text-lg font-bold uppercase text-black placeholder:text-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          className="border-l-[3px] border-black bg-[#ff5c39] px-6 font-mono text-lg font-black uppercase text-black transition hover:bg-[#ffd23f] active:bg-black active:text-white"
        >
          Go
        </button>
      </form>
    </div>
  );
}
