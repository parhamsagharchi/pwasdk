import { useCallback, useRef, useState } from "react";
import { Nfc } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function NfcDemo() {
  const stopRef = useRef<(() => void) | null>(null);
  const [scanning, setScanning] = useState(false);
  const [lastRead, setLastRead] = useState("");
  const [status, setStatus] = useState("");

  const stopScan = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setScanning(false);
  }, []);

  const startScan = useCallback(async () => {
    if (!Nfc.isSupported()) return;
    try {
      stopScan();
      const stop = await Nfc.read((message) => {
        const text = message.records
          .map((r) => `${r.recordType}: ${r.data}`)
          .join(" · ");
        setLastRead(text || "(empty tag)");
        setStatus("Tag read.");
      });
      stopRef.current = stop;
      setScanning(true);
      setStatus("Scanning — hold a tag near the phone…");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "Could not start NFC scan.");
      setScanning(false);
    }
  }, [stopScan]);

  useDemoAutorun(startScan, () => {
    stopScan();
    setStatus("Scan stopped.");
  });

  const handleWriteClick = () => {
    void (async () => {
      try {
        await Nfc.write({
          records: [{ recordType: "text", data: "Hello from PWA SDK" }],
        });
        setStatus("Ready — tap a writable tag to write.");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not write NFC tag.");
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Nfc.isSupported() ? (
        <div className="demo-callout">
          Web NFC is Android Chrome only (HTTPS). Not available on iPhone.
        </div>
      ) : (
        <p className="demo-meta">
          NFC scan starts automatically — hold a tag near the phone.
        </p>
      )}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => void startScan()}
          disabled={!Nfc.isSupported() || scanning}
        >
          Start scan
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => {
            stopScan();
            setStatus("Scan stopped.");
          }}
          disabled={!scanning}
        >
          Stop
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleWriteClick}
          disabled={!Nfc.isSupported()}
        >
          Write text
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Nfc.isSupported() ? "Yes" : "No"}</p>
        {lastRead ? (
          <p>
            Last read: <code>{lastRead}</code>
          </p>
        ) : null}
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default NfcDemo;
