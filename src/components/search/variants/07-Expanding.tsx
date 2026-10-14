"use client";

import { useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "../icons";

export default function ExpandingSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function toggle() {
    if (open) {
      setOpen(false);
      setValue("");
    } else {
      setOpen(true);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-zinc-900 px-5 py-3 text-white">
      <span className={`font-semibold tracking-tight transition-opacity duration-300 ${open ? "opacity-0 sm:opacity-100" : "opacity-100"}`}>
        Logo
      </span>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className={`flex h-11 items-center overflow-hidden rounded-full bg-zinc-800 transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? "w-64 sm:w-80" : "w-11"
        }`}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && toggle()}
          tabIndex={open ? 0 : -1}
          placeholder="Поиск по сайту"
          className={`h-full w-0 min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none ${open ? "pl-5" : "pointer-events-none"}`}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Закрыть поиск" : "Открыть поиск"}
          className="grid size-11 shrink-0 place-items-center rounded-full text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
        >
          {open ? <CloseIcon className="size-5" /> : <SearchIcon />}
        </button>
      </form>
    </div>
  );
}
