/**
 * Double-tap / double-click detection (Instagram-style like).
 */

import { Haptic } from "../haptic";
import type { IDoubleTapOptions, TDoubleTapListener } from "./double-tap.types";

export const DoubleTap = {
  isSupported(): boolean {
    return typeof window !== "undefined" && typeof document !== "undefined";
  },

  /**
   * Listen for double-tap on an element. Returns a stop function.
   */
  watch(
    target: EventTarget,
    onDoubleTap: TDoubleTapListener,
    options?: IDoubleTapOptions,
  ): () => void {
    if (!this.isSupported()) return () => {};

    const thresholdMs = options?.thresholdMs ?? 300;
    const useHaptic = options?.haptic !== false;
    let lastTapAt = 0;

    const handler = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const now = Date.now();
      if (now - lastTapAt <= thresholdMs) {
        lastTapAt = 0;
        if (useHaptic && Haptic.isSupported()) {
          Haptic.trigger("medium");
        }
        onDoubleTap(pointerEvent);
        return;
      }
      lastTapAt = now;
    };

    target.addEventListener("pointerup", handler);
    return () => {
      target.removeEventListener("pointerup", handler);
    };
  },
};
