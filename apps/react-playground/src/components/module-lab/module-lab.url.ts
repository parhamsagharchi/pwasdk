import { MODULE_LAB_ITEMS } from "./module-lab.constants";
import type { TModuleLabId } from "./module-lab.types";

/** Deep link: `/?module=torch` — value is the module id (same as @pwasdk/core). */
export const MODULE_LAB_MODULE_PARAM = "module";

/** @deprecated old query key — still read for existing links */
const LEGACY_FEATURE_PARAM = "feature";

const MODULE_ALIASES: Record<string, TModuleLabId> = {
  location: "geolocation",
  geo: "geolocation",
  gps: "geolocation",
  mic: "microphone",
  "wake-lock": "wakelock",
  wakelock: "wakelock",
  "full-screen": "fullscreen",
  appstorage: "storage",
  "screen-share": "screenshare",
  screenshare: "screenshare",
  "media-session": "mediasession",
  mediasession: "mediasession",
  "web-otp": "webotp",
  webotp: "webotp",
  otp: "webotp",
  flashlight: "torch",
  torch: "torch",
  qr: "qr",
  barcode: "qr",
  contacts: "contacts",
  pip: "pip",
  pictureinpicture: "pip",
  nfc: "nfc",
  passkey: "passkey",
  webauthn: "passkey",
  haptic: "haptic",
  share: "share",
  clipboard: "clipboard",
  shake: "shake",
  screenshot: "screenshot",
  camera: "camera",
  microphone: "microphone",
  geolocation: "geolocation",
  fullscreen: "fullscreen",
  orientation: "orientation",
  device: "device",
  push: "push",
  install: "install",
  pwa: "pwa",
  badge: "badge",
  storage: "storage",
  network: "network",
  battery: "battery",
};

const VALID_IDS = new Set(MODULE_LAB_ITEMS.map((item) => item.id));

export function parseModuleParam(raw: string | null | undefined): TModuleLabId | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase().replace(/_/g, "-");
  if (!key) return null;
  const aliased = MODULE_ALIASES[key] ?? MODULE_ALIASES[key.replace(/-/g, "")];
  if (aliased && VALID_IDS.has(aliased)) return aliased;
  if (VALID_IDS.has(key as TModuleLabId)) return key as TModuleLabId;
  return null;
}

export function readModuleFromLocation(
  search = typeof window !== "undefined" ? window.location.search : "",
): TModuleLabId | null {
  const params = new URLSearchParams(search);
  return (
    parseModuleParam(params.get(MODULE_LAB_MODULE_PARAM)) ??
    parseModuleParam(params.get(LEGACY_FEATURE_PARAM))
  );
}

/** Keep other query params; set `module=<id>` — no hash. */
export function writeModuleToUrl(moduleId: TModuleLabId, mode: "replace" | "push" = "replace") {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set(MODULE_LAB_MODULE_PARAM, moduleId);
  url.searchParams.delete(LEGACY_FEATURE_PARAM);
  url.hash = "";

  const next = `${url.pathname}${url.search}`;
  const current = `${window.location.pathname}${window.location.search}`;
  if (next === current && !window.location.hash) return;

  if (mode === "push") {
    window.history.pushState({ module: moduleId }, "", next);
    return;
  }
  window.history.replaceState({ module: moduleId }, "", next);
}

export function buildModuleSharePath(moduleId: TModuleLabId): string {
  const params = new URLSearchParams();
  params.set(MODULE_LAB_MODULE_PARAM, moduleId);
  return `/?${params.toString()}`;
}
