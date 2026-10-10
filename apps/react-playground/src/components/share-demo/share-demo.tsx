import { useState } from "react";
import { Clipboard, Share } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function ShareDemo() {
  const [status, setStatus] = useState("");

  const handleShareClick = () => {
    void (async () => {
      const payload = {
        title: "PWA SDK",
        text: "Check out this PWA SDK!",
        url: window.location.href,
      };

      if (Share.isSupported()) {
        const result = await Share.share(payload);
        setStatus(result ? "Shared." : "Share cancelled or failed.");
        return;
      }

      if (Clipboard.isSupported()) {
        try {
          await Clipboard.copy(`${payload.title}\n${payload.text}\n${payload.url}`);
          setStatus("Share API missing — link copied to clipboard.");
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : String(error);
          setStatus(message || "Clipboard fallback failed.");
        }
        return;
      }

      setStatus("Neither Share nor Clipboard is available.");
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Share.isSupported() ? (
        <div className="demo-callout">
          Web Share is common on phones; desktop browsers often fall back to
          clipboard.
        </div>
      ) : null}
      <button
        type="button"
        className="btn-cyan mono btn-demo-compact"
        onClick={handleShareClick}
      >
        Share
      </button>
      <div className="demo-meta demo-meta-spaced">
        <p>Share supported: {String(Share.isSupported())}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default ShareDemo;
