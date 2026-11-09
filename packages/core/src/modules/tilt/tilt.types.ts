export interface ITiltReading {
  /** Front-back tilt in degrees (DeviceOrientation beta). */
  beta: number;
  /** Left-right tilt in degrees (DeviceOrientation gamma). */
  gamma: number;
  /** Compass heading when available (DeviceOrientation alpha). */
  alpha: number | null;
  at: number;
}

export type TTiltListener = (reading: ITiltReading) => void;

export type TTiltPermissionState = "granted" | "denied" | "unsupported";
