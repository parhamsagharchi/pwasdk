import { Screenshot } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";
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
    <section style={DEMO_SECTION_STYLE}>
      <h2>📸 Screenshot</h2>
      <p style={{ fontSize: "14px" }}>
        Browsers cannot detect OS screenshots. This module listens for native
        bridge / manual events and can show a notification.
      </p>

      {!nativeSupported && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Native screenshot detection not available:</strong>
          <br />
          In a WebView, set{" "}
          <code>window.__PWASDK_SCREENSHOT_BRIDGE__ = true</code> and call{" "}
          <code>Screenshot.notifyDetected()</code> when the OS reports a
          screenshot.
        </div>
      )}

      <div>
        <button style={DEMO_BUTTON_STYLE} onClick={simulateCapture}>
          Simulate Screenshot + Notify
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
    </section>
  );
}

export default ScreenshotDemo;
