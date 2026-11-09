import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import { useUiContext } from "../ui/ui.hooks";

function ShakeDemo() {
  const { shake } = useUiContext();

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
          DeviceMotion is missing here. Open this page on a phone over HTTPS.
        </div>
      ) : null}
      {shake.isSupported && shake.needsPermission ? (
        <div className="demo-callout">
          iOS needs a tap to allow motion access before shake works.
        </div>
      ) : null}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleEnableClick}
          disabled={!shake.isSupported || shake.isListening}
        >
          {shake.isListening ? "Listening…" : "Enable shake"}
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
          Preview sheet
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Supported: {String(shake.isSupported)}</p>
        <p>Listening: {String(shake.isListening)}</p>
        {shake.status ? <p>{shake.status}</p> : null}
      </div>
    </section>
  );
}

export default ShakeDemo;
