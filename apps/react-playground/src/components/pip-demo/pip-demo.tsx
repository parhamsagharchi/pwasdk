import { useEffect, useRef, useState } from "react";
import { Pip } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function PipDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    return Pip.onChange(setActive);
  }, []);

  const handleEnterClick = () => {
    void (async () => {
      const video = videoRef.current;
      if (!video) return;
      try {
        await video.play();
        await Pip.enter(video);
        setStatus("Picture-in-Picture is open.");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not enter PiP.");
      }
    })();
  };

  const handleExitClick = () => {
    void (async () => {
      const ok = await Pip.exit();
      setStatus(ok ? "PiP closed." : "PiP was not open.");
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Pip.isSupported() ? (
        <div className="demo-callout">
          Picture-in-Picture is not available here (common on some iPhones).
        </div>
      ) : (
        <p className="demo-meta">
          Pop the video into a floating window — keep watching while you browse.
        </p>
      )}
      <div className="camera-lab">
        <div className="camera-viewport">
          <video
            ref={videoRef}
            className="camera-video-elem active"
            playsInline
            loop
            muted
            controls
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          />
        </div>
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleEnterClick}
          disabled={!Pip.isSupported()}
        >
          Enter PiP
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleExitClick}
          disabled={!Pip.isSupported() || !active}
        >
          Exit PiP
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Pip.isSupported() ? "Yes" : "No"}</p>
        <p>Active: {active ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default PipDemo;
