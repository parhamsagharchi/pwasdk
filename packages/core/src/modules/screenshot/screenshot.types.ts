export type TScreenshotSource = "native" | "manual" | "unknown";

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
  /** Extra callback besides the optional auto notification. */
  onDetected?: TScreenshotListener;
}

export type TScreenshotListener = (event: IScreenshotEvent) => void;

export type TScreenshotMediaSource =
  | HTMLCanvasElement
  | HTMLVideoElement
  | OffscreenCanvas;

export interface IScreenshotBridge {
  notify: (detail?: unknown) => void;
}
