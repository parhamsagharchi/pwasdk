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
          This bottom sheet opened from the{" "}
          <code>Screenshot.watch</code> / <code>onDetected</code> callback.
          In your app, use that hook for share tips, watermark warnings, or
          support flows — same pattern as Instagram-style screenshot prompts.
        </p>
        {lastEvent ? (
          <p className="feedback-sheet-meta mono">
            source={lastEvent.source} ·{" "}
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
