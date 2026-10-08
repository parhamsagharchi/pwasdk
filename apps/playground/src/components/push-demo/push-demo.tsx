import { Push } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { PUSH_EXAMPLE } from "./push-demo.constants";

function PushDemo() {
  const handleEnablePushClick = async () => {
    try {
      console.log("Step 1: Registering service worker...");
      const reg = await Push.register();
      if (!reg) {
        alert(
          "Failed to register service worker. Check console for details.",
        );
        return;
      }

      console.log("Step 2: Requesting notification permission...");
      const permission = await Push.requestPermission();
      console.log("Permission result:", permission);

      if (permission === "granted") {
        const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as
          | string
          | undefined;
        if (!vapidPublicKey) {
          alert(
            "Permission granted, but no VAPID public key is configured.\n\nSet VITE_VAPID_PUBLIC_KEY in apps/playground/.env and restart the dev server.",
          );
          return;
        }
        try {
          const subscription = await Push.subscribe(vapidPublicKey);
          console.log("Push subscription:", subscription);
          alert(
            "Push notifications enabled.\n\nSubscription endpoint is logged in the console.",
          );
        } catch (subError: any) {
          console.error("Subscription error:", subError);
          alert(
            "Notifications allowed, but failed to create push subscription: " +
              (subError.message || subError),
          );
        }
      } else if (permission === "denied") {
        alert(
          "❌ Push notifications permission denied. Check browser settings.",
        );
      } else {
        alert("⚠️ Push notifications permission dismissed. Try again.");
      }
    } catch (error: any) {
      console.error("Push notification error:", error);
      alert("Failed to enable push: " + (error.message || error));
    }
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>🔔 Push Notifications</h2>
      <div>
        <button className={DEMO_BUTTON_CLASS} onClick={handleEnablePushClick}>
          Enable Push Notifications
        </button>
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <p>
          <strong>Supported:</strong> {String(Push.isSupported())}
        </p>
        <p>
          <strong>Service Worker:</strong>{" "}
          {"serviceWorker" in navigator ? "✅" : "❌"}
        </p>
        <p>
          <strong>Push Manager:</strong>{" "}
          {"PushManager" in window ? "✅" : "❌"}
        </p>
        <p>
          <strong>Notification API:</strong>{" "}
          {"Notification" in window ? "✅" : "❌"}
        </p>
        <p>
          <small>💡 Open browser console to see detailed logs</small>
        </p>
      </div>
      <CodeSnippet code={PUSH_EXAMPLE} />
    </section>
  );
}

export default PushDemo;
