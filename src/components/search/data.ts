export const SUGGESTIONS = [
  "Дизайн-система для стартапа",
  "Типографика в интерфейсах",
  "Цветовые палитры 2026",
  "Анимации микровзаимодействий",
  "Адаптивная вёрстка сеток",
  "Иконки в стиле outline",
  "Тёмная тема: лучшие практики",
  "Доступность форм",
];

export const RECENT = ["Figma variables", "Glassmorphism", "Bento grid"];

export function filterSuggestions(query: string, limit = 5) {
  const q = query.trim().toLowerCase();
  if (!q) return SUGGESTIONS.slice(0, limit);
  return SUGGESTIONS.filter((s) => s.toLowerCase().includes(q)).slice(0, limit);
}
