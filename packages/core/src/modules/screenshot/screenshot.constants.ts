/** Custom DOM event name used by native bridges / hosts. */
export const SCREENSHOT_EVENT = "pwasdk:screenshot";

/**
 * Set when JS bridge object exists (`installBridge`).
 * This does **not** mean OS Power+Volume detection works.
 */
export const SCREENSHOT_BRIDGE_KEY = "__PWASDK_SCREENSHOT_BRIDGE__";

/**
 * Set only when a native host calls `advertise()` or `notify()`.
 * Pure Chrome / Safari / installed PWA never set this.
 */
export const SCREENSHOT_NATIVE_HOST_KEY = "__PWASDK_SCREENSHOT_NATIVE__";

/** Global object native hosts can call: `window.PwaSdkScreenshot.notify()`. */
export const SCREENSHOT_BRIDGE_GLOBAL = "PwaSdkScreenshot";

export const DEFAULT_SCREENSHOT_NOTIFY_TITLE = "Screenshot detected";
export const DEFAULT_SCREENSHOT_NOTIFY_BODY =
  "You took a screenshot of this page.";
