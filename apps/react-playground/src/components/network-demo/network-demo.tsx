import { useEffect, useState } from "react";
import { Network, type INetworkSnapshot } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function qualityLabel(quality: INetworkSnapshot["quality"]): string {
  if (quality === "excellent") return "excellent";
  if (quality === "good") return "good";
  if (quality === "fair") return "fair";
  if (quality === "poor") return "poor";
  return String(quality);
}

function NetworkDemo() {
  const [status, setStatus] = useState<INetworkSnapshot>(() =>
    Network.getStatus(),
  );

  useEffect(() => {
    return Network.watch(setStatus);
  }, []);

  const generations = ["slow-2g", "2g", "3g", "4g", "5g-est"] as const;

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Network.isSupported() ? (
        <div className="demo-callout">
          Detailed speed info is limited here (common on iPhone Safari). Online /
          offline still updates.
        </div>
      ) : (
        <p className="demo-meta">
          Live connection estimate — useful to simplify the UI on slow networks.
        </p>
      )}

      <div className="network-lab">
        <div className="network-strength-row" aria-label="Signal strength">
          {[0, 1, 2, 3, 4].map((bar) => {
            const filled = status.strength > bar * 20;
            return (
              <span
                key={bar}
                className={
                  filled
                    ? `network-bar network-bar-${bar} on`
                    : `network-bar network-bar-${bar}`
                }
              />
            );
          })}
          <span className="network-strength-label mono">
            {status.strength}% · {qualityLabel(status.quality)}
          </span>
        </div>

        <div className="network-gen-row" role="list" aria-label="Network generation">
          {generations.map((gen) => (
            <span
              key={gen}
              role="listitem"
              className={
                status.generation === gen
                  ? "network-gen-chip active"
                  : "network-gen-chip"
              }
            >
              {gen === "5g-est" ? "5G*" : gen.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="demo-meta demo-meta-spaced">
          <p>Online: {status.online ? "Yes" : "No"}</p>
          <p>Browser type: {status.effectiveType}</p>
          <p>Connection: {status.transport}</p>
          <p>
            Download estimate:{" "}
            {status.downlinkMbps != null
              ? `${status.downlinkMbps} Mbps`
              : "—"}
          </p>
          <p>
            Round-trip delay:{" "}
            {status.rttMs != null ? `${status.rttMs} ms` : "—"}
          </p>
          <p>Data saver on: {status.saveData ? "Yes" : "No"}</p>
          <p className="demo-meta">
            *5G* is estimated from a fast 4G reading — browsers don’t expose a
            real 5G label yet.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NetworkDemo;
