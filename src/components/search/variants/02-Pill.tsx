"use client";

import { useState } from "react";
import { filterSuggestions } from "../data";
import { CloseIcon, MicIcon, SearchIcon } from "../icons";

export default function PillSearch() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const items = filterSuggestions(value);
  const showList = open && items.length > 0;

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? items.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      setValue(items[active]);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-xl">
      <div
        className={`flex items-center gap-3 border border-zinc-200 bg-white px-5 py-3 transition-shadow hover:shadow-md ${
          showList ? "rounded-t-3xl border-b-transparent shadow-md" : "rounded-full"
        }`}
      >
        <SearchIcon className="size-5 text-zinc-400" />
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder="Поиск"
          className="w-full bg-transparent text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
        {value && (
          <>
            <button type="button" onClick={() => setValue("")} aria-label="Очистить" className="text-zinc-500 hover:text-zinc-900">
              <CloseIcon className="size-5" />
            </button>
            <span className="h-6 w-px bg-zinc-200" />
          </>
        )}
        <button type="button" aria-label="Голосовой поиск" className="text-blue-500 hover:text-blue-600">
          <MicIcon />
        </button>
      </div>
      {showList && (
        <ul className="absolute inset-x-0 top-full z-10 overflow-hidden rounded-b-3xl border border-t-0 border-zinc-200 bg-white pb-3 shadow-md">
          <li className="mx-5 mb-2 h-px bg-zinc-100" />
          {items.map((item, i) => (
            <li key={item}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-3 px-5 py-2 text-left text-sm text-zinc-800 ${active === i ? "bg-zinc-100" : ""}`}
              >
                <SearchIcon className="size-4 text-zinc-400" />
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
