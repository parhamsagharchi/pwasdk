import { GITHUB_URL } from "../playground-hero/playground-hero.constants";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <span>@pwasdk/core — </span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </div>
        <div className="site-footer-status">
          Hardware Telemetry &amp; AI Generator Active
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
