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

export type TScreenshotListener = (event: IScreenshotEvent) => void;

export type TScreenshotMediaSource =
  | HTMLCanvasElement
  | HTMLVideoElement
  | OffscreenCanvas;
