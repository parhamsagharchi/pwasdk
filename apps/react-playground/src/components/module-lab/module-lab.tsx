import { useEffect, useRef, useState } from "react";
import CodeSnippet from "../code-snippet";
import { useUiContext } from "../ui/ui.hooks";
import { ModuleLabHighlight } from "./module-lab-highlight";
import {
  MODULE_LAB_CATEGORIES,
  MODULE_LAB_CATEGORY_LABEL,
  MODULE_LAB_ITEMS,
} from "./module-lab.constants";
import { ModuleLabDemo } from "./module-lab.demos";
import { useModuleLab } from "./module-lab.hooks";
import type { TModuleLabId } from "./module-lab.types";
import { buildModuleSharePath } from "./module-lab.url";

function ModuleLab() {
  const { protocol, debugInfo } = useUiContext();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const activeChipRef = useRef<HTMLButtonElement | null>(null);
  const didScrollFromUrl = useRef(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const {
    activeId,
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
  } = useModuleLab();

  const showHttpsHint = protocol === "http:" && Boolean(debugInfo);
  const activeCategoryLabel = MODULE_LAB_CATEGORY_LABEL[activeItem.category];
  const showSuggestions = searchOpen && suggestions.length > 0;
  const suggestionLabel = query.trim() ? "Suggestions" : "Trending";

  useEffect(() => {
    activeChipRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  useEffect(() => {
    if (!openedFromUrl || didScrollFromUrl.current) return;
    didScrollFromUrl.current = true;
    window.requestAnimationFrame(() => {
      stageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [openedFromUrl, activeId]);

  const handleModuleClick = (id: TModuleLabId) => {
    handleSelect(id);
    window.requestAnimationFrame(() => {
      const isPhone = window.matchMedia("(max-width: 899px)").matches;
      if (!isPhone) return;
      stageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleCopyLinkClick = () => {
    void (async () => {
      const path = buildModuleSharePath(activeItem.id);
      const absolute = new URL(path, window.location.origin).toString();
      try {
        await navigator.clipboard.writeText(absolute);
        setLinkCopied(true);
        window.setTimeout(() => setLinkCopied(false), 1500);
      } catch {
        setLinkCopied(false);
      }
    })();
  };

  return (
    <section className="module-lab" id="lab">
      <div className="wrap">
        <div className="module-lab-head">
          <div className="module-lab-head-copy">
            <p className="module-lab-kicker mono">Module lab</p>
            <p className="module-lab-guide">
              Tap a module · try it · show code
            </p>
          </div>
          <span className="module-lab-count mono">
            {filteredItems.length === MODULE_LAB_ITEMS.length
              ? `${MODULE_LAB_ITEMS.length} total modules`
              : `${filteredItems.length}/${MODULE_LAB_ITEMS.length} total modules`}
          </span>
        </div>
        {showHttpsHint ? (
          <p className="module-lab-https mono">
            Open this page with HTTPS (or localhost) — camera, mic, and push
            need a secure connection.
          </p>
        ) : null}

        <section
          className="module-lab-filter-card"
          aria-label="Advanced filter"
        >
          <div className="module-lab-filter-block">
            <p className="module-lab-block-label mono">Search</p>
            <div className="module-lab-search-wrap">
              <div
                className={
                  showSuggestions
                    ? "module-lab-search-shell open"
                    : "module-lab-search-shell"
                }
              >
                <label
                  className="module-lab-search-field"
                  htmlFor="module-lab-search"
                >
                  <span className="module-lab-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                      <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M16.2 16.2L20 20"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    id="module-lab-search"
                    type="search"
                    className="module-lab-search"
                    placeholder="Search modules, sensors, torch…"
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    autoComplete="off"
                    spellCheck={false}
                    enterKeyHint="search"
                    role="combobox"
                    aria-expanded={showSuggestions}
                    aria-controls="module-lab-suggestions"
                    aria-autocomplete="list"
                  />
                  <button
                    type="button"
                    className={
                      query
                        ? "module-lab-search-clear"
                        : "module-lab-search-clear is-hidden"
                    }
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    tabIndex={query ? 0 : -1}
                    aria-hidden={!query}
                  >
                    ×
                  </button>
                </label>

                {showSuggestions ? (
                  <ul
                    id="module-lab-suggestions"
                    className="module-lab-suggestions"
                    role="listbox"
                    aria-label={suggestionLabel}
                  >
                    <li
                      className="module-lab-suggestions-label mono"
                      role="presentation"
                    >
                      {suggestionLabel}
                    </li>
                    {suggestions.map((suggestion) => (
                      <li key={suggestion.id} role="none">
                        <button
                          type="button"
                          role="option"
                          className="module-lab-suggestion"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => handlePickSuggestion(suggestion)}
                        >
                          <span
                            className="module-lab-suggestion-icon"
                            aria-hidden="true"
                          >
                            {suggestion.kind === "category" ? "#" : "↗"}
                          </span>
                          <span className="module-lab-suggestion-text">
                            <span className="module-lab-suggestion-title">
                              <ModuleLabHighlight
                                text={suggestion.label}
                                query={query}
                              />
                            </span>
                            <span className="module-lab-suggestion-meta mono">
                              {suggestion.meta}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className="module-lab-filter-divider" aria-hidden="true" />

          <div className="module-lab-filter-block">
            <p className="module-lab-block-label mono">Categories</p>
            <div
              className="module-lab-filters"
              role="toolbar"
              aria-label="Filter by category"
            >
              <button
                type="button"
                className={
                  categoryFilter === "all"
                    ? "module-lab-filter active"
                    : "module-lab-filter"
                }
                aria-pressed={categoryFilter === "all"}
                onClick={() => handleCategoryFilterChange("all")}
              >
                All
              </button>
              {MODULE_LAB_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={
                    categoryFilter === category.id
                      ? `module-lab-filter active cat-${category.id}`
                      : `module-lab-filter cat-${category.id}`
                  }
                  aria-pressed={categoryFilter === category.id}
                  onClick={() => handleCategoryFilterChange(category.id)}
                >
                  <span className="module-lab-filter-dot" aria-hidden="true" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="module-lab-layout">
          <aside className="module-lab-nav" aria-label="Modules">
            <p className="module-lab-nav-label mono">Modules</p>
            <ul
              className="module-lab-list"
              role="listbox"
              aria-label="Module list"
            >
              {filteredItems.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id} role="none">
                    <button
                      type="button"
                      role="option"
                      ref={isActive ? activeChipRef : undefined}
                      className={
                        isActive
                          ? `module-lab-item active cat-${item.category}`
                          : `module-lab-item cat-${item.category}`
                      }
                      onClick={() => handleModuleClick(item.id)}
                      aria-selected={isActive}
                    >
                      <span className="module-lab-item-top">
                        <span className="module-lab-item-title">
                          <ModuleLabHighlight text={item.title} query={query} />
                        </span>
                        <span
                          className={`module-lab-badge cat-${item.category}`}
                        >
                          {MODULE_LAB_CATEGORY_LABEL[item.category]}
                        </span>
                      </span>
                      <span className="module-lab-item-hint">
                        <ModuleLabHighlight text={item.hint} query={query} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {filteredItems.length === 0 ? (
              <p className="module-lab-empty">
                No modules match that filter or search.
              </p>
            ) : null}
          </aside>

          <div
            className="module-lab-stage"
            key={activeItem.id}
            ref={stageRef}
            id="module-lab-stage"
          >
            <div className="module-lab-stage-head">
              <div className="module-lab-stage-copy">
                <div className="module-lab-title-row">
                  <h2 className="module-lab-title">{activeItem.title}</h2>
                  <span
                    className={`module-lab-badge cat-${activeItem.category}`}
                  >
                    {activeCategoryLabel}
                  </span>
                </div>
                <p className="module-lab-hint">{activeItem.blurb}</p>
              </div>
              <div className="module-lab-stage-actions">
                <code className="module-lab-sig mono">{activeItem.signature}</code>
                <button
                  type="button"
                  className="module-lab-link-btn mono"
                  onClick={handleCopyLinkClick}
                >
                  {linkCopied ? "Link copied" : "Copy link"}
                </button>
              </div>
            </div>

            <div className="module-lab-demo">
              <ModuleLabDemo id={activeItem.id} />
            </div>

            <div className="module-lab-code-bar">
              <button
                type="button"
                className="btn-code-trigger mono"
                aria-expanded={codeOpen}
                onClick={handleCodeToggleClick}
              >
                {codeOpen ? "Hide example code" : "Show example code"}
              </button>
            </div>
            {codeOpen ? <CodeSnippet code={activeItem.code} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModuleLab;
