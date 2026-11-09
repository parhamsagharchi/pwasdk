import { useCallback, useRef, useState } from "react";
import { Tilt } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function TiltDemo() {
  const stopRef = useRef<(() => void) | null>(null);
  const [listening, setListening] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [status, setStatus] = useState("");

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setListening(false);
  }, []);

  const start = useCallback(async () => {
    if (!Tilt.isSupported()) {
      setStatus("Tilt needs DeviceOrientation (best on a phone).");
      return;
    }
    const permission = await Tilt.requestPermission();
    if (permission === "denied") {
      setStatus("Motion permission denied.");
      return;
    }
    stop();
    stopRef.current = Tilt.watch(({ beta, gamma }) => {
      // Map tilt to 0–100% playfield
      const x = clamp(50 + gamma * 1.6, 8, 92);
      const y = clamp(50 + (beta - 45) * 1.2, 8, 92);
      setPos({ x, y });
    });
    setListening(true);
    setStatus("Tilt your phone — move the ball.");
  }, [stop]);

  useDemoAutorun(start, stop);

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Tilt.isSupported() ? (
        <div className="demo-callout">
          Open this on a phone to play with tilt.
        </div>
      ) : (
        <p className="demo-meta">
          Gyro game — tilt the phone to move the ball.
        </p>
      )}
      <div className="tilt-arena" aria-label="Tilt playfield">
        <div
          className="tilt-ball"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        />
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => void start()}
          disabled={!Tilt.isSupported() || listening}
        >
          {listening ? "Playing…" : "Start tilt"}
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
        <p>Works here: {Tilt.isSupported() ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default TiltDemo;
