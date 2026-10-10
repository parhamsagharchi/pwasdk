import {
  CATEGORY_PILLS,
  INSTALL_COMMANDS,
  PACKAGE_MANAGERS,
} from "./playground-hero.constants";
import type { IPlaygroundHeroProps } from "./playground-hero.types";
import { probeRadar } from "./playground-hero.utils";

function PlaygroundHero({
  packageManager,
  copied,
  query,
  category,
  packageManagerHandlers,
  categoryHandlers,
  handleCopyInstall,
  handleSearchChange,
}: IPlaygroundHeroProps) {
  const radar = probeRadar();
  const activeCount = radar.filter((chip) => chip.active).length;

  return (
    <section className="hero-section" id="playground">
      <div className="wrap">
        <div className="hardware-radar-deck">
          <div className="radar-left">
            <div className="pulse-beacon-cyber" />
            <span className="radar-headline">
              {activeCount} of {radar.length} modules work in this browser
            </span>
          </div>
          <div className="radar-chips">
            {radar.map((chip) => (
              <div
                key={chip.id}
                className={chip.active ? "radar-chip active" : "radar-chip"}
              >
                <span className="dot" />
                {chip.label}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-container">
          <div>
            <div className="hero-pill-badge">
              <span>@pwasdk/core — TypeScript package</span>
            </div>
            <h1 className="hero-heading">
              Browser device APIs
              <br />
              <span className="hologram-text">for your PWA.</span>
            </h1>
            <p className="hero-description">
              One npm package with small modules — Camera, Haptic, Push, Share,
              and more. Import what you need, call <code>isSupported()</code>,
              then use it. Copy a ready prompt for Cursor or Claude below.
            </p>
            <div className="hero-actions-row">
              <a href="#copilot" className="btn-cyan">
                Get AI prompt
              </a>
              <a
                href="https://github.com/parhamsagharchi/pwasdk"
                className="btn-glass mono"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          <div>
            <div className="package-switcher-card">
              <div className="switcher-tabs">
                {PACKAGE_MANAGERS.map((manager) => (
                  <button
                    key={manager}
                    type="button"
                    className={
                      packageManager === manager ? "pm-tab active" : "pm-tab"
                    }
                    onClick={packageManagerHandlers[manager]}
                  >
                    {manager}
                  </button>
                ))}
              </div>
              <div
                className="install-command-line"
                title="Copy install command"
              >
                <code>{INSTALL_COMMANDS[packageManager]}</code>
                <button
                  type="button"
                  className="copy-badge-pill mono"
                  onClick={handleCopyInstall}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="search-container">
                <div className="search-input-box">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="search-icon"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="search"
                    id="cyber-search-input"
                    placeholder="Search modules…"
                    autoComplete="off"
                    spellCheck={false}
                    value={query}
                    onChange={handleSearchChange}
                  />
                  <kbd className="kbd-shortcut mono">/</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category-filter-nav">
          {CATEGORY_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={category === pill.id ? "cat-pill active" : "cat-pill"}
              onClick={categoryHandlers[pill.id]}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlaygroundHero;
