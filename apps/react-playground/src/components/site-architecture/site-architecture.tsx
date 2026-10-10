import { GITHUB_URL } from "../playground-hero/playground-hero.constants";

function SiteArchitecture() {
  return (
    <section className="architecture-section" id="architecture">
      <div className="wrap">
        <div className="architecture-inner">
          <div className="hero-pill-badge">
            <span>How it works</span>
          </div>
          <h2 className="architecture-heading">
            Import. Check support. Call it.
          </h2>
          <p className="architecture-copy">
            <code>@pwasdk/core</code> is a set of small TypeScript modules over
            browser APIs (camera, vibration, push, share, and so on). Import a
            module, call <code>isSupported()</code>, then use it — no app-store
            build required. This page is the live React demo of that package.
          </p>
          <div className="architecture-actions">
            <a href="#copilot" className="btn-cyan">
              Get AI prompt
            </a>
            <a
              href={GITHUB_URL}
              className="btn-glass mono"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiteArchitecture;
