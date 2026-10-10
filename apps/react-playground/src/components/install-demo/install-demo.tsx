import { Install } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function InstallDemo() {
  const handleInstallClick = () => {
    void (async () => {
      try {
        const installed = await Install.prompt();
        if (installed) alert("PWA installed successfully!");
        else alert("Install prompt not available. Check console for details.");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        alert("Install error: " + message);
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {Install.isInstalled() ? (
        <div className="demo-callout ok">App is already installed.</div>
      ) : null}
      {!Install.isSupported() ? (
        <div className="demo-callout">
          Install prompt needs a valid manifest, service worker, and HTTPS.
        </div>
      ) : null}
      <button
        type="button"
        className="btn-cyan mono btn-demo-install"
        onClick={handleInstallClick}
        disabled={Install.isInstalled()}
      >
        {Install.isInstalled()
          ? "Already Installed"
          : "Install to Desktop / Mobile"}
      </button>
      <div className="demo-meta demo-meta-spaced">
        <p>Installed: {String(Install.isInstalled())}</p>
        <p>Supported: {String(Install.isSupported())}</p>
        <p>
          Standalone:{" "}
          {window.matchMedia("(display-mode: standalone)").matches ? "yes" : "no"}
        </p>
      </div>
    </section>
  );
}

export default InstallDemo;
