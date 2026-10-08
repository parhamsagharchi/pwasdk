import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import PageLoader from "../page-loader";
import {
  MICROPHONE_DEMO_WORD,
  MICROPHONE_EXAMPLE,
} from "./microphone-demo.constants";
import { useMicrophoneDemo } from "./microphone-demo.hooks";

function MicrophoneDemo() {
  const {
    audioRef,
    micStream,
    micError,
    isMicLoading,
    isListening,
    heardText,
    wordMatched,
    isMediaDevicesSupported,
    isSpeechSupported,
    openMic,
    stopMicOnly,
    listenForWord,
    stopListening,
  } = useMicrophoneDemo();

  const handleListenClick = () => {
    listenForWord();
  };

  const handleStopListenClick = () => {
    stopListening();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {isMicLoading ? <PageLoader /> : null}
      <h2>🎙️ Microphone</h2>
      <p style={{ fontSize: "14px" }}>
        Open the mic, or pass your own action to Microphone.listen. This card
        treats the word “hello” as a match.
      </p>

      {!isMediaDevicesSupported && (
        <div className="demo-callout">
          <strong>⚠️ Microphone not supported:</strong>
          <br />
          Your browser does not support{" "}
          <code>navigator.mediaDevices.getUserMedia</code>.
        </div>
      )}

      <div>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={openMic}
          disabled={!isMediaDevicesSupported}
        >
          Open Microphone
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={stopMicOnly}
          disabled={!micStream}
        >
          Stop Microphone
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleListenClick}
          disabled={!isSpeechSupported || isListening}
        >
          Listen for “{MICROPHONE_DEMO_WORD}”
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleStopListenClick}
          disabled={!isListening}
        >
          Stop listening
        </button>
      </div>
      {heardText && (
        <p>
          Heard: <code>{heardText}</code>
        </p>
      )}
      {wordMatched && <p>Matched “{MICROPHONE_DEMO_WORD}”.</p>}

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
      <CodeSnippet code={MICROPHONE_EXAMPLE} />
    </section>
  );
}

export default MicrophoneDemo;
