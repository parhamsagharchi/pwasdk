export interface IDoubleTapOptions {
  /** Max ms between taps (default 300). */
  thresholdMs?: number;
  /** Fire haptic on double-tap when available (default true). */
  haptic?: boolean;
}

export type TDoubleTapListener = (event: PointerEvent) => void;
