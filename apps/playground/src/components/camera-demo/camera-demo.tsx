import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";
import { useCameraDemo } from "./camera-demo.hooks";

function CameraDemo() {
  const {
    videoRef,
    cameraStream,
    cameraError,
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
    <section style={DEMO_SECTION_STYLE}>
      <h2>📷 Camera</h2>
      <p style={{ fontSize: "14px" }}>
        Open device camera (front / back). Requires HTTPS and user permission.
      </p>

      {!isMediaDevicesSupported && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Camera not supported:</strong>
          <br />
          Your browser does not support{" "}
          <code>navigator.mediaDevices.getUserMedia</code>.
        </div>
      )}

      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={handleOpenFrontCameraClick}
          disabled={!isMediaDevicesSupported}
        >
          Open Front Camera
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={handleOpenBackCameraClick}
          disabled={!isMediaDevicesSupported}
        >
          Open Back Camera
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={handleOpenLaptopCameraClick}
          disabled={!isMediaDevicesSupported}
        >
          Open Camera (Laptop)
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
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
      </div>
    </section>
  );
}

export default CameraDemo;
