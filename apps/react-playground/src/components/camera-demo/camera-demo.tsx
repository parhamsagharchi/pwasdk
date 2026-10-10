import { useState } from "react";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";
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
      {!isMediaDevicesSupported && (
        <div className="demo-callout">
          Camera API is not supported in this browser.
        </div>
      )}
      <div className="camera-vision-stage">
        <video
          ref={videoRef}
          className={
            cameraStream ? "camera-video-elem active" : "camera-video-elem"
          }
          playsInline
          muted
        />
        {!cameraStream ? (
          <div className="camera-idle-ui" id="camera-idle-ui">
            <span>Camera off — press Start</span>
          </div>
        ) : null}
        <div className="camera-hud-brackets" />
        <div
          className={
            flashing ? "camera-flash-layer flashing" : "camera-flash-layer"
          }
        />
        <div className="camera-hud-controls">
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
            Flip
          </button>
          <button type="button" className="hud-btn" onClick={handleSnapClick}>
            Flash
          </button>
        </div>
      </div>
      {cameraError ? <p className="demo-error">{cameraError}</p> : null}
      {frameCallbackRan ? (
        <p className="demo-meta">Frame callback is running.</p>
      ) : null}
    </section>
  );
}

export default CameraDemo;
