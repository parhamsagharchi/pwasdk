import { useEffect, useRef, useState } from "react";
import { ScreenShare } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function ScreenShareDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    return () => {
      ScreenShare.stop(stream);
    };
  }, [stream]);

  const handleStartClick = () => {
    void (async () => {
      try {
        const next = await ScreenShare.start();
        setStream(next);
        const video = videoRef.current;
        if (video) {
          video.srcObject = next;
          void video.play().catch(() => {});
        }
        next.getVideoTracks()[0]?.addEventListener("ended", () => {
          setStream(null);
          setStatus("Screen share ended.");
        });
        setStatus("Sharing your screen.");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not start screen share.");
      }
    })();
  };

  const handleStopClick = () => {
    ScreenShare.stop(stream);
    setStream(null);
    setStatus("Stopped.");
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!ScreenShare.isSupported() ? (
        <div className="demo-callout">
          Screen share is not available in this browser.
        </div>
      ) : (
        <p className="demo-meta">
          Pick a tab or window to share — preview appears below.
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
            <p className="camera-idle-ui">Not sharing — tap Start</p>
          ) : null}
        </div>
      </div>
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleStartClick}
          disabled={!ScreenShare.isSupported() || Boolean(stream)}
        >
          Start share
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleStopClick}
          disabled={!stream}
        >
          Stop
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {ScreenShare.isSupported() ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default ScreenShareDemo;
