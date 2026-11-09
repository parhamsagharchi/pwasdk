import { SDK_VERSION } from "../playground-hero/playground-hero.constants";

function SiteHeader() {
  return (
    <header className="site-nav">
      <div className="wrap site-nav-inner">
        <a href="/?module=torch" className="brand-badge">
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
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="/?module=torch">Modules</a>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
