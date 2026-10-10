import { useState } from "react";
import { WakeLock } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function WakeLockDemo() {
  const [wakeLockActive, setWakeLockActive] = useState(false);

  const handleToggleClick = () => {
    void (async () => {
      if (!WakeLock.isSupported()) return;

      if (wakeLockActive) {
        await WakeLock.release();
        setWakeLockActive(false);
        return;
      }

      try {
        await WakeLock.request();
        setWakeLockActive(true);
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : "Failed to request wake lock";
        alert(message);
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!WakeLock.isSupported() && (
        <div className="demo-callout">Wake Lock API is not supported.</div>
      )}
      <div className="wake-cyber-stage">
        <button
          type="button"
          className={
            wakeLockActive ? "wake-cyber-switch active" : "wake-cyber-switch"
          }
          id="wake-cyber-switch"
          aria-pressed={wakeLockActive}
          onClick={handleToggleClick}
          disabled={!WakeLock.isSupported()}
        >
          <div className="wake-switch-knob" />
        </button>
        <span
          className={
            wakeLockActive ? "wake-status-text is-active" : "wake-status-text"
          }
        >
          Awake: {wakeLockActive ? "LOCKED" : "NORMAL"}
        </span>
      </div>
    </section>
  );
}

export default WakeLockDemo;
