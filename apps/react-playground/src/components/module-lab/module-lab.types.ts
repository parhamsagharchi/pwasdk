import type { ReactNode } from "react";

export type TModuleLabId =
  | "torch"
  | "qr"
  | "camera"
  | "shake"
  | "screenshare"
  | "haptic"
  | "screenshot"
  | "passkey"
  | "pip"
  | "nfc"
  | "share"
  | "microphone"
  | "contacts"
  | "mediasession"
  | "webotp"
  | "clipboard"
  | "badge"
  | "battery"
  | "network"
  | "geolocation"
  | "wakelock"
  | "fullscreen"
  | "orientation"
  | "device"
  | "push"
  | "install"
  | "pwa"
  | "storage";

export interface IModuleLabItem {
  id: TModuleLabId;
  title: string;
  /** Short chip subtitle — plain outcome */
  hint: string;
  /** One clear sentence under the stage title */
  blurb: string;
  signature: string;
  code: string;
}

export interface IModuleLabPanelProps {
  item: IModuleLabItem;
  demo: ReactNode;
}
