import { useState } from "react";
import { Push } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function PushDemo() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState(
    "Tap Enable to ask for notification permission.",
  );

  const handleEnablePushClick = () => {
    void (async () => {
      try {
        const reg = await Push.register();
        if (!reg) {
          setToastText("Could not set up the background worker for push.");
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
            setToastText(
              "Permission granted. Add VITE_VAPID_PUBLIC_KEY in .env to finish subscribe.",
            );
          } else {
            await Push.subscribe(vapidPublicKey);
            setToastText("Subscribed — your server can send push now.");
          }
        } else if (permission === "denied") {
          setToastText("Notifications were blocked.");
        } else {
          setToastText("Permission dialog was dismissed.");
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setToastText(`Could not enable push: ${message}`);
      }

      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 3500);
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <p className="demo-meta">
        Ask for permission so your server can notify the user later — even when
        the tab is closed.
      </p>
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
          <div className="toast-body-title">Push notification</div>
          <div className="toast-body-text">{toastText}</div>
        </div>
        <div className="demo-actions-row demo-actions-single">
          <button
            type="button"
            className="btn-cyan mono btn-demo-compact"
            onClick={handleEnablePushClick}
          >
            Enable notifications
          </button>
        </div>
        <p className="demo-meta">
          Works here: {Push.isSupported() ? "Yes" : "No"}
        </p>
      </div>
    </section>
  );
}

export default PushDemo;
