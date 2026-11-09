/**
 * Device tilt via DeviceOrientationEvent (phone as a controller).
 */

import type {
  ITiltReading,
  TTiltListener,
  TTiltPermissionState,
} from "./tilt.types";

function hasDeviceOrientation(): boolean {
  return typeof window !== "undefined" && "DeviceOrientationEvent" in window;
}

function getOrientationPermissionRequest():
  | (() => Promise<"granted" | "denied">)
  | null {
  const ctor = (
    window as Window & {
      DeviceOrientationEvent?: {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
    }
  ).DeviceOrientationEvent;
  if (!ctor || typeof ctor.requestPermission !== "function") return null;
  return () => ctor.requestPermission!();
}

export const Tilt = {
  isSupported(): boolean {
    return hasDeviceOrientation();
  },

  needsPermission(): boolean {
    return getOrientationPermissionRequest() !== null;
  },

  async requestPermission(): Promise<TTiltPermissionState> {
    if (!this.isSupported()) return "unsupported";
    const request = getOrientationPermissionRequest();
    if (!request) return "granted";
    try {
      const result = await request();
      return result === "granted" ? "granted" : "denied";
    } catch {
      return "denied";
    }
  },

  /**
   * Watch tilt changes. Returns a stop function.
   */
  watch(onTilt: TTiltListener): () => void {
    if (!this.isSupported()) return () => {};

    const handler = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      onTilt({
        beta: event.beta,
        gamma: event.gamma,
        alpha: event.alpha,
        at: Date.now(),
      });
    };

    window.addEventListener("deviceorientation", handler);
    return () => {
      window.removeEventListener("deviceorientation", handler);
    };
  },
};
