import { GITHUB_URL } from "../playground-hero/playground-hero.constants";

const CONTACT_EMAIL = "parhamsagharchi@gmail.com";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer-links">
          <span>@pwasdk/core</span>
          <span className="site-footer-sep" aria-hidden="true">
            ·
          </span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="site-footer-sep" aria-hidden="true">
            ·
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <div className="site-footer-status">
          Small helpers for phone features in the browser
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
