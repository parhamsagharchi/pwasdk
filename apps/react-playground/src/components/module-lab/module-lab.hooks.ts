import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  DEFAULT_MODULE_LAB_ID,
  MODULE_LAB_CATEGORY_LABEL,
  MODULE_LAB_ITEMS,
} from "./module-lab.constants";
import { buildModuleLabSuggestions } from "./module-lab.search";
import type { TModuleLabCategory, TModuleLabId } from "./module-lab.types";
import { readModuleFromLocation, writeModuleToUrl } from "./module-lab.url";

export type TModuleLabCategoryFilter = "all" | TModuleLabCategory;

function resolveInitialModuleId(): TModuleLabId {
  return readModuleFromLocation() ?? DEFAULT_MODULE_LAB_ID;
}

export function useModuleLab() {
  const [activeId, setActiveId] = useState<TModuleLabId>(resolveInitialModuleId);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<TModuleLabCategoryFilter>("all");
  const [codeOpen, setCodeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openedFromUrl] = useState(() => Boolean(readModuleFromLocation()));

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return MODULE_LAB_ITEMS.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }
      if (!needle) return true;
      const categoryLabel = MODULE_LAB_CATEGORY_LABEL[item.category];
      const haystack =
        `${item.id} ${item.title} ${item.hint} ${item.blurb} ${item.signature} ${item.category} ${categoryLabel}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, categoryFilter]);

  const suggestions = useMemo(
    () => buildModuleLabSuggestions(query, categoryFilter),
    [query, categoryFilter],
  );

  const activeItem =
    MODULE_LAB_ITEMS.find((item) => item.id === activeId) ??
    filteredItems[0] ??
    MODULE_LAB_ITEMS[0];

  useEffect(() => {
    writeModuleToUrl(activeItem.id, "replace");
  }, [activeItem.id]);

  useEffect(() => {
    const handlePopState = () => {
      const fromUrl = readModuleFromLocation();
      if (fromUrl) {
        setActiveId(fromUrl);
        setCodeOpen(false);
        return;
      }
      setActiveId(DEFAULT_MODULE_LAB_ID);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelect = (id: TModuleLabId) => {
    setActiveId(id);
    setCodeOpen(false);
    writeModuleToUrl(id, "replace");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchOpen(true);
  };

  const handleSearchFocus = () => {
    setSearchOpen(true);
  };

  const handleSearchBlur = () => {
    window.setTimeout(() => setSearchOpen(false), 120);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchOpen(true);
  };

  const handlePickSuggestion = (suggestion: {
    kind: "module" | "category";
    label: string;
    moduleId?: TModuleLabId;
    category?: TModuleLabCategory;
  }) => {
    if (suggestion.kind === "category" && suggestion.category) {
      setCategoryFilter(suggestion.category);
      setQuery("");
      setSearchOpen(false);
      return;
    }
    if (suggestion.moduleId) {
      setQuery(suggestion.label);
      handleSelect(suggestion.moduleId);
      setSearchOpen(false);
    }
  };

  const handleCategoryFilterChange = (next: TModuleLabCategoryFilter) => {
    setCategoryFilter(next);
  };

  const handleCodeToggleClick = () => {
    setCodeOpen((current) => !current);
  };

  return {
    activeId: activeItem.id,
    activeItem,
    filteredItems,
    suggestions,
    query,
    categoryFilter,
    codeOpen,
    searchOpen,
    openedFromUrl,
    handleSelect,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    handleClearSearch,
    handlePickSuggestion,
    handleCategoryFilterChange,
    handleCodeToggleClick,
  };
}
