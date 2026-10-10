import { useEffect, useState } from "react";
import { Orientation } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function OrientationDemo() {
  const [current, setCurrent] = useState<string | null>(() =>
    Orientation.isSupported() ? Orientation.current() : null,
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!Orientation.isSupported()) return;
    setCurrent(Orientation.current());
    return Orientation.onChange((next) => {
      setCurrent(next);
    });
  }, []);

  const handleLockPortraitClick = () => {
    void (async () => {
      try {
        await Orientation.lock("portrait");
        setStatus("Locked to portrait.");
        setCurrent(Orientation.current());
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : String(error);
        setStatus(
          message ||
            "Lock failed. Many browsers only allow lock in fullscreen or installed PWAs.",
        );
      }
    })();
  };

  const handleLockLandscapeClick = () => {
    void (async () => {
      try {
        await Orientation.lock("landscape");
        setStatus("Locked to landscape.");
        setCurrent(Orientation.current());
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : String(error);
        setStatus(
          message ||
            "Lock failed. Try fullscreen or an installed PWA on Android.",
        );
      }
    })();
  };

  const handleUnlockClick = () => {
    void (async () => {
      const ok = await Orientation.unlock();
      setStatus(ok ? "Unlocked." : "Unlock not available.");
      setCurrent(Orientation.current());
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Orientation.isSupported() ? (
        <div className="demo-callout">
          Screen Orientation API is limited on this browser (common on iOS
          Safari).
        </div>
      ) : null}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleLockPortraitClick}
          disabled={!Orientation.isSupported()}
        >
          Lock portrait
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleLockLandscapeClick}
          disabled={!Orientation.isSupported()}
        >
          Lock landscape
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleUnlockClick}
          disabled={!Orientation.isSupported()}
        >
          Unlock
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Current: {current || "—"}</p>
        <p>Supported: {String(Orientation.isSupported())}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default OrientationDemo;
