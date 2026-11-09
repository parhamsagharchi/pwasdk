import type { MouseEvent } from "react";
import type { IShakeFeedbackSheetProps } from "./shake-feedback-sheet.types";

function ShakeFeedbackSheet({
  open,
  lastShake,
  onClose,
}: IShakeFeedbackSheetProps) {
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
        aria-labelledby="shake-sheet-title"
        onClick={handleSheetClick}
      >
        <div className="feedback-sheet-handle" aria-hidden="true" />
        <h2 id="shake-sheet-title" className="feedback-sheet-title">
          Report a problem
        </h2>
        <p className="feedback-sheet-body">
          You opened this by shaking your phone — same pattern as Instagram.
          In your app, put any feedback or help UI here via the{" "}
          <code>Shake.watch</code> callback.
        </p>
        {lastShake ? (
          <p className="feedback-sheet-meta mono">
            magnitude {lastShake.magnitude.toFixed(1)} ·{" "}
            {new Date(lastShake.at).toLocaleTimeString()}
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

export default ShakeFeedbackSheet;
