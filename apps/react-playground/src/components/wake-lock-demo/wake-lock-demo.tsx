import { useEffect, useRef, useState } from "react";
import { WakeLock } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function WakeLockDemo() {
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const wantActiveRef = useRef(false);

  useEffect(() => {
    const handleVisibility = () => {
      void (async () => {
        if (document.visibilityState !== "visible") return;
        if (!wantActiveRef.current || !WakeLock.isSupported()) return;
        if (WakeLock.isActive()) {
          setWakeLockActive(true);
          return;
        }
        try {
          await WakeLock.request();
          setWakeLockActive(true);
        } catch {
          setWakeLockActive(false);
          wantActiveRef.current = false;
        }
      })();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleToggleClick = () => {
    void (async () => {
      if (!WakeLock.isSupported()) return;

      if (wakeLockActive) {
        wantActiveRef.current = false;
        await WakeLock.release();
        setWakeLockActive(false);
        return;
      }

      try {
        await WakeLock.request();
        wantActiveRef.current = true;
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
      {!WakeLock.isSupported() ? (
        <div className="demo-callout">
          Wake Lock API is not supported (needs a secure context on most
          phones).
        </div>
      ) : null}
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
          Screen: {wakeLockActive ? "kept on" : "normal"}
        </span>
      </div>
    </section>
  );
}

export default WakeLockDemo;
