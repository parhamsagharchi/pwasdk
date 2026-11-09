import { useCallback, useState } from "react";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";
import PageLoader from "../page-loader";
import { useCameraDemo } from "./camera-demo.hooks";

function CameraDemo() {
  const {
    videoRef,
    cameraStream,
    cameraError,
    isCameraLoading,
    frameCallbackRan,
    isMediaDevicesSupported,
    openCamera,
    stopCameraOnly,
  } = useCameraDemo();
  const [flashing, setFlashing] = useState(false);
  const [facing, setFacing] = useState<"front" | "back">("front");

  const start = useCallback(() => {
    if (!isMediaDevicesSupported) return;
    void openCamera("front");
  }, [isMediaDevicesSupported, openCamera]);

  useDemoAutorun(start, stopCameraOnly);

  const handleStartClick = () => {
    if (cameraStream) {
      stopCameraOnly();
      return;
    }
    void openCamera(facing);
  };

  const handleFlipClick = () => {
    const next = facing === "front" ? "back" : "front";
    setFacing(next);
    if (cameraStream) void openCamera(next);
  };

  const handleSnapClick = () => {
    setFlashing(true);
    window.setTimeout(() => setFlashing(false), 100);
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {isCameraLoading ? <PageLoader /> : null}
      {!isMediaDevicesSupported ? (
        <div className="demo-callout">
          Camera is not available in this browser. Use HTTPS on a phone or
          laptop with a webcam.
        </div>
      ) : (
        <p className="demo-meta">Camera starts automatically on this module.</p>
      )}

      <div className="camera-lab">
        <div className="camera-viewport">
          <video
            ref={videoRef}
            className={
              cameraStream ? "camera-video-elem active" : "camera-video-elem"
            }
            playsInline
            muted
          />
          {!cameraStream ? (
            <p className="camera-idle-ui">Starting camera…</p>
          ) : null}
          <div
            className={
              flashing ? "camera-flash-layer flashing" : "camera-flash-layer"
            }
          />
        </div>

        <div className="camera-controls" role="group" aria-label="Camera controls">
          <button
            type="button"
            className="hud-btn"
            onClick={handleStartClick}
            disabled={!isMediaDevicesSupported}
          >
            {cameraStream ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            className="hud-btn"
            onClick={handleFlipClick}
            disabled={!isMediaDevicesSupported}
          >
            Flip camera
          </button>
          <button type="button" className="hud-btn" onClick={handleSnapClick}>
            Screen flash
          </button>
        </div>
      </div>

      {cameraError ? <p className="demo-error">{cameraError}</p> : null}
      {frameCallbackRan ? (
        <p className="demo-meta">Live preview is running (each frame can call your code).</p>
      ) : null}
    </section>
  );
}

export default CameraDemo;
