import { Install } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { INSTALL_EXAMPLE } from "./install-demo.constants";

function InstallDemo() {
  const handleInstallClick = async () => {
    console.log("Install button clicked");
    try {
      const installed = await Install.prompt();
      console.log("Install result:", installed);
      if (installed) {
        alert("✅ PWA installed successfully!");
      } else {
        alert("Install prompt not available. Check console for details.");
      }
    } catch (error: any) {
      console.error("Install error:", error);
      alert("Install error: " + (error.message || error));
    }
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>📱 Install PWA</h2>
      {Install.isInstalled() && (
        <div className="demo-callout ok">
          ✅ App is already installed!
        </div>
      )}
      {!Install.isSupported() && (
        <div className="demo-callout">
          <strong>⚠️ Install not available:</strong>
          <br />
          Make sure you have:
          <ul>
            <li>Valid manifest.json</li>
            <li>Service worker registered</li>
            <li>HTTPS connection</li>
            <li>App meets installability criteria</li>
          </ul>
        </div>
      )}
      <button
        className={DEMO_BUTTON_CLASS}
        onClick={handleInstallClick}
        disabled={Install.isInstalled()}
      >
        {Install.isInstalled() ? "Already Installed" : "Install App"}
      </button>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <p>
          <strong>Installed:</strong> {String(Install.isInstalled())}
        </p>
        <p>
          <strong>Supported:</strong> {String(Install.isSupported())}
        </p>
        <p>
          <strong>Standalone Mode:</strong>{" "}
          {window.matchMedia("(display-mode: standalone)").matches
            ? "✅"
            : "❌"}
        </p>
        <p>
          <small>💡 Open browser console to see install prompt events</small>
        </p>
      </div>
      <CodeSnippet code={INSTALL_EXAMPLE} />
    </section>
  );
}

export default InstallDemo;
