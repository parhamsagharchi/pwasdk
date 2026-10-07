/**
 * Screen Orientation helper.
 */

import type { OrientationLockType, OrientationType } from "../types";

type OrientationScreen = Screen & {
  orientation?: ScreenOrientation & {
    lock?: (orientation: OrientationLockType) => Promise<void>;
    unlock?: () => void;
  };
};

export const Orientation = {
  isSupported(): boolean {
    if (typeof screen === "undefined") return false;
    const s = screen as OrientationScreen;
    return !!(s.orientation && (s.orientation.lock || s.orientation.type));
  },

  current(): OrientationType | null {
    if (typeof screen === "undefined") return null;
    const s = screen as OrientationScreen;
    const type = s.orientation?.type;
    if (type) return type as OrientationType;

    const angle =
      s.orientation?.angle ??
      (window as Window & { orientation?: number }).orientation ??
      0;
    if (angle === 0 || angle === 180) return "portrait-primary";
    return "landscape-primary";
  },

  async lock(orientation: OrientationLockType): Promise<boolean> {
    const s = screen as OrientationScreen;
    if (!s.orientation?.lock) {
      throw new Error("Screen Orientation lock is not supported");
    }
    try {
      await s.orientation.lock(orientation);
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to lock orientation");
    }
  },

  async unlock(): Promise<boolean> {
    const s = screen as OrientationScreen;
    if (!s.orientation?.unlock) return false;
    try {
      s.orientation.unlock();
      return true;
    } catch {
      return false;
    }
  },

  onChange(callback: (orientation: OrientationType | null) => void): () => void {
    const s = screen as OrientationScreen;
    const handler = () => callback(this.current());

    if (s.orientation?.addEventListener) {
      s.orientation.addEventListener("change", handler);
      return () => s.orientation?.removeEventListener("change", handler);
    }

    window.addEventListener("orientationchange", handler);
    return () => window.removeEventListener("orientationchange", handler);
  },
};
