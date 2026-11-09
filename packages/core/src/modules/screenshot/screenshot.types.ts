export type TScreenshotSource = "native" | "manual" | "keyboard" | "unknown";

export interface IScreenshotEvent {
  source: TScreenshotSource;
  at: number;
  detail?: unknown;
}

export interface IScreenshotNotifyOptions {
  title?: string;
  body?: string;
  tag?: string;
}

export interface IScreenshotWatchOptions {
  /**
   * When true (default), show a system notification after each detection.
   * Requires Notification permission.
   */
  autoNotify?: boolean;
  /** Override notification copy when `autoNotify` is on. */
  notification?: IScreenshotNotifyOptions;
  /**
   * When true, also listen for desktop PrintScreen (and common screenshot
   * shortcuts). Does **not** detect phone Power+Volume screenshots.
   */
  listenKeyboard?: boolean;
  /** Extra callback besides the optional auto notification. */
  onDetected?: TScreenshotListener;
}

export type TScreenshotListener = (event: IScreenshotEvent) => void;

export type TScreenshotMediaSource =
  | HTMLCanvasElement
  | HTMLVideoElement
  | OffscreenCanvas;

export interface IScreenshotBridge {
  /** Native host should call once when ScreenCaptureCallback is registered. */
  advertise: () => void;
  /** Native host calls this on each OS screenshot (Power+Volume). */
  notify: (detail?: unknown) => void;
}
