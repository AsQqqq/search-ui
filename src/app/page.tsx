import MinimalSearch from "@/components/search/variants/01-Minimal";
import PillSearch from "@/components/search/variants/02-Pill";
import GlassSearch from "@/components/search/variants/03-Glass";
import NeumorphicSearch from "@/components/search/variants/04-Neumorphic";
import CommandPaletteSearch from "@/components/search/variants/05-CommandPalette";
import BrutalistSearch from "@/components/search/variants/06-Brutalist";
import ExpandingSearch from "@/components/search/variants/07-Expanding";
import TerminalSearch from "@/components/search/variants/08-Terminal";
import ScopedSearch from "@/components/search/variants/09-Scoped";
import AiPromptSearch from "@/components/search/variants/10-AiPrompt";

const VARIANTS = [
  { title: "Минимализм", note: "Крупный шрифт и линия, которая прорисовывается при фокусе", Component: MinimalSearch },
  { title: "Пилюля с подсказками", note: "Классика поисковиков: автодополнение, навигация стрелками, голосовой ввод", Component: PillSearch },
  { title: "Стекло", note: "Glassmorphism: полупрозрачная панель с размытием на градиенте", Component: GlassSearch },
  { title: "Неоморфизм", note: "Мягкие вдавленные и выпуклые тени на одном цвете фона", Component: NeumorphicSearch },
  { title: "Командная палитра", note: "Открывается по ⌘K / Ctrl+K, недавние запросы и группы результатов", Component: CommandPaletteSearch },
  { title: "Брутализм", note: "Толстая рамка, жёсткая тень со смещением, моноширинный шрифт", Component: BrutalistSearch },
  { title: "Раскрывающаяся иконка", note: "Иконка в шапке разворачивается в поле, Esc сворачивает", Component: ExpandingSearch },
  { title: "Терминал", note: "Поиск как CLI: история команд и автодополнение по Tab", Component: TerminalSearch },
  { title: "С областью и тегами", note: "Выбор раздела, фильтры-чипсы, Backspace удаляет последний тег", Component: ScopedSearch },
  { title: "AI-промпт", note: "Анимированная градиентная обводка, многострочный ввод, быстрые подсказки", Component: AiPromptSearch },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">Search UI · 10 вариантов</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Поисковые строки</h1>
        <p className="mt-3 max-w-xl text-zinc-600">
          Каждый вариант интерактивен: кликайте, печатайте, пробуйте клавиатуру.
        </p>
      </header>

      <div className="space-y-6">
        {VARIANTS.map(({ title, note, Component }, i) => (
          <section key={title} id={`v${i + 1}`} className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-sm text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                <p className="text-sm text-zinc-500">{note}</p>
              </div>
            </div>
            <div className="flex min-h-40 items-center justify-center">
              <Component />
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-zinc-400">Next.js · Tailwind CSS · GitHub Pages</footer>
    </main>
  );
}
