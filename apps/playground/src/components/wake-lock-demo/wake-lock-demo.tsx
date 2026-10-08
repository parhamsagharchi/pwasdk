import { useState } from "react";
import { WakeLock } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { WAKE_LOCK_EXAMPLE } from "./wake-lock-demo.constants";

function WakeLockDemo() {
  const [wakeLockActive, setWakeLockActive] = useState(false);

  const handleRequestWakeLockClick = async () => {
    try {
      await WakeLock.request();
      setWakeLockActive(true);
    } catch (e: any) {
      alert(e?.message || "Failed to request wake lock");
    }
  };

  const handleReleaseWakeLockClick = async () => {
    await WakeLock.release();
    setWakeLockActive(false);
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>🔒 Wake Lock</h2>
      <p style={{ fontSize: "14px" }}>
        Keep the screen awake while the user is interacting with your app.
      </p>
      {!WakeLock.isSupported() && (
        <div className="demo-callout">
          <strong>⚠️ Wake Lock not supported:</strong>
          <br />
          This browser does not support the Wake Lock API.
        </div>
      )}
      <div>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleRequestWakeLockClick}
          disabled={!WakeLock.isSupported() || wakeLockActive}
        >
          Request Wake Lock
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleReleaseWakeLockClick}
          disabled={!wakeLockActive}
        >
          Release Wake Lock
        </button>
      </div>
      <p style={{ fontSize: "14px", marginTop: "8px" }}>
        <strong>Status:</strong>{" "}
        {wakeLockActive ? "✅ Active" : "❌ Not active"}
      </p>
      <CodeSnippet code={WAKE_LOCK_EXAMPLE} />
    </section>
  );
}

export default WakeLockDemo;
