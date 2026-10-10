import { useState } from "react";
import { Push } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function PushDemo() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState(
    "Service Worker registered push subscription.",
  );

  const handleEnablePushClick = () => {
    void (async () => {
      try {
        const reg = await Push.register();
        if (!reg) {
          setToastText("Failed to register service worker.");
          setToastVisible(true);
          window.setTimeout(() => setToastVisible(false), 3500);
          return;
        }

        const permission = await Push.requestPermission();
        if (permission === "granted") {
          const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as
            | string
            | undefined;
          if (!vapidPublicKey) {
            setToastText("Permission granted — set VITE_VAPID_PUBLIC_KEY.");
          } else {
            await Push.subscribe(vapidPublicKey);
            setToastText("Push subscription active.");
          }
        } else if (permission === "denied") {
          setToastText("Push permission denied.");
        } else {
          setToastText("Push permission dismissed.");
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setToastText(`Failed to enable push: ${message}`);
      }

      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 3500);
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <div className="push-dynamic-stage">
        <div
          className={
            toastVisible
              ? "dynamic-island-toast visible"
              : "dynamic-island-toast"
          }
        >
          <div className="toast-top-row">
            <div className="toast-app-pill">
              <span className="toast-dot" />
              <span>PWA.SDK</span>
            </div>
            <span>Just now</span>
          </div>
          <div className="toast-body-title">Push Notification</div>
          <div className="toast-body-text">{toastText}</div>
        </div>
        <button
          type="button"
          className="btn-cyan mono btn-demo-compact"
          onClick={handleEnablePushClick}
        >
          Enable push
        </button>
        <p className="demo-meta">Supported: {String(Push.isSupported())}</p>
      </div>
    </section>
  );
}

export default PushDemo;
