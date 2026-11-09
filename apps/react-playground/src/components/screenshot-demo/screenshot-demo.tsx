import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useUiContext } from "../ui/ui.hooks";

function ScreenshotDemo() {
  const { screenshot } = useUiContext();

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
        Chrome / Safari / installed PWAs cannot see Power+Volume screenshots.
        Tap <strong>Simulate screenshot</strong> to open the bottom sheet, or
        call <code>window.PwaSdkScreenshot.notify()</code> from a native
        WebView. Desktop: PrintScreen also fires the callback.
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleEnableClick}
          disabled={screenshot.isListening}
        >
          {screenshot.isListening ? "Listening…" : "Enable listen"}
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
          Preview sheet
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Listening: {String(screenshot.isListening)}</p>
        <p>Native bridge flag: {String(screenshot.nativeBridge)}</p>
        {screenshot.lastEvent ? (
          <p>
            Last: source={screenshot.lastEvent.source} ·{" "}
            {new Date(screenshot.lastEvent.at).toLocaleTimeString()}
          </p>
        ) : null}
        {screenshot.status ? <p>{screenshot.status}</p> : null}
      </div>
    </section>
  );
}

export default ScreenshotDemo;
