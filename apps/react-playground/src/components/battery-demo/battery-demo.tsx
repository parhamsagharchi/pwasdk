import { useEffect, useState } from "react";
import { Battery, type IBatterySnapshot } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function formatSeconds(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "—";
  if (value === Infinity) return "—";
  const mins = Math.round(value / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return `${hours}h ${rest}m`;
}

function BatteryDemo() {
  const [status, setStatus] = useState<IBatterySnapshot | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Battery.isSupported()) {
      setError(
        "Battery level isn’t available here (common on iPhone Safari).",
      );
      return;
    }

    let stop: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      try {
        stop = await Battery.watch((next) => {
          if (!cancelled) setStatus(next);
        });
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        if (!cancelled) setError(message || "Could not read battery.");
      }
    })();

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  const percent = status?.percent ?? 0;
  const levelClass =
    percent <= 15 ? "low" : percent <= 40 ? "mid" : "high";

  return (
    <section className={DEMO_SECTION_CLASS}>
      {error ? <div className="demo-callout">{error}</div> : null}
      {!error ? (
        <p className="demo-meta">
          Live battery percent — handy for low-power warnings.
        </p>
      ) : null}

      <div className="battery-lab">
        <div
          className={`battery-shell ${status?.charging ? "charging" : ""}`}
          aria-label={`Battery ${percent}%`}
        >
          <div className="battery-body">
            <div
              className={`battery-fill ${levelClass}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="battery-cap" aria-hidden="true" />
        </div>

        <div className="demo-meta demo-meta-spaced">
          <p>
            Level: {status ? `${status.percent}%` : "—"}
            {status?.charging ? " · charging" : ""}
          </p>
          <p>Time to full: {formatSeconds(status?.chargingTime ?? null)}</p>
          <p>Time to empty: {formatSeconds(status?.dischargingTime ?? null)}</p>
          <p>Works here: {Battery.isSupported() ? "Yes" : "No"}</p>
        </div>
      </div>
    </section>
  );
}

export default BatteryDemo;
