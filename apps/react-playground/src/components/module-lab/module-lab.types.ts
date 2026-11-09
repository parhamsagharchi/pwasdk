import type { ReactNode } from "react";

export type TModuleLabId =
  | "torch"
  | "proximity"
  | "ambientlight"
  | "doubletap"
  | "speak"
  | "tilt"
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

export type TModuleLabCategory =
  | "sensors"
  | "media"
  | "feedback"
  | "hardware"
  | "system"
  | "utility";

export interface IModuleLabItem {
  id: TModuleLabId;
  title: string;
  category: TModuleLabCategory;
  /** Short chip subtitle — plain outcome */
  hint: string;
  /** One clear sentence under the stage title */
  blurb: string;
  signature: string;
  code: string;
}

export interface IModuleLabCategoryMeta {
  id: TModuleLabCategory;
  label: string;
}

export interface IModuleLabPanelProps {
  item: IModuleLabItem;
  demo: ReactNode;
}
