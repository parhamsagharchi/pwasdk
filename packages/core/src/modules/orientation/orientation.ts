/**
 * Screen Orientation helper.
 */

import type {
  TOrientationLockType,
  TOrientationType,
} from "../../types";
import type { TOrientationScreen } from "./orientation.types";

export const Orientation = {
  isSupported(): boolean {
    if (typeof screen === "undefined") return false;
    const s = screen as TOrientationScreen;
    return !!(s.orientation && (s.orientation.lock || s.orientation.type));
  },

  current(): TOrientationType | null {
    if (typeof screen === "undefined") return null;
    const s = screen as TOrientationScreen;
    const type = s.orientation?.type;
    if (type) return type as TOrientationType;

    const angle =
      s.orientation?.angle ??
      (window as Window & { orientation?: number }).orientation ??
      0;
    if (angle === 0 || angle === 180) return "portrait-primary";
    return "landscape-primary";
  },

  async lock(orientation: TOrientationLockType): Promise<boolean> {
    const s = screen as TOrientationScreen;
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
    const s = screen as TOrientationScreen;
    if (!s.orientation?.unlock) return false;
    try {
      s.orientation.unlock();
      return true;
    } catch {
      return false;
    }
  },

  onChange(callback: (orientation: TOrientationType | null) => void): () => void {
    const s = screen as TOrientationScreen;
    const handler = () => callback(this.current());

    if (s.orientation?.addEventListener) {
      s.orientation.addEventListener("change", handler);
      return () => s.orientation?.removeEventListener("change", handler);
    }

    window.addEventListener("orientationchange", handler);
    return () => window.removeEventListener("orientationchange", handler);
  },
};
