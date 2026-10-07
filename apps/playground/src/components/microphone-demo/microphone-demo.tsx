import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";
import { useMicrophoneDemo } from "./microphone-demo.hooks";

function MicrophoneDemo() {
  const {
    audioRef,
    micStream,
    micError,
    isMediaDevicesSupported,
    openMic,
    stopMicOnly,
  } = useMicrophoneDemo();

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>🎙️ Microphone</h2>
      <p style={{ fontSize: "14px" }}>
        Capture audio from the device microphone. Requires HTTPS and user
        permission.
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
          <strong>⚠️ Microphone not supported:</strong>
          <br />
          Your browser does not support{" "}
          <code>navigator.mediaDevices.getUserMedia</code>.
        </div>
      )}

      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={openMic}
          disabled={!isMediaDevicesSupported}
        >
          Open Microphone
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={stopMicOnly}
          disabled={!micStream}
        >
          Stop Microphone
        </button>
      </div>

      {micError && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
          {micError}
        </p>
      )}

      <div style={{ marginTop: "10px" }}>
        <audio
          ref={audioRef}
          style={{ marginTop: "8px", width: "100%" }}
          controls
        />
        <p style={{ fontSize: "12px", marginTop: "6px" }}>
          💡 On mobile you must allow microphone permissions and use HTTPS.
        </p>
      </div>
    </section>
  );
}

export default MicrophoneDemo;
