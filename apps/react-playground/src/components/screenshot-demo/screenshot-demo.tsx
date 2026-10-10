import { Screenshot } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useScreenshotDemo } from "./screenshot-demo.hooks";

function ScreenshotDemo() {
  const {
    lastEvent,
    notifyResult,
    permission,
    handleEnableNotificationsClick,
    handleSimulateCaptureClick,
    nativeSupported,
    notificationSupported,
    captureSupported,
  } = useScreenshotDemo();

  return (
    <section className={DEMO_SECTION_CLASS}>
      <div className="demo-callout">
        Mobile Chrome / Safari / PWA cannot see Power+Volume screenshots.
        Only a native Android / iOS shell can detect the OS event, then call{" "}
        <code>window.PwaSdkScreenshot.notify()</code>. This card shows the
        notification once that event (or a manual report) fires.
      </div>
      <div className="demo-actions-row">
        {notificationSupported ? (
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleEnableNotificationsClick}
          >
            {permission === "granted"
              ? "Notifications on"
              : "Enable notifications"}
          </button>
        ) : null}
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleSimulateCaptureClick}
        >
          Simulate screenshot
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Module supported: {String(Screenshot.isSupported())}</p>
        <p>Native OS bridge: {String(nativeSupported)}</p>
        <p>Notification API: {String(notificationSupported)}</p>
        <p>Permission: {permission}</p>
        <p>Canvas/video capture: {String(captureSupported)}</p>
        {lastEvent ? (
          <p>
            Last event: source={lastEvent.source}, at=
            {new Date(lastEvent.at).toLocaleTimeString()}
          </p>
        ) : null}
        {notifyResult ? <p>{notifyResult}</p> : null}
      </div>
    </section>
  );
}

export default ScreenshotDemo;
