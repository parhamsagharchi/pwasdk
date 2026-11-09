import type { MouseEvent } from "react";
import type { IScreenshotFeedbackSheetProps } from "./screenshot-feedback-sheet.types";

function ScreenshotFeedbackSheet({
  open,
  lastEvent,
  onClose,
}: IScreenshotFeedbackSheetProps) {
  const handleBackdropClick = () => {
    onClose();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleSheetClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!open) return null;

  const sourceLabel =
    lastEvent?.source === "native"
      ? "from the phone OS"
      : lastEvent?.source === "keyboard"
        ? "from a keyboard shortcut"
        : lastEvent?.source === "manual"
          ? "from Simulate"
          : lastEvent
            ? `from ${lastEvent.source}`
            : null;

  return (
    <div
      className="feedback-sheet-backdrop"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className="feedback-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="screenshot-sheet-title"
        onClick={handleSheetClick}
      >
        <div className="feedback-sheet-handle" aria-hidden="true" />
        <h2 id="screenshot-sheet-title" className="feedback-sheet-title">
          You took a screenshot
        </h2>
        <p className="feedback-sheet-body">
          This is the UI you can show after a screenshot — for example a tip to
          share, a watermark warning, or a support message. In Chrome on the
          web, use Simulate; real Power+Volume detection needs a native Android
          app shell.
        </p>
        {lastEvent ? (
          <p className="feedback-sheet-meta mono">
            Detected {sourceLabel} ·{" "}
            {new Date(lastEvent.at).toLocaleTimeString()}
          </p>
        ) : null}
        <button
          type="button"
          className="btn-cyan mono feedback-sheet-close"
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ScreenshotFeedbackSheet;
