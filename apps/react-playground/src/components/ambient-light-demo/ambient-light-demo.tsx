import { useCallback, useRef, useState } from "react";
import { AmbientLight } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function luxLabel(lux: number): string {
  if (lux < 10) return "dark";
  if (lux < 50) return "dim";
  if (lux < 500) return "indoor";
  if (lux < 2000) return "bright";
  return "sunny";
}

function AmbientLightDemo() {
  const stopRef = useRef<(() => void) | null>(null);
  const [listening, setListening] = useState(false);
  const [lux, setLux] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setListening(false);
  }, []);

  const start = useCallback(() => {
    if (!AmbientLight.isSupported()) {
      setStatus("Ambient light sensor is rare — try covering the phone.");
      return;
    }
    stop();
    stopRef.current = AmbientLight.watch(({ illuminance }) => {
      setLux(illuminance);
      setStatus(`Room feels ${luxLabel(illuminance)}.`);
    });
    setListening(true);
    setStatus("Listening to ambient light…");
  }, [stop]);

  useDemoAutorun(start, stop);

  const level = lux ?? 0;
  const brightness = Math.min(100, Math.round((Math.log10(level + 1) / 4) * 100));

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!AmbientLight.isSupported() ? (
        <div className="demo-callout">
          Ambient Light Sensor is limited in most browsers. Cover/uncover the
          phone if your device exposes it.
        </div>
      ) : (
        <p className="demo-meta">
          Lux meter — cover the phone or shine a light to watch it change.
        </p>
      )}
      <div
        className="ambient-meter"
        style={{
          background: `linear-gradient(180deg, rgba(255,220,120,${brightness / 100}), #0a0e18)`,
        }}
      >
        <span className="ambient-meter-value mono">
          {lux != null ? `${Math.round(lux)} lux` : "—"}
        </span>
        <span className="ambient-meter-label">
          {lux != null ? luxLabel(lux) : "waiting"}
        </span>
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={start}
          disabled={!AmbientLight.isSupported() || listening}
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
        <p>Works here: {AmbientLight.isSupported() ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default AmbientLightDemo;
