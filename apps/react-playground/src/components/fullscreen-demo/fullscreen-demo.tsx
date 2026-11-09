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
          e instanceof Error ? e.message : "Could not toggle fullscreen";
        alert(message);
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Fullscreen.isSupported() ? (
        <div className="demo-callout">
          Fullscreen isn’t available here (common on iPhone Safari).
        </div>
      ) : (
        <p className="demo-meta">
          Expand this page to fill the whole screen, then exit again.
        </p>
      )}
      <div className="demo-actions-row demo-actions-single">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleToggleFullscreenClick}
          disabled={!Fullscreen.isSupported()}
        >
          {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        </button>
      </div>
      <p className="demo-meta">
        Fullscreen now: {isFullscreen ? "Yes" : "No"}
      </p>
    </section>
  );
}

export default FullscreenDemo;
