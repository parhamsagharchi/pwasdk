import { useState } from "react";
import { WakeLock } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function WakeLockDemo() {
  const [wakeLockActive, setWakeLockActive] = useState(false);

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>🔒 Wake Lock</h2>
      <p style={{ fontSize: "14px" }}>
        Keep the screen awake while the user is interacting with your app.
      </p>
      {!WakeLock.isSupported() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Wake Lock not supported:</strong>
          <br />
          This browser does not support the Wake Lock API.
        </div>
      )}
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            try {
              await WakeLock.request();
              setWakeLockActive(true);
            } catch (e: any) {
              alert(e?.message || "Failed to request wake lock");
            }
          }}
          disabled={!WakeLock.isSupported() || wakeLockActive}
        >
          Request Wake Lock
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            await WakeLock.release();
            setWakeLockActive(false);
          }}
          disabled={!wakeLockActive}
        >
          Release Wake Lock
        </button>
      </div>
      <p style={{ fontSize: "14px", marginTop: "8px" }}>
        <strong>Status:</strong>{" "}
        {wakeLockActive ? "✅ Active" : "❌ Not active"}
      </p>
    </section>
  );
}

export default WakeLockDemo;
