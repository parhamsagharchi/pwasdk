import { useState } from "react";
import { Haptic } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function HapticDemo() {
  const [buzzing, setBuzzing] = useState(false);

  const pulse = (run: () => void, duration = 220) => {
    run();
    setBuzzing(true);
    window.setTimeout(() => setBuzzing(false), duration);
  };

  const handleSoftClick = () => {
    pulse(() => Haptic.trigger("light"), 120);
  };

  const handleMediumClick = () => {
    pulse(() => Haptic.trigger("medium"), 200);
  };

  const handleHeavyClick = () => {
    pulse(() => Haptic.trigger("heavy"), 320);
  };

  const handleHeartbeatClick = () => {
    pulse(() => Haptic.pattern([60, 70, 130]), 400);
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Haptic.isSupported() && (
        <div className="demo-callout">
          Vibration API is not supported on this browser/device.
        </div>
      )}
      <div className="haptic-sensory-stage">
        <div
          className={
            buzzing ? "haptic-device-shell buzzing" : "haptic-device-shell"
          }
          id="haptic-device-mock"
        >
          <div className="haptic-dynamic-pill" />
          <div className="haptic-wave-ripple" />
        </div>
        <div className="haptic-pulse-grid">
          <button type="button" className="pulse-chip-btn" onClick={handleSoftClick}>
            Soft
          </button>
          <button
            type="button"
            className="pulse-chip-btn"
            onClick={handleMediumClick}
          >
            Medium
          </button>
          <button
            type="button"
            className="pulse-chip-btn"
            onClick={handleHeavyClick}
          >
            Heavy
          </button>
          <button
            type="button"
            className="pulse-chip-btn"
            onClick={handleHeartbeatClick}
          >
            Heartbeat
          </button>
        </div>
      </div>
    </section>
  );
}

export default HapticDemo;
