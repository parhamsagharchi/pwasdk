export type TShakePermissionState =
  | "granted"
  | "denied"
  | "prompt"
  | "unsupported";

export interface IShakeEvent {
  at: number;
  magnitude: number;
}

export interface IShakeWatchOptions {
  /** Peak acceleration delta required to fire (default 15). */
  threshold?: number;
  /** Ignore further shakes for this many ms after a hit (default 1500). */
  cooldownMs?: number;
}

export type TShakeListener = (event: IShakeEvent) => void;

export type TDeviceMotionPermissionRequest = () => Promise<
  "granted" | "denied"
>;
