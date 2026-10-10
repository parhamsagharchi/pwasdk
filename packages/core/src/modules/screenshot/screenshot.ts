/**
 * Screenshot helpers.
 *
 * Important limitation:
 * Chrome / Safari / installed PWAs do **not** expose an OS API for
 * "user pressed Power+Volume and took a screenshot" on Android or iPhone.
 * That signal exists only in native apps (Android 14 `ScreenCaptureCallback`,
 * iOS `userDidTakeScreenshotNotification`) and must be forwarded into the
 * WebView via `Screenshot.notifyDetected()` or `window.PwaSdkScreenshot.notify()`.
 *
 * This module provides:
 * - event bus (`onDetected` / `notifyDetected` / `watch`)
 * - system Notification helper for the "you took a screenshot" UX
 * - capturing a frame from canvas / video into a PNG blob
 * - optional WebView bridge installer (`installBridge`)
 */

import {
  DEFAULT_SCREENSHOT_NOTIFY_BODY,
  DEFAULT_SCREENSHOT_NOTIFY_TITLE,
  SCREENSHOT_EVENT,
} from "./screenshot.constants";
import type {
  IScreenshotEvent,
  IScreenshotNotifyOptions,
  IScreenshotWatchOptions,
  TScreenshotListener,
  TScreenshotMediaSource,
} from "./screenshot.types";
import {
  canvasToBlob,
  createScreenshotEvent,
  dispatchScreenshotEvent,
  drawMediaToCanvas,
  hasNativeBridge,
  hasWindow,
  installBridgeObject,
} from "./screenshot.utils";

export const Screenshot = {
  /**
   * Whether screenshot helpers can run in this environment
   * (event bus + optional Notification / canvas capture).
   */
  isSupported(): boolean {
    return hasWindow();
  },

  /**
   * Whether a native host has advertised OS screenshot detection.
   * Pure browsers (including mobile Chrome / Safari / PWA) return `false`.
   */
  isNativeDetectionSupported(): boolean {
    return hasNativeBridge();
  },

  isNotificationSupported(): boolean {
    return hasWindow() && "Notification" in window;
  },

  isCaptureSupported(): boolean {
    return (
      hasWindow() &&
      typeof document !== "undefined" &&
      typeof HTMLCanvasElement !== "undefined" &&
      typeof HTMLCanvasElement.prototype.toBlob === "function"
    );
  },

  /**
   * Advertise a WebView bridge so native code can call:
   * `window.PwaSdkScreenshot.notify()` after an OS screenshot.
   * Sets `__PWASDK_SCREENSHOT_BRIDGE__` so `isNativeDetectionSupported()` is true.
   */
  installBridge(): void {
    installBridgeObject((detail) => {
      this.notifyDetected({ source: "native", detail });
    });
  },

  /**
   * Subscribe to screenshot detection events.
   * Fires when `notifyDetected()` is called, the bridge `notify()` runs,
   * or a host dispatches the `pwasdk:screenshot` event.
   */
  onDetected(callback: TScreenshotListener): () => void {
    if (!this.isSupported()) return () => {};

    const handler = (event: Event) => {
      const custom = event as CustomEvent<IScreenshotEvent>;
      const detail = custom.detail;
      callback(
        createScreenshotEvent({
          source: detail?.source,
          at: detail?.at,
          detail: detail?.detail ?? detail,
        }),
      );
    };

    window.addEventListener(SCREENSHOT_EVENT, handler);
    return () => window.removeEventListener(SCREENSHOT_EVENT, handler);
  },

  /**
   * Listen for detections and optionally show a system notification.
   * This is the recommended API for "tell the user they took a screenshot".
   */
  watch(options: IScreenshotWatchOptions = {}): () => void {
    const autoNotify = options.autoNotify !== false;

    return this.onDetected((event) => {
      options.onDetected?.(event);
      if (autoNotify) {
        void this.showNotification(options.notification);
      }
    });
  },

  /**
   * Report a screenshot capture.
   * Native WebView / host apps should call this when the OS signals a screenshot.
   * Also useful in demos to simulate detection.
   */
  notifyDetected(partial?: Partial<IScreenshotEvent>): void {
    if (!this.isSupported()) return;
    dispatchScreenshotEvent(createScreenshotEvent(partial));
  },

  /**
   * Request Notification permission (needed before `showNotification` / `watch`).
   */
  async requestPermission(): Promise<NotificationPermission | "unsupported"> {
    if (!this.isNotificationSupported()) return "unsupported";
    try {
      if (Notification.permission === "granted") return "granted";
      if (Notification.permission === "denied") return "denied";
      return await Notification.requestPermission();
    } catch {
      return "denied";
    }
  },

  /**
   * Show a user-visible notification about a screenshot.
   * Soft-fails when permission is missing or API unsupported.
   */
  async showNotification(
    options: IScreenshotNotifyOptions = {},
  ): Promise<boolean> {
    if (!this.isNotificationSupported()) return false;

    try {
      let permission = Notification.permission;
      if (permission === "default") {
        permission = await Notification.requestPermission();
      }
      if (permission !== "granted") return false;

      const registration =
        "serviceWorker" in navigator
          ? await navigator.serviceWorker.ready.catch(() => null)
          : null;

      const title = options.title ?? DEFAULT_SCREENSHOT_NOTIFY_TITLE;
      const body = options.body ?? DEFAULT_SCREENSHOT_NOTIFY_BODY;
      const tag = options.tag ?? "pwasdk-screenshot";

      if (registration?.showNotification) {
        await registration.showNotification(title, { body, tag });
      } else {
        new Notification(title, { body, tag });
      }
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Capture a PNG blob from a canvas or video element.
   * Does not capture arbitrary DOM without an extra library.
   */
  async captureFromMedia(
    source: TScreenshotMediaSource,
    type = "image/png",
    quality?: number,
  ): Promise<Blob> {
    if (!this.isCaptureSupported()) {
      throw new Error("Screenshot capture is not supported");
    }
    try {
      if (
        typeof OffscreenCanvas !== "undefined" &&
        source instanceof OffscreenCanvas
      ) {
        return await source.convertToBlob({ type, quality });
      }
      const canvas = drawMediaToCanvas(source);
      return await canvasToBlob(canvas, type, quality);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to capture screenshot");
    }
  },
};
