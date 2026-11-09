import type { IScreenshotEvent } from "@pwasdk/core";

export interface IScreenshotFeedbackSheetProps {
  open: boolean;
  lastEvent: IScreenshotEvent | null;
  onClose: () => void;
}
