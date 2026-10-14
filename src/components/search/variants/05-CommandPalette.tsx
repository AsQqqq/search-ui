"use client";

import { useEffect, useRef, useState } from "react";
import { RECENT, filterSuggestions } from "../data";
import { ClockIcon, SearchIcon } from "../icons";

export default function CommandPaletteSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = filterSuggestions(value, 6);
  const recent = value ? [] : RECENT;
  const all = [...recent, ...results];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    setValue("");
    setActive(0);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") close();
    if (!all.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % all.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + all.length) % all.length);
    } else if (e.key === "Enter") {
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 transition hover:border-zinc-300 hover:bg-white"
      >
        <SearchIcon className="size-4" />
        <span className="flex-1 text-left">Быстрый поиск…</span>
        <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[11px] text-zinc-500">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/40 p-4 pt-[15vh] backdrop-blur-sm" onMouseDown={close}>
          <div
            role="dialog"
            aria-modal
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4">
              <SearchIcon className="size-5 text-zinc-400" />
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Введите команду или запрос…"
                className="h-14 w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
              <kbd className="rounded border border-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {recent.length > 0 && <p className="px-3 pb-1 pt-2 text-xs font-medium text-zinc-400">Недавние</p>}
              {recent.map((item, i) => (
                <Row key={item} label={item} active={active === i} onHover={() => setActive(i)} onClick={close} icon={<ClockIcon />} />
              ))}
              {results.length > 0 && <p className="px-3 pb-1 pt-2 text-xs font-medium text-zinc-400">Результаты</p>}
              {results.map((item, i) => (
                <Row
                  key={item}
                  label={item}
                  active={active === i + recent.length}
                  onHover={() => setActive(i + recent.length)}
                  onClick={close}
                  icon={<SearchIcon className="size-4" />}
                />
              ))}
              {all.length === 0 && <p className="px-3 py-8 text-center text-sm text-zinc-400">Ничего не найдено</p>}
            </div>
            <div className="flex gap-4 border-t border-zinc-100 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-400">
              <span>↑↓ навигация</span>
              <span>↵ выбрать</span>
              <span>esc закрыть</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, active, onHover, onClick, icon }: { label: string; active: boolean; onHover: () => void; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${active ? "bg-indigo-50 text-indigo-700" : "text-zinc-700"}`}
    >
      <span className={active ? "text-indigo-500" : "text-zinc-400"}>{icon}</span>
      <span className="flex-1">{label}</span>
      {active && <span className="text-xs text-indigo-400">↵</span>}
    </button>
  );
}
