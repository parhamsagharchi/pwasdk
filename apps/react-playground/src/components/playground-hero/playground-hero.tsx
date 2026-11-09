import {
  GITHUB_URL,
  INSTALL_COMMANDS,
  PACKAGE_MANAGERS,
} from "./playground-hero.constants";
import type { IPlaygroundHeroProps } from "./playground-hero.types";
import { probeRadar } from "./playground-hero.utils";

function PlaygroundHero({
  packageManager,
  copied,
  packageManagerHandlers,
  handleCopyInstall,
}: IPlaygroundHeroProps) {
  const radar = probeRadar();
  const activeCount = radar.filter((chip) => chip.active).length;

  return (
    <section className="hero-section hero-section-compact" id="playground">
      <div className="wrap">
        <div className="hero-compact">
          <div className="hero-compact-copy">
            <p className="hero-pill-badge">
              <span>@pwasdk/core</span>
            </p>
            <h1 className="hero-heading hero-heading-compact">
              Phone features{" "}
              <span className="hologram-text">for your web app</span>
            </h1>
            <p className="hero-compact-line">
              Try camera, shake, share, and more on your phone — then copy the
              code on desktop. {activeCount} of {radar.length} work in this
              browser.
            </p>
            <div className="hero-actions-row">
              <a href="/?module=torch" className="btn-cyan">
                Try modules
              </a>
              <a
                href={GITHUB_URL}
                className="btn-glass mono"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="package-switcher-card package-switcher-compact">
            <p className="package-switcher-label mono">Add to your project</p>
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
            <div className="install-command-line" title="Copy install command">
              <code>{INSTALL_COMMANDS[packageManager]}</code>
              <button
                type="button"
                className="copy-badge-pill mono"
                onClick={handleCopyInstall}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlaygroundHero;
