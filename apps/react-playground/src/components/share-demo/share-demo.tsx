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
          setStatus("Share menu isn’t available — link copied instead.");
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : String(error);
          setStatus(message || "Could not copy the link.");
        }
        return;
      }

      setStatus("Neither share nor clipboard works in this browser.");
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Share.isSupported() ? (
        <div className="demo-callout">
          Phones usually show a share menu. On desktop we often copy the link
          instead.
        </div>
      ) : (
        <p className="demo-meta">
          Opens your phone’s share menu (WhatsApp, Messages, …).
        </p>
      )}
      <div className="demo-actions-row demo-actions-single">
        <button
          type="button"
          className="btn-cyan mono btn-demo-compact"
          onClick={handleShareClick}
        >
          Share this page
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Share menu available: {Share.isSupported() ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default ShareDemo;
