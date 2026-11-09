import { useCallback, useRef, useState } from "react";
import { WebOtp } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function WebOtpDemo() {
  const abortRef = useRef<AbortController | null>(null);
  const [listening, setListening] = useState(false);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const cancelListen = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setListening(false);
  }, []);

  const startListen = useCallback(async () => {
    if (!WebOtp.isSupported()) return;
    cancelListen();
    const controller = new AbortController();
    abortRef.current = controller;
    setListening(true);
    setStatus(
      `Waiting for SMS… must include @${window.location.host} #123456`,
    );
    try {
      const next = await WebOtp.listen({
        signal: controller.signal,
        timeoutMs: 120_000,
      });
      setCode(next);
      setStatus("OTP received.");
    } catch (error: unknown) {
      if (controller.signal.aborted) return;
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "OTP wait failed.");
    } finally {
      if (abortRef.current === controller) {
        setListening(false);
        abortRef.current = null;
      }
    }
  }, [cancelListen]);

  useDemoAutorun(startListen, cancelListen);

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!WebOtp.isSupported() ? (
        <div className="demo-callout">
          WebOTP works on Android Chrome with an SMS that includes your origin
          and `#code`.
        </div>
      ) : (
        <p className="demo-meta">
          Waiting for SMS starts automatically on this module.
        </p>
      )}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => void startListen()}
          disabled={!WebOtp.isSupported() || listening}
        >
          {listening ? "Listening…" : "Wait for SMS code"}
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => {
            cancelListen();
            setStatus("Cancelled.");
          }}
          disabled={!listening}
        >
          Cancel
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {WebOtp.isSupported() ? "Yes" : "No"}</p>
        {code ? (
          <p>
            Code: <code>{code}</code>
          </p>
        ) : null}
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default WebOtpDemo;
