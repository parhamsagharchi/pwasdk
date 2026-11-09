import { useEffect, useRef, useState } from "react";
import CodeSnippet from "../code-snippet";
import { useUiContext } from "../ui/ui.hooks";
import { MODULE_LAB_ITEMS } from "./module-lab.constants";
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
    query,
    codeOpen,
    openedFromUrl,
    handleSelect,
    handleSearchChange,
    handleCodeToggleClick,
  } = useModuleLab();

  const showHttpsHint = protocol === "http:" && Boolean(debugInfo);

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
          <p className="module-lab-guide mono">
            Tap a module · try it · show code
          </p>
          <span className="module-lab-count mono">
            {MODULE_LAB_ITEMS.length}
          </span>
        </div>
        {showHttpsHint ? (
          <p className="module-lab-https mono">
            Open this page with HTTPS (or localhost) — camera, mic, and push
            need a secure connection.
          </p>
        ) : null}

        <div className="module-lab-layout">
          <aside className="module-lab-nav" aria-label="Modules">
            <input
              type="search"
              className="module-lab-search"
              placeholder="Search modules…"
              value={query}
              onChange={handleSearchChange}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
            />
            <ul className="module-lab-list" role="listbox" aria-label="Module list">
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
                          ? "module-lab-item active"
                          : "module-lab-item"
                      }
                      onClick={() => handleModuleClick(item.id)}
                      aria-selected={isActive}
                    >
                      <span className="module-lab-item-title">{item.title}</span>
                      <span className="module-lab-item-hint">{item.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {filteredItems.length === 0 ? (
              <p className="module-lab-empty">No modules match that search.</p>
            ) : null}
          </aside>

          <div
            className="module-lab-stage"
            key={activeItem.id}
            ref={stageRef}
            id="module-lab-stage"
          >
            <div className="module-lab-stage-head">
              <div>
                <p className="module-lab-kicker mono">Try this</p>
                <h2 className="module-lab-title">{activeItem.title}</h2>
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
