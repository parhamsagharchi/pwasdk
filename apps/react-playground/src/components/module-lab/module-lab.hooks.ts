import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  DEFAULT_MODULE_LAB_ID,
  MODULE_LAB_ITEMS,
} from "./module-lab.constants";
import type { TModuleLabId } from "./module-lab.types";
import { readModuleFromLocation, writeModuleToUrl } from "./module-lab.url";

function resolveInitialModuleId(): TModuleLabId {
  return readModuleFromLocation() ?? DEFAULT_MODULE_LAB_ID;
}

export function useModuleLab() {
  const [activeId, setActiveId] = useState<TModuleLabId>(resolveInitialModuleId);
  const [query, setQuery] = useState("");
  const [codeOpen, setCodeOpen] = useState(false);
  const [openedFromUrl] = useState(() => Boolean(readModuleFromLocation()));

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return MODULE_LAB_ITEMS;
    return MODULE_LAB_ITEMS.filter((item) => {
      const haystack =
        `${item.id} ${item.title} ${item.hint} ${item.blurb} ${item.signature}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

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
  };

  const handleCodeToggleClick = () => {
    setCodeOpen((current) => !current);
  };

  return {
    activeId: activeItem.id,
    activeItem,
    filteredItems,
    query,
    codeOpen,
    openedFromUrl,
    handleSelect,
    handleSearchChange,
    handleCodeToggleClick,
  };
}
