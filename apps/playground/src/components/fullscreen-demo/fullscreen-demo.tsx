import { useState } from "react";
import { Fullscreen } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function FullscreenDemo() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>⛶ Fullscreen</h2>
      <p style={{ fontSize: "14px" }}>
        Toggle fullscreen mode for the page (useful for games or videos).
      </p>
      {!Fullscreen.isSupported() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Fullscreen not supported:</strong>
          <br />
          This browser does not support the Fullscreen API.
        </div>
      )}
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            try {
              await Fullscreen.toggle();
              setIsFullscreen(Fullscreen.isFullscreen());
            } catch (e: any) {
              alert(e?.message || "Failed to toggle fullscreen");
            }
          }}
          disabled={!Fullscreen.isSupported()}
        >
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </button>
      </div>
      <p style={{ fontSize: "14px", marginTop: "8px" }}>
        <strong>Fullscreen:</strong> {String(isFullscreen)}
      </p>
    </section>
  );
}

export default FullscreenDemo;
