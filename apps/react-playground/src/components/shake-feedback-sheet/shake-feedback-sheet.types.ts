import type { IShakeEvent } from "@pwasdk/core";

export interface IShakeFeedbackSheetProps {
  open: boolean;
  lastShake: IShakeEvent | null;
  onClose: () => void;
}
