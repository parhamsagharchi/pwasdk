/**
 * Battery Status helper (`navigator.getBattery`).
 * Unsupported on many Safari / iOS browsers — check `isSupported()`.
 */

import type { IBatteryManagerLike, IBatterySnapshot } from "./battery.types";
import { hasBatteryApi, toSnapshot } from "./battery.utils";

let cached: IBatteryManagerLike | null = null;

async function getManager(): Promise<IBatteryManagerLike> {
  if (!hasBatteryApi()) {
    throw new Error("Battery Status API is not supported");
  }
  if (cached) return cached;
  const nav = navigator as Navigator & {
    getBattery: () => Promise<IBatteryManagerLike>;
  };
  cached = await nav.getBattery();
  return cached;
}

export const Battery = {
  isSupported(): boolean {
    return hasBatteryApi();
  },

  async getStatus(): Promise<IBatterySnapshot> {
    const battery = await getManager();
    return toSnapshot(battery);
  },

  /**
   * Watch level / charging changes. Returns unsubscribe.
   */
  async watch(
    callback: (status: IBatterySnapshot) => void,
  ): Promise<() => void> {
    const battery = await getManager();
    const emit = () => callback(toSnapshot(battery));

    battery.addEventListener("levelchange", emit);
    battery.addEventListener("chargingchange", emit);
    battery.addEventListener("chargingtimechange", emit);
    battery.addEventListener("dischargingtimechange", emit);
    emit();

    return () => {
      battery.removeEventListener("levelchange", emit);
      battery.removeEventListener("chargingchange", emit);
      battery.removeEventListener("chargingtimechange", emit);
      battery.removeEventListener("dischargingtimechange", emit);
    };
  },
};
