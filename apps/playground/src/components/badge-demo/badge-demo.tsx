import { Badge } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function BadgeDemo() {
  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>🏷️ App Badge</h2>
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            try {
              await Badge.set(5);
              alert("Badge set to 5");
            } catch (error: any) {
              alert("Failed: " + error.message);
            }
          }}
        >
          Set Badge (5)
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            try {
              await Badge.clear();
              alert("Badge cleared");
            } catch (error: any) {
              alert("Failed: " + error.message);
            }
          }}
        >
          Clear Badge
        </button>
      </div>
      <p>
        <small>Supported: {String(Badge.isSupported())}</small>
      </p>
      <p style={{ fontSize: "12px", marginTop: "4px" }}>
        📌 The badge is a small number shown on the installed app icon (for
        example in the taskbar/dock). It only works in some browsers (like
        Chrome/Edge) when the PWA is installed; on iOS it is usually not
        supported.
      </p>
    </section>
  );
}

export default BadgeDemo;
