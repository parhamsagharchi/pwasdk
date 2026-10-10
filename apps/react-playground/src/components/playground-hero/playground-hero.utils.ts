import {
  AppStorage,
  Badge,
  Camera,
  Clipboard,
  Fullscreen,
  Geolocation,
  Haptic,
  Install,
  Microphone,
  Orientation,
  Pwa,
  Push,
  Screenshot,
  Share,
  WakeLock,
} from "@pwasdk/core";
import type { IRadarChip } from "./playground-hero.types";

export function probeRadar(): IRadarChip[] {
  return [
    { id: "haptics", label: "Haptics", active: Haptic.isSupported() },
    { id: "camera", label: "Camera", active: Camera.isSupported() },
    { id: "audio", label: "Microphone", active: Microphone.isSupported() },
    { id: "push", label: "Push", active: Push.isSupported() },
    { id: "device", label: "Device", active: typeof navigator !== "undefined" },
    { id: "gyro", label: "Orientation", active: Orientation.isSupported() },
    { id: "clipboard", label: "Clipboard", active: Clipboard.isSupported() },
    { id: "wakelock", label: "WakeLock", active: WakeLock.isSupported() },
    { id: "share", label: "Share", active: Share.isSupported() },
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
