import { Device, Haptic } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function HapticDemo() {
  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>📳 Haptic Feedback</h2>
      <p>Test vibration patterns on mobile devices</p>
      {!Haptic.isSupported() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Vibration not supported:</strong>
          <br />
          {/iPhone|iPad|iPod/.test(navigator.userAgent) ? (
            <>
              iOS Safari doesn't support vibration API. Try Chrome on Android
              instead.
            </>
          ) : (
            <>
              Your browser/device doesn't support the Vibration API. Make sure
              you're using Chrome on Android.
            </>
          )}
        </div>
      )}
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            console.log("Testing light vibration...");
            const result = Haptic.trigger("light");
            console.log("Result:", result);
            if (!result) {
              alert(
                "Vibration failed. Check console for details. Make sure you're on Chrome/Android!",
              );
            } else {
              console.log("✅ Light vibration should have triggered");
            }
          }}
        >
          Light Vibration (100ms)
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            console.log("Testing medium vibration...");
            const result = Haptic.trigger("medium");
            console.log("Result:", result);
            if (!result) {
              alert(
                "Vibration failed. Check console for details. Make sure you're on Chrome/Android!",
              );
            } else {
              console.log("✅ Medium vibration should have triggered");
            }
          }}
        >
          Medium Vibration (200ms)
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            console.log("Testing heavy vibration...");
            const result = Haptic.trigger("heavy");
            console.log("Result:", result);
            if (!result) {
              alert(
                "Vibration failed. Check console for details. Make sure you're on Chrome/Android!",
              );
            } else {
              console.log("✅ Heavy vibration should have triggered");
            }
          }}
        >
          Heavy Vibration (300-100-300ms)
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            console.log("Testing custom pattern...");
            const result = Haptic.pattern([200, 100, 200, 100, 200]);
            console.log("Result:", result);
            if (!result) {
              alert("Vibration failed. Check console for details.");
            } else {
              console.log("✅ Custom pattern should have triggered");
            }
          }}
        >
          Custom Pattern (200-100-200-100-200ms)
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            const result = Haptic.stop();
            console.log("Stop vibration result:", result);
          }}
        >
          Stop Vibration
        </button>
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <p>
          <strong>Status:</strong>{" "}
          {Haptic.isSupported() ? "✅ Supported" : "❌ Not Supported"}
        </p>
        <p>
          <strong>Device:</strong>{" "}
          {Device.isMobile ? "📱 Mobile" : "💻 Desktop"}
        </p>
        <p>
          <strong>Browser:</strong>{" "}
          {navigator.userAgent.includes("Chrome")
            ? "Chrome ✅"
            : navigator.userAgent.includes("Safari")
              ? "Safari ⚠️ (iOS Safari doesn't support vibration)"
              : "Other"}
        </p>
        <p>
          <small>
            💡 Tip: Open browser console (F12 or DevTools) to see detailed
            vibration logs
          </small>
        </p>
      </div>
    </section>
  );
}

export default HapticDemo;
