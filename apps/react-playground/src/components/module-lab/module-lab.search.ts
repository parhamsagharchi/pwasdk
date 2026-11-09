import {
  MODULE_LAB_CATEGORIES,
  MODULE_LAB_CATEGORY_LABEL,
  MODULE_LAB_ITEMS,
} from "./module-lab.constants";
import type { IModuleLabItem, TModuleLabCategory } from "./module-lab.types";

export interface IModuleLabSuggestion {
  id: string;
  kind: "module" | "category";
  label: string;
  meta: string;
  moduleId?: IModuleLabItem["id"];
  category?: TModuleLabCategory;
}

const TRENDING_MODULE_IDS = [
  "torch",
  "doubletap",
  "haptic",
  "shake",
  "tilt",
  "speak",
  "qr",
  "nfc",
] as const;

function scoreMatch(text: string, needle: string): number {
  const lower = text.toLowerCase();
  if (lower === needle) return 100;
  if (lower.startsWith(needle)) return 80;
  const index = lower.indexOf(needle);
  if (index >= 0) return 60 - Math.min(index, 40);
  return 0;
}

export function buildModuleLabSuggestions(
  query: string,
  categoryFilter: "all" | TModuleLabCategory,
  limit = 8,
): IModuleLabSuggestion[] {
  const needle = query.trim().toLowerCase();

  if (!needle) {
    const trending = TRENDING_MODULE_IDS.map((id) =>
      MODULE_LAB_ITEMS.find((item) => item.id === id),
    ).filter((item): item is IModuleLabItem => Boolean(item));

    return trending
      .filter(
        (item) =>
          categoryFilter === "all" || item.category === categoryFilter,
      )
      .slice(0, limit)
      .map((item) => ({
        id: `trend-${item.id}`,
        kind: "module" as const,
        label: item.title,
        meta: MODULE_LAB_CATEGORY_LABEL[item.category],
        moduleId: item.id,
        category: item.category,
      }));
  }

  const categoryHits: IModuleLabSuggestion[] = MODULE_LAB_CATEGORIES.filter(
    (category) => {
      if (categoryFilter !== "all" && category.id !== categoryFilter) {
        return false;
      }
      return (
        scoreMatch(category.label, needle) > 0 ||
        scoreMatch(category.id, needle) > 0
      );
    },
  ).map((category) => ({
    id: `cat-${category.id}`,
    kind: "category" as const,
    label: category.label,
    meta: "Category",
    category: category.id,
  }));

  const moduleHits = MODULE_LAB_ITEMS.map((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      return null;
    }
    const categoryLabel = MODULE_LAB_CATEGORY_LABEL[item.category];
    const score = Math.max(
      scoreMatch(item.title, needle),
      scoreMatch(item.id, needle),
      scoreMatch(item.hint, needle) * 0.7,
      scoreMatch(categoryLabel, needle) * 0.6,
      scoreMatch(item.signature, needle) * 0.5,
    );
    if (score <= 0) return null;
    return { item, score };
  })
    .filter((entry): entry is { item: IModuleLabItem; score: number } =>
      Boolean(entry),
    )
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => ({
      id: `mod-${item.id}`,
      kind: "module" as const,
      label: item.title,
      meta: MODULE_LAB_CATEGORY_LABEL[item.category],
      moduleId: item.id,
      category: item.category,
    }));

  return [...categoryHits, ...moduleHits].slice(0, limit);
}

/** Split text so matching query spans can be colored. */
export function splitHighlightParts(
  text: string,
  query: string,
): Array<{ text: string; match: boolean }> {
  const needle = query.trim();
  if (!needle) return [{ text, match: false }];

  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(regex);
  if (parts.length === 1) return [{ text, match: false }];

  return parts.filter(Boolean).map((part) => ({
    text: part,
    match: part.toLowerCase() === needle.toLowerCase(),
  }));
}
