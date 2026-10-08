import { useState } from "react";
import { Fullscreen } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { FULLSCREEN_EXAMPLE } from "./fullscreen-demo.constants";

function FullscreenDemo() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreenClick = async () => {
    try {
      await Fullscreen.toggle();
      setIsFullscreen(Fullscreen.isFullscreen());
    } catch (e: any) {
      alert(e?.message || "Failed to toggle fullscreen");
    }
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>⛶ Fullscreen</h2>
      <p style={{ fontSize: "14px" }}>
        Toggle fullscreen mode for the page (useful for games or videos).
      </p>
      {!Fullscreen.isSupported() && (
        <div className="demo-callout">
          <strong>⚠️ Fullscreen not supported:</strong>
          <br />
          This browser does not support the Fullscreen API.
        </div>
      )}
      <div>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleToggleFullscreenClick}
          disabled={!Fullscreen.isSupported()}
        >
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </button>
      </div>
      <p style={{ fontSize: "14px", marginTop: "8px" }}>
        <strong>Fullscreen:</strong> {String(isFullscreen)}
      </p>
      <CodeSnippet code={FULLSCREEN_EXAMPLE} />
    </section>
  );
}

export default FullscreenDemo;
