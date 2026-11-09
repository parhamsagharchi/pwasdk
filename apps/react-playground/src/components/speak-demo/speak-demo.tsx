import { useCallback, useState } from "react";
import { Speak } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";
import { SPEAK_DEMO_TEXT } from "./speak-demo.constants";

function SpeakDemo() {
  const [text, setText] = useState(SPEAK_DEMO_TEXT);
  const [status, setStatus] = useState("");

  const speakNow = useCallback(async () => {
    if (!Speak.isSupported()) return;
    try {
      setStatus("Speaking…");
      await Speak.speak(text, { rate: 1, pitch: 1 });
      setStatus("Done.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "Could not speak.");
    }
  }, [text]);

  useDemoAutorun(speakNow, () => {
    Speak.stop();
  });

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Speak.isSupported() ? (
        <div className="demo-callout">
          Speech synthesis is not available in this browser.
        </div>
      ) : (
        <p className="demo-meta">
          The phone speaks this text — auto-plays when you open the module.
        </p>
      )}
      <textarea
        className="demo-textarea"
        rows={3}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => void speakNow()}
          disabled={!Speak.isSupported()}
        >
          Speak
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={() => {
            Speak.stop();
            setStatus("Stopped.");
          }}
          disabled={!Speak.isSupported()}
        >
          Stop
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Speak.isSupported() ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default SpeakDemo;
