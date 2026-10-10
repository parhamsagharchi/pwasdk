import { GITHUB_URL } from "../playground-hero/playground-hero.constants";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <span>@pwasdk/core — </span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="site-footer-status">
          TypeScript helpers for browser / PWA APIs
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
