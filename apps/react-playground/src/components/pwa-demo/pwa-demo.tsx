import { useState } from "react";
import { Pwa } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function PwaDemo() {
  const [showIosHelp, setShowIosHelp] = useState(false);
  const platform = Pwa.platform();
  const standalone = Pwa.isStandalone();

  const handleShowIosHelpClick = () => {
    setShowIosHelp((current) => !current);
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <p className="demo-meta">
        Detect where the app is running and whether it was opened from the home
        screen.
      </p>
      <div className="demo-meta demo-meta-spaced">
        <p>Platform: {platform}</p>
        <p>Opened from home screen: {standalone ? "Yes" : "No"}</p>
        <p>
          Browser install prompt available:{" "}
          {Pwa.isInstallPromptSupported() ? "Yes" : "No"}
        </p>
      </div>
      {platform === "ios" ? (
        <div className="demo-actions-row demo-actions-single">
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleShowIosHelpClick}
          >
            {showIosHelp ? "Hide iPhone steps" : "Show iPhone install steps"}
          </button>
        </div>
      ) : null}
      {showIosHelp ? (
        <div className="demo-callout" style={{ whiteSpace: "pre-line" }}>
          {Pwa.getIOSInstallInstructions()}
        </div>
      ) : null}
      {platform !== "ios" && !standalone ? (
        <p className="demo-meta">
          On Android Chrome, use the Install feature when the browser offers a
          button. On iPhone, add to Home Screen from Safari.
        </p>
      ) : null}
    </section>
  );
}

export default PwaDemo;
