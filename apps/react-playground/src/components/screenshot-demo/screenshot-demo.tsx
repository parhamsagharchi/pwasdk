import { useCallback, useRef } from "react";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";
import { useUiContext } from "../ui/ui.hooks";
import { SCREENSHOT_ANDROID_HINT } from "./screenshot-demo.constants";

function ScreenshotDemo() {
  const { screenshot } = useUiContext();
  const simulatedRef = useRef(false);
  const simulateTimerRef = useRef<number | null>(null);

  const start = useCallback(() => {
    screenshot.enableListening();
    if (simulatedRef.current) return;
    simulatedRef.current = true;
    simulateTimerRef.current = window.setTimeout(() => {
      screenshot.simulate();
      simulateTimerRef.current = null;
    }, 400);
  }, [screenshot]);

  const stop = useCallback(() => {
    if (simulateTimerRef.current != null) {
      window.clearTimeout(simulateTimerRef.current);
      simulateTimerRef.current = null;
    }
    screenshot.disableListening();
    screenshot.closeSheet();
  }, [screenshot]);

  useDemoAutorun(start, stop);

  const handleEnableClick = () => {
    screenshot.enableListening();
  };

  const handleDisableClick = () => {
    screenshot.disableListening();
  };

  const handleSimulateClick = () => {
    screenshot.simulate();
  };

  const handlePreviewSheetClick = () => {
    screenshot.openSheet();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <div className="demo-callout">
        <strong>In Chrome / a normal PWA, Power + Volume Down is not visible to
        JavaScript.</strong>{" "}
        This module auto-simulates once so you see the sheet. Real phone
        detection needs an Android app shell (Capacitor / WebView).
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleEnableClick}
          disabled={screenshot.isListening}
        >
          {screenshot.isListening ? "Listening…" : "Start listening"}
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleDisableClick}
          disabled={!screenshot.isListening}
        >
          Stop
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleSimulateClick}
        >
          Simulate screenshot
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handlePreviewSheetClick}
        >
          Preview tip sheet
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Listening: {screenshot.isListening ? "Yes" : "No"}</p>
        <p>
          Native phone bridge:{" "}
          {screenshot.nativeBridge ? "Connected" : "Not connected (normal in Chrome)"}
        </p>
        {screenshot.lastEvent ? (
          <p>
            Last event: {screenshot.lastEvent.source} ·{" "}
            {new Date(screenshot.lastEvent.at).toLocaleTimeString()}
          </p>
        ) : null}
        {screenshot.status ? <p>{screenshot.status}</p> : null}
        <pre className="mono demo-hint-block">
          {SCREENSHOT_ANDROID_HINT}
        </pre>
      </div>
    </section>
  );
}

export default ScreenshotDemo;
