/**
 * Screen Wake Lock helper.
 */

import type { IWakeLockSentinelLike } from "./wakelock.types";

let sentinel: IWakeLockSentinelLike | null = null;

export const WakeLock = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "wakeLock" in navigator;
  },

  async request(): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error("Wake Lock API is not supported");
    }

    try {
      const next = (await (
        navigator as Navigator & {
          wakeLock: {
            request: (type: "screen") => Promise<IWakeLockSentinelLike>;
          };
        }
      ).wakeLock.request("screen")) as IWakeLockSentinelLike;

      sentinel = next;
      sentinel.addEventListener("release", () => {
        sentinel = null;
      });
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to acquire wake lock");
    }
  },

  async release(): Promise<boolean> {
    if (!sentinel) return false;
    try {
      await sentinel.release();
      sentinel = null;
      return true;
    } catch {
      return false;
    }
  },

  isActive(): boolean {
    return !!sentinel && !sentinel.released;
  },
};
