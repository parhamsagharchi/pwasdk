import { useCallback, useRef, useState } from "react";
import { Torch } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function TorchDemo() {
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [on, setOn] = useState(false);
  const [status, setStatus] = useState("");

  const stopTorch = useCallback(() => {
    Torch.stop(streamRef.current);
    streamRef.current = null;
    setStream(null);
    setOn(false);
  }, []);

  const startTorch = useCallback(async () => {
    if (!Torch.isSupported()) return;
    try {
      stopTorch();
      const next = await Torch.open();
      streamRef.current = next;
      setStream(next);
      if (Torch.canUse(next)) {
        await Torch.setEnabled(next, true);
        setOn(true);
        setStatus("Flashlight ON — auto-started for this module.");
      } else {
        setOn(false);
        setStatus("Camera opened, but torch is not available on this device.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "Could not open camera for torch.");
    }
  }, [stopTorch]);

  useDemoAutorun(startTorch, stopTorch);

  const handleToggleClick = () => {
    void (async () => {
      if (!streamRef.current) return;
      try {
        const next = await Torch.toggle(streamRef.current);
        setOn(next);
        setStatus(next ? "Flashlight is ON." : "Flashlight is OFF.");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not toggle torch.");
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Torch.isSupported() ? (
        <div className="demo-callout">
          Camera / torch needs a phone browser with getUserMedia.
        </div>
      ) : (
        <p className="demo-meta">
          Torch tries to turn on automatically when you open this module.
        </p>
      )}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => void startTorch()}
          disabled={!Torch.isSupported() || Boolean(stream)}
        >
          Open camera
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleToggleClick}
          disabled={!stream || (stream ? !Torch.canUse(stream) : true)}
        >
          {on ? "Turn off" : "Turn on"}
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => {
            stopTorch();
            setStatus("Torch stopped.");
          }}
          disabled={!stream}
        >
          Stop
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Torch.isSupported() ? "Yes" : "No"}</p>
        <p>Flashlight: {on ? "ON" : "OFF"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default TorchDemo;
