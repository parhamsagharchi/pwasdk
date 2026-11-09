import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Qr } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function QrDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stopWatchRef = useRef<(() => void) | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  const stopScan = useCallback(() => {
    stopWatchRef.current?.();
    stopWatchRef.current = null;
    Camera.stop(streamRef.current);
    streamRef.current = null;
    setStream(null);
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const startScan = useCallback(async () => {
    if (!Qr.isSupported()) {
      setStatus("QR scanning needs BarcodeDetector (Chrome / Android).");
      return;
    }
    if (!Camera.isSupported()) {
      setStatus("Camera is not available.");
      return;
    }
    try {
      stopScan();
      const next = await Camera.openBack();
      streamRef.current = next;
      setStream(next);
      const video = videoRef.current;
      if (video) {
        Camera.attachToVideo(video, next);
        stopWatchRef.current = Qr.watch(video, (results) => {
          if (results[0]?.rawValue) {
            setValue(results[0].rawValue);
            setStatus("QR detected!");
          }
        });
      }
      setStatus("Scanning — point at a QR code.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "Could not start QR scan.");
    }
  }, [stopScan]);

  useDemoAutorun(startScan, () => {
    stopScan();
    setStatus("Scan stopped.");
  });

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Qr.isSupported() ? (
        <div className="demo-callout">
          QR scan needs the BarcodeDetector API (best on Chrome / Android).
        </div>
      ) : (
        <p className="demo-meta">
          Scan starts automatically — hold a QR code in front of the camera.
        </p>
      )}
      <div className="camera-lab">
        <div className="camera-viewport">
          <video
            ref={videoRef}
            className={stream ? "camera-video-elem active" : "camera-video-elem"}
            playsInline
            muted
          />
          {!stream ? (
            <p className="camera-idle-ui">Starting scan…</p>
          ) : null}
        </div>
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => void startScan()}
          disabled={!Camera.isSupported() || Boolean(stream)}
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
          disabled={!stream}
        >
          Stop
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Qr.isSupported() ? "Yes" : "No"}</p>
        {value ? (
          <p>
            Result: <code>{value}</code>
          </p>
        ) : null}
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default QrDemo;
