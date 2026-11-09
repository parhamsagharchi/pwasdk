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
            "Install isn’t ready yet. Stay on HTTPS with a service worker, then wait until the browser offers install — or check the browser menu.",
          );
          return;
        }

        const installed = await Install.prompt();
        setMessage(
          installed
            ? "App installed successfully."
            : "Install was cancelled or not finished.",
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
        <div className="demo-callout ok">This app is already installed.</div>
      ) : null}
      {showIosHelp ? (
        <div className="demo-callout" style={{ whiteSpace: "pre-line" }}>
          iPhone doesn’t show a browser Install button. Use Safari → Share → Add
          to Home Screen.
        </div>
      ) : null}
      {!Install.isSupported() && platform !== "ios" ? (
        <div className="demo-callout">
          Install needs HTTPS, a web app manifest, and a service worker.
        </div>
      ) : (
        <p className="demo-meta">
          Add this site to the home screen like a real app.
        </p>
      )}
      <div className="demo-actions-row demo-actions-single">
        <button
          type="button"
          className="btn-cyan mono btn-demo-install"
          onClick={handleInstallClick}
          disabled={Install.isInstalled()}
        >
          {Install.isInstalled()
            ? "Already installed"
            : platform === "ios"
              ? "Show iPhone install steps"
              : "Install app"}
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Installed: {Install.isInstalled() ? "Yes" : "No"}</p>
        <p>
          Browser can show install button: {Install.canPrompt() ? "Yes" : "Not yet"}
        </p>
        <p>Platform: {platform}</p>
        <p>
          Running from home screen:{" "}
          {window.matchMedia("(display-mode: standalone)").matches
            ? "Yes"
            : "No"}
        </p>
        {message ? (
          <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        ) : null}
      </div>
    </section>
  );
}

export default InstallDemo;
