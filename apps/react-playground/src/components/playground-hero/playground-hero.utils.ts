import {
  AppStorage,
  Badge,
  Battery,
  Camera,
  Clipboard,
  Contacts,
  Fullscreen,
  Geolocation,
  Haptic,
  Install,
  MediaSession,
  Microphone,
  Network,
  Nfc,
  Orientation,
  Passkey,
  Pip,
  Pwa,
  Push,
  Qr,
  ScreenShare,
  Screenshot,
  Shake,
  Share,
  Torch,
  WakeLock,
  WebOtp,
} from "@pwasdk/core";
import type { IRadarChip } from "./playground-hero.types";

export function probeRadar(): IRadarChip[] {
  return [
    { id: "torch", label: "Torch", active: Torch.isSupported() },
    { id: "qr", label: "QR", active: Qr.isSupported() },
    { id: "camera", label: "Camera", active: Camera.isSupported() },
    { id: "shake", label: "Shake", active: Shake.isSupported() },
    { id: "screenshare", label: "ScreenShare", active: ScreenShare.isSupported() },
    { id: "haptics", label: "Haptics", active: Haptic.isSupported() },
    { id: "passkey", label: "Passkey", active: Passkey.isSupported() },
    { id: "pip", label: "PiP", active: Pip.isSupported() },
    { id: "nfc", label: "NFC", active: Nfc.isSupported() },
    { id: "share", label: "Share", active: Share.isSupported() },
    { id: "audio", label: "Microphone", active: Microphone.isSupported() },
    { id: "contacts", label: "Contacts", active: Contacts.isSupported() },
    { id: "mediasession", label: "MediaSession", active: MediaSession.isSupported() },
    { id: "webotp", label: "WebOtp", active: WebOtp.isSupported() },
    { id: "push", label: "Push", active: Push.isSupported() },
    { id: "device", label: "Device", active: typeof navigator !== "undefined" },
    { id: "network", label: "Network", active: Network.isSupported() },
    { id: "battery", label: "Battery", active: Battery.isSupported() },
    { id: "gyro", label: "Orientation", active: Orientation.isSupported() },
    { id: "clipboard", label: "Clipboard", active: Clipboard.isSupported() },
    { id: "wakelock", label: "WakeLock", active: WakeLock.isSupported() },
    { id: "badge", label: "Badge", active: Badge.isSupported() },
    { id: "install", label: "Install", active: Install.isSupported() },
    { id: "pwa", label: "Pwa", active: Pwa.platform() !== "unknown" },
    { id: "geo", label: "Geolocation", active: Geolocation.isSupported() },
    { id: "fullscreen", label: "Fullscreen", active: Fullscreen.isSupported() },
    {
      id: "storage",
      label: "AppStorage",
      active: AppStorage.local.isSupported(),
    },
    {
      id: "screenshot",
      label: "Screenshot",
      active: Screenshot.isNativeDetectionSupported(),
    },
  ];
}

export function isDemoVisible(
  activeCategory: string,
  cardCategory: string,
  query: string,
  label: string,
): boolean {
  const categoryMatches =
    activeCategory === "all" || activeCategory === cardCategory;
  const needle = query.trim().toLowerCase();
  const queryMatches = !needle || label.toLowerCase().includes(needle);
  return categoryMatches && queryMatches;
}
