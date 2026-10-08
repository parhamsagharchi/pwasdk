import {
  GITHUB_URL,
  SDK_VERSION,
} from "../playground-hero/playground-hero.constants";

function SiteHeader() {
  return (
    <header className="site-nav">
      <div className="wrap">
        <div className="brand-badge">
          <div className="brand-logo-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="brand-title">
            PWA<span className="brand-accent">.SDK</span>
          </span>
          <span className="brand-ver">{SDK_VERSION}</span>
        </div>

        <nav className="nav-links">
          <a href="#playground">Install</a>
          <a href="#capabilities">Examples</a>
          <a href="#architecture">How it works</a>
        </nav>

        <div className="nav-actions">
          <a
            href={GITHUB_URL}
            className="btn-glass mono"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#capabilities" className="btn-cyan">
            Try the APIs
          </a>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
