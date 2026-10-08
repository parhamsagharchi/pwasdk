import { GITHUB_URL } from "../playground-hero/playground-hero.constants";

function SiteArchitecture() {
  return (
    <section className="architecture-section" id="architecture">
      <div className="wrap">
        <div className="architecture-inner">
          <div className="hero-pill-badge">
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="architecture-heading">
            Import it.
            <br />
            <span className="hologram-text">Check support. Call it.</span>
          </h2>
          <p className="architecture-copy">
            Each feature is one object, such as <code>Haptic</code> or{" "}
            <code>Camera</code>. If <code>isSupported()</code> is false, hide
            that button. This page is only a React demo of the package. Your
            app imports <code>@pwasdk/core</code> the same way.
          </p>
          <div className="architecture-actions">
            <a href="#capabilities" className="btn-cyan">
              Back to examples
            </a>
            <a
              href={GITHUB_URL}
              className="btn-glass mono"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiteArchitecture;
