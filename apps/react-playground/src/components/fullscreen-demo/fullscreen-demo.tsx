import { useState } from "react";
import { Fullscreen } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function FullscreenDemo() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreenClick = () => {
    void (async () => {
      try {
        await Fullscreen.toggle();
        setIsFullscreen(Fullscreen.isFullscreen());
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : "Failed to toggle fullscreen";
        alert(message);
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Fullscreen.isSupported() && (
        <div className="demo-callout">Fullscreen API is not supported.</div>
      )}
      <button
        type="button"
        className={DEMO_BUTTON_CLASS}
        onClick={handleToggleFullscreenClick}
        disabled={!Fullscreen.isSupported()}
      >
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
      <p className="demo-meta">Fullscreen: {String(isFullscreen)}</p>
    </section>
  );
}

export default FullscreenDemo;
