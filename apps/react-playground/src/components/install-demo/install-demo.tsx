import { useState } from "react";
import { Install, Pwa } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function InstallDemo() {
  const [message, setMessage] = useState("");
  const platform = Pwa.platform();
  const showIosHelp = platform === "ios" && !Install.isInstalled();

  const handleInstallClick = () => {
    void (async () => {
      try {
        if (!Install.canPrompt()) {
          if (platform === "ios") {
            setMessage(Pwa.getIOSInstallInstructions());
            return;
          }
          setMessage(
            "Install prompt is not ready yet. Stay on HTTPS, keep a service worker, and try again after the browser fires beforeinstallprompt.",
          );
          return;
        }

        const installed = await Install.prompt();
        setMessage(
          installed
            ? "PWA installed successfully."
            : "Install dismissed or not completed.",
        );
      } catch (error: unknown) {
        const errMessage =
          error instanceof Error ? error.message : String(error);
        setMessage("Install error: " + errMessage);
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {Install.isInstalled() ? (
        <div className="demo-callout ok">App is already installed.</div>
      ) : null}
      {showIosHelp ? (
        <div className="demo-callout" style={{ whiteSpace: "pre-line" }}>
          iOS has no beforeinstallprompt. Use Safari Share → Add to Home Screen.
        </div>
      ) : null}
      {!Install.isSupported() && platform !== "ios" ? (
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
          : platform === "ios"
            ? "Show iOS install steps"
            : "Install app"}
      </button>
      <div className="demo-meta demo-meta-spaced">
        <p>Installed: {String(Install.isInstalled())}</p>
        <p>canPrompt: {String(Install.canPrompt())}</p>
        <p>Platform: {platform}</p>
        <p>
          Standalone:{" "}
          {window.matchMedia("(display-mode: standalone)").matches ? "yes" : "no"}
        </p>
        {message ? (
          <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        ) : null}
      </div>
    </section>
  );
}

export default InstallDemo;
