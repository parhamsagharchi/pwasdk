/**
 * Shake detection via DeviceMotion (Instagram-style shake to open UI).
 * Core only reports shakes — bottom sheets stay in the app.
 */

import {
  DEFAULT_SHAKE_COOLDOWN_MS,
  DEFAULT_SHAKE_THRESHOLD,
} from "./shake.constants";
import type {
  IShakeEvent,
  IShakeWatchOptions,
  TShakeListener,
  TShakePermissionState,
} from "./shake.types";
import {
  accelerationDelta,
  getMotionPermissionRequest,
  hasDeviceMotion,
  hasWindow,
  readAcceleration,
} from "./shake.utils";

export const Shake = {
  isSupported(): boolean {
    return hasDeviceMotion();
  },

  /**
   * Whether this browser requires an explicit motion permission prompt (iOS).
   */
  needsPermission(): boolean {
    return getMotionPermissionRequest() !== null;
  },

  /**
   * Ask for DeviceMotion access. Call from a user gesture on iOS.
   * Browsers without a permission API resolve to `"granted"`.
   */
  async requestPermission(): Promise<TShakePermissionState> {
    if (!this.isSupported()) return "unsupported";

    const request = getMotionPermissionRequest();
    if (!request) return "granted";

    try {
      const result = await request();
      return result === "granted" ? "granted" : "denied";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to request motion permission");
    }
  },

  /**
   * Listen for phone shakes. Returns an unsubscribe function.
   * Soft-fails (no-op unsubscribe) when DeviceMotion is missing.
   */
  watch(
    callback: TShakeListener,
    options: IShakeWatchOptions = {},
  ): () => void {
    if (!this.isSupported() || !hasWindow()) return () => {};

    const threshold = options.threshold ?? DEFAULT_SHAKE_THRESHOLD;
    const cooldownMs = options.cooldownMs ?? DEFAULT_SHAKE_COOLDOWN_MS;

    let previous: { x: number; y: number; z: number } | null = null;
    let lastFiredAt = 0;

    const handler = (event: Event) => {
      const motion = event as DeviceMotionEvent;
      const current = readAcceleration(motion);
      if (!current) return;

      const magnitude = accelerationDelta(current, previous);
      previous = current;

      if (magnitude < threshold) return;

      const now = Date.now();
      if (now - lastFiredAt < cooldownMs) return;
      lastFiredAt = now;

      const payload: IShakeEvent = { at: now, magnitude };
      callback(payload);
    };

    window.addEventListener("devicemotion", handler);
    return () => window.removeEventListener("devicemotion", handler);
  },
};
