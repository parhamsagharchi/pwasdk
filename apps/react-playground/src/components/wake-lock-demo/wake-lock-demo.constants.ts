export const WAKE_LOCK_EXAMPLE = `import { WakeLock } from "@pwasdk/core";

if (WakeLock.isSupported()) {
  await WakeLock.request();
  await WakeLock.release();
}
`;
