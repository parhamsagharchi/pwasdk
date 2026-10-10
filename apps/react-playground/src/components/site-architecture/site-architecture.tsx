import { GITHUB_URL } from "../playground-hero/playground-hero.constants";

function SiteArchitecture() {
  return (
    <section className="architecture-section" id="architecture">
      <div className="wrap">
        <div className="architecture-inner">
          <div className="hero-pill-badge">
            <span>ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="architecture-heading">
            Native Performance.
            <br />
            <span className="hologram-text">Zero App Store Approvals.</span>
          </h2>
          <p className="architecture-copy">
            Traditional mobile apps lock you into closed store ecosystems.{" "}
            <code>@pwasdk/core</code> gives you device APIs in the browser —
            import the module, call <code>isSupported()</code>, then use it. This
            page is the live React demo of that same package.
          </p>
          <div className="architecture-actions">
            <a href="#copilot" className="btn-cyan">
              Open AI Prompt Generator
            </a>
            <a
              href={GITHUB_URL}
              className="btn-glass mono"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiteArchitecture;
