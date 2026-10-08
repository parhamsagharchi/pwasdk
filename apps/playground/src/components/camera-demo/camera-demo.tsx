import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import PageLoader from "../page-loader";
import { CAMERA_EXAMPLE } from "./camera-demo.constants";
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

  const handleOpenFrontCameraClick = () => {
    void openCamera("front");
  };

  const handleOpenBackCameraClick = () => {
    void openCamera("back");
  };

  const handleOpenLaptopCameraClick = () => {
    void openCamera("laptop");
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {isCameraLoading ? <PageLoader /> : null}
      <h2>📷 Camera</h2>
      <p style={{ fontSize: "14px" }}>
        Open the camera, then pass your own action to Camera.watch — for
        example a QR scan on each frame.
      </p>

      {!isMediaDevicesSupported && (
        <div className="demo-callout">
          <strong>⚠️ Camera not supported:</strong>
          <br />
          Your browser does not support{" "}
          <code>navigator.mediaDevices.getUserMedia</code>.
        </div>
      )}

      <div>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleOpenFrontCameraClick}
          disabled={!isMediaDevicesSupported}
        >
          Open Front Camera
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleOpenBackCameraClick}
          disabled={!isMediaDevicesSupported}
        >
          Open Back Camera
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleOpenLaptopCameraClick}
          disabled={!isMediaDevicesSupported}
        >
          Open Camera (Laptop)
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={stopCameraOnly}
          disabled={!cameraStream}
        >
          Stop Camera
        </button>
      </div>

      {cameraError && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
          {cameraError}
        </p>
      )}

      <div style={{ marginTop: "10px" }}>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#000",
            display: "block",
          }}
          playsInline
          muted
        />
        <p style={{ fontSize: "12px", marginTop: "6px" }}>
          💡 On mobile you must allow camera permissions and use HTTPS.
        </p>
        {frameCallbackRan && <p>Frame callback is running.</p>}
      </div>
      <CodeSnippet code={CAMERA_EXAMPLE} />
    </section>
  );
}

export default CameraDemo;
