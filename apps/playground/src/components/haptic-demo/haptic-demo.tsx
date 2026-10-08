import { Device, Haptic } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { HAPTIC_EXAMPLE } from "./haptic-demo.constants";

const MOBILE_VIBRATION_FAILURE =
  "Vibration failed. Check console for details. Make sure you're on Chrome/Android!";

function reportHaptic(label: string, result: boolean, failureMessage: string) {
  console.log(`Testing ${label}...`);
  console.log("Result:", result);
  if (!result) {
    alert(failureMessage);
    return;
  }
  console.log(`✅ ${label} should have triggered`);
}

function HapticDemo() {
  const handleLightClick = () => {
    reportHaptic("Light vibration", Haptic.trigger("light"), MOBILE_VIBRATION_FAILURE);
  };

  const handleMediumClick = () => {
    reportHaptic(
      "Medium vibration",
      Haptic.trigger("medium"),
      MOBILE_VIBRATION_FAILURE,
    );
  };

  const handleHeavyClick = () => {
    reportHaptic("Heavy vibration", Haptic.trigger("heavy"), MOBILE_VIBRATION_FAILURE);
  };

  const handlePatternClick = () => {
    reportHaptic(
      "Custom pattern",
      Haptic.pattern([200, 100, 200, 100, 200]),
      "Vibration failed. Check console for details.",
    );
  };

  const handleStopClick = () => {
    const result = Haptic.stop();
    console.log("Stop vibration result:", result);
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>📳 Haptic Feedback</h2>
      <p>Test vibration patterns on mobile devices</p>
      {!Haptic.isSupported() && (
        <div className="demo-callout">
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
        <button className={DEMO_BUTTON_CLASS} onClick={handleLightClick}>
          Light Vibration (100ms)
        </button>
        <button className={DEMO_BUTTON_CLASS} onClick={handleMediumClick}>
          Medium Vibration (200ms)
        </button>
        <button className={DEMO_BUTTON_CLASS} onClick={handleHeavyClick}>
          Heavy Vibration (300-100-300ms)
        </button>
        <button className={DEMO_BUTTON_CLASS} onClick={handlePatternClick}>
          Custom Pattern (200-100-200-100-200ms)
        </button>
        <button className={DEMO_BUTTON_CLASS} onClick={handleStopClick}>
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
      <CodeSnippet code={HAPTIC_EXAMPLE} />
    </section>
  );
}

export default HapticDemo;
