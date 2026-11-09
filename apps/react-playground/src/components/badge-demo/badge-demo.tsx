import { useState } from "react";
import { Badge } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function BadgeDemo() {
  const [count, setCount] = useState(5);

  const handleIncClick = () => {
    void (async () => {
      const next = count + 1;
      setCount(next);
      try {
        await Badge.set(next);
      } catch {
        /* demo still shows local count */
      }
    })();
  };

  const handleDecClick = () => {
    void (async () => {
      const next = Math.max(0, count - 1);
      setCount(next);
      try {
        if (next === 0) await Badge.clear();
        else await Badge.set(next);
      } catch {
        /* demo still shows local count */
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <p className="demo-meta">
        Changes the unread number on the app icon (when the browser supports
        it). The preview below is a mock of that icon.
      </p>
      <div className="badge-cyber-stage">
        <div className="cyber-icon-mock">
          <span>⚡</span>
          {count > 0 ? (
            <div className="cyber-counter-badge">{count}</div>
          ) : null}
        </div>
        <div className="demo-actions-row">
          <button type="button" className="pulse-chip-btn" onClick={handleIncClick}>
            Add 1
          </button>
          <button type="button" className="pulse-chip-btn" onClick={handleDecClick}>
            Remove 1
          </button>
        </div>
        <p className="demo-meta">
          Works here: {Badge.isSupported() ? "Yes" : "No"}
        </p>
      </div>
    </section>
  );
}

export default BadgeDemo;
