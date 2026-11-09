import type { IBatteryManagerLike, IBatterySnapshot } from "./battery.types";

export function hasBatteryApi(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof (navigator as Navigator & { getBattery?: unknown }).getBattery ===
      "function"
  );
}

export function toSnapshot(battery: IBatteryManagerLike): IBatterySnapshot {
  const level = Number.isFinite(battery.level) ? battery.level : 0;
  const chargingTime =
    Number.isFinite(battery.chargingTime) ? battery.chargingTime : null;
  const dischargingTime =
    Number.isFinite(battery.dischargingTime) ? battery.dischargingTime : null;

  return {
    level,
    percent: Math.round(level * 100),
    charging: !!battery.charging,
    chargingTime,
    dischargingTime,
  };
}
