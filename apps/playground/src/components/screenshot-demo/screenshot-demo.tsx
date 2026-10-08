import { Screenshot } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { SCREENSHOT_EXAMPLE } from "./screenshot-demo.constants";
import { useScreenshotDemo } from "./screenshot-demo.hooks";

function ScreenshotDemo() {
  const {
    lastEvent,
    notifyResult,
    simulateCapture,
    nativeSupported,
    notificationSupported,
    captureSupported,
  } = useScreenshotDemo();

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>📸 Screenshot</h2>
      <p style={{ fontSize: "14px" }}>
        Browsers cannot see an OS screenshot. Pass your own action to
        onDetected. This card's action records the event below.
      </p>

      {!nativeSupported && (
        <div className="demo-callout">
          <strong>⚠️ Native screenshot detection not available:</strong>
          <br />
          In a WebView, set{" "}
          <code>window.__PWASDK_SCREENSHOT_BRIDGE__ = true</code> and call{" "}
          <code>Screenshot.notifyDetected()</code> when the OS reports a
          screenshot.
        </div>
      )}

      <div>
        <button className={DEMO_BUTTON_CLASS} onClick={simulateCapture}>
          Report a screenshot
        </button>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <p>
          <strong>Module supported:</strong>{" "}
          {String(Screenshot.isSupported())}
        </p>
        <p>
          <strong>Native detection:</strong> {String(nativeSupported)}
        </p>
        <p>
          <strong>Notification API:</strong> {String(notificationSupported)}
        </p>
        <p>
          <strong>Canvas/video capture:</strong> {String(captureSupported)}
        </p>
        {lastEvent && (
          <p>
            <strong>Last event:</strong> source={lastEvent.source}, at=
            {new Date(lastEvent.at).toLocaleTimeString()}
          </p>
        )}
        {notifyResult && (
          <p style={{ marginTop: "6px" }}>
            <small>{notifyResult}</small>
          </p>
        )}
      </div>
      <CodeSnippet code={SCREENSHOT_EXAMPLE} />
    </section>
  );
}

export default ScreenshotDemo;
