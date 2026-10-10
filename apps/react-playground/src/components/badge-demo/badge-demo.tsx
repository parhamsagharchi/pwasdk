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
      <div className="badge-cyber-stage">
        <div className="cyber-icon-mock">
          <span>⚡</span>
          {count > 0 ? (
            <div className="cyber-counter-badge">{count}</div>
          ) : null}
        </div>
        <div className="demo-actions-row">
          <button type="button" className="pulse-chip-btn" onClick={handleIncClick}>
            + Badge
          </button>
          <button type="button" className="pulse-chip-btn" onClick={handleDecClick}>
            - Badge
          </button>
        </div>
        <p className="demo-meta">Supported: {String(Badge.isSupported())}</p>
      </div>
    </section>
  );
}

export default BadgeDemo;
