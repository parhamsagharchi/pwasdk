import { useCallback, useRef, useState } from "react";
import { Proximity } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function ProximityDemo() {
  const stopRef = useRef<(() => void) | null>(null);
  const [listening, setListening] = useState(false);
  const [near, setNear] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setListening(false);
  }, []);

  const start = useCallback(() => {
    if (!Proximity.isSupported()) {
      setStatus("Proximity sensor is rare in browsers — try Android Chrome.");
      return;
    }
    stop();
    stopRef.current = Proximity.watch((reading) => {
      setNear(reading.near);
      setDistance(reading.distance);
      setStatus(reading.near ? "NEAR — cover the top sensor" : "Far");
    });
    setListening(true);
    setStatus("Listening — cover the earpiece sensor.");
  }, [stop]);

  useDemoAutorun(start, stop);

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Proximity.isSupported() ? (
        <div className="demo-callout">
          Proximity Sensor API is uncommon. Best chance: Android Chrome over
          HTTPS. Cover the top of the phone if it works.
        </div>
      ) : (
        <p className="demo-meta">
          Cover the top sensor — the circle reacts when something is near.
        </p>
      )}
      <div
        className={near ? "sensor-orb near" : "sensor-orb"}
        aria-label={near ? "Near" : "Far"}
      >
        {near ? "NEAR" : "FAR"}
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={start}
          disabled={!Proximity.isSupported() || listening}
        >
          {listening ? "Listening…" : "Start"}
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={stop}
          disabled={!listening}
        >
          Stop
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Proximity.isSupported() ? "Yes" : "No"}</p>
        <p>
          Distance:{" "}
          {distance != null ? `${distance.toFixed(1)} cm` : "—"}
        </p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default ProximityDemo;
