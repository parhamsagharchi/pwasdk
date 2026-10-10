/** Custom DOM event name used by native bridges / hosts. */
export const SCREENSHOT_EVENT = "pwasdk:screenshot";

/** Optional global flag set by a native WebView host. */
export const SCREENSHOT_BRIDGE_KEY = "__PWASDK_SCREENSHOT_BRIDGE__";

/** Global object native hosts can call: `window.PwaSdkScreenshot.notify()`. */
export const SCREENSHOT_BRIDGE_GLOBAL = "PwaSdkScreenshot";

export const DEFAULT_SCREENSHOT_NOTIFY_TITLE = "Screenshot detected";
export const DEFAULT_SCREENSHOT_NOTIFY_BODY =
  "You took a screenshot of this page.";
