import { Install } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function InstallDemo() {
  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>📱 Install PWA</h2>
      {Install.isInstalled() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#d4edda",
            border: "1px solid #28a745",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          ✅ App is already installed!
        </div>
      )}
      {!Install.isSupported() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Install not available:</strong>
          <br />
          Make sure you have:
          <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
            <li>Valid manifest.json</li>
            <li>Service worker registered</li>
            <li>HTTPS connection</li>
            <li>App meets installability criteria</li>
          </ul>
        </div>
      )}
      <button
        style={DEMO_BUTTON_STYLE}
        onClick={async () => {
          console.log("Install button clicked");
          try {
            const installed = await Install.prompt();
            console.log("Install result:", installed);
            if (installed) {
              alert("✅ PWA installed successfully!");
            } else {
              alert(
                "Install prompt not available. Check console for details.",
              );
            }
          } catch (error: any) {
            console.error("Install error:", error);
            alert("Install error: " + (error.message || error));
          }
        }}
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
    </section>
  );
}

export default InstallDemo;
