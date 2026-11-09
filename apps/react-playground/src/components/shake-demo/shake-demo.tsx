import { useCallback } from "react";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";
import { useUiContext } from "../ui/ui.hooks";

function ShakeDemo() {
  const { shake } = useUiContext();

  const start = useCallback(() => {
    void shake.enableListening();
  }, [shake]);

  const stop = useCallback(() => {
    shake.disableListening();
    shake.closeSheet();
  }, [shake]);

  useDemoAutorun(start, stop);

  const handleEnableClick = () => {
    void shake.enableListening();
  };

  const handleDisableClick = () => {
    shake.disableListening();
  };

  const handlePreviewSheetClick = () => {
    shake.openSheet();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!shake.isSupported ? (
        <div className="demo-callout">
          Shake needs a phone with motion sensors. Open this page on your phone
          over HTTPS.
        </div>
      ) : null}
      {shake.isSupported && shake.needsPermission && !shake.isListening ? (
        <div className="demo-callout">
          On iPhone, tap “Start listening” once so Safari can allow motion
          access.
        </div>
      ) : null}
      {shake.isListening ? (
        <p className="demo-meta">Listening now — shake your phone.</p>
      ) : null}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleEnableClick}
          disabled={!shake.isSupported || shake.isListening}
        >
          {shake.isListening ? "Listening for shake…" : "Start listening"}
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleDisableClick}
          disabled={!shake.isListening}
        >
          Stop
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handlePreviewSheetClick}
        >
          Preview report sheet
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {shake.isSupported ? "Yes" : "No"}</p>
        <p>Listening: {shake.isListening ? "Yes" : "No"}</p>
        {shake.status ? <p>{shake.status}</p> : null}
      </div>
    </section>
  );
}

export default ShakeDemo;
