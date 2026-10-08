export interface ICameraFrame {
  video: HTMLVideoElement;
  time: number;
}

/** App-owned action for each camera frame (QR, barcode, or anything else). */
export type TCameraFrameListener = (frame: ICameraFrame) => void;
