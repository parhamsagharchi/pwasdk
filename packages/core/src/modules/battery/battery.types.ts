export interface IBatterySnapshot {
  /** 0–1 charge level */
  level: number;
  /** 0–100 for UI */
  percent: number;
  charging: boolean;
  /** Seconds until charged, or `Infinity` / null when unknown */
  chargingTime: number | null;
  /** Seconds until empty, or `Infinity` / null when unknown */
  dischargingTime: number | null;
}

export interface IBatteryManagerLike extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}
