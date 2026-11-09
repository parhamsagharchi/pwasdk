import type { TDeviceMotionPermissionRequest } from "./shake.types";

export function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function hasDeviceMotion(): boolean {
  return hasWindow() && typeof window.DeviceMotionEvent !== "undefined";
}

export function getMotionPermissionRequest(): TDeviceMotionPermissionRequest | null {
  if (!hasDeviceMotion()) return null;
  const ctor = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
    requestPermission?: TDeviceMotionPermissionRequest;
  };
  return typeof ctor.requestPermission === "function"
    ? () => ctor.requestPermission!()
    : null;
}

export function readAcceleration(event: DeviceMotionEvent): {
  x: number;
  y: number;
  z: number;
} | null {
  const accel = event.accelerationIncludingGravity ?? event.acceleration;
  if (!accel) return null;
  const x = accel.x ?? 0;
  const y = accel.y ?? 0;
  const z = accel.z ?? 0;
  if (x === 0 && y === 0 && z === 0 && !event.accelerationIncludingGravity) {
    return null;
  }
  return { x, y, z };
}

export function accelerationDelta(
  current: { x: number; y: number; z: number },
  previous: { x: number; y: number; z: number } | null,
): number {
  if (!previous) return 0;
  return (
    Math.abs(current.x - previous.x) +
    Math.abs(current.y - previous.y) +
    Math.abs(current.z - previous.z)
  );
}
